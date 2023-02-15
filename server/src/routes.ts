import { FastifyInstance } from "fastify"
import { prisma } from "./lib/prisma"
import { z } from "zod"
import dayjs from "dayjs"

export async function appRoutes(app: FastifyInstance) {

    app.post('/habits', async (request) => {

        const createHabitBody = z.object({
            title: z.string(),
            weekDays: z.array(
                z.number().min(0).max(6)
            )
        })
        const { title, weekDays } = createHabitBody.parse(request.body)

        const today = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')

        await prisma.habit.create({
            data: {
                title,
                created_at: today,
                weekDays: {
                    create: weekDays.map(weekDay => {
                        return {
                            week_day: weekDay
                        }
                    })
                }
            }
        })
    })

    app.get('/day', async (request) => {
        // localhost:3333/day?date=2023-01-01...

        const getDayParams = z.object({
            date: z.coerce.date()
        })

        const { date } = getDayParams.parse(request.query)

        const parsedDate = dayjs(date).startOf('day')
        const weekDay = parsedDate.get('day')
        // console.log(weekDay)
        // console.log(parsedDate.toDate())

        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at: {
                    lte: date,
                },
                weekDays: {
                    some: {
                        week_day: weekDay,
                    }
                }
            }
        })

        const day_min = new Date(dayjs(date).startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'))
        const day_max = new Date(dayjs(date).endOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'))
        console.log(day_min)
        console.log(day_max)

        const days = await prisma.day.findMany({
            where: {
                date: {
                    lte: day_max,
                    gte: day_min,
                }
            },
            include: {
                dayHabits: true,
            }
        })
        console.log(days)
        const day = days?.length > 0 ? days[0] : null;
        console.log(day)

        const completedHabits = day?.dayHabits.map(dayHabit => {
            return dayHabit.habit_id
        }) ?? []

        return {
            possibleHabits,
            completedHabits
        }
    })

    app.patch('/habits/:id/toggle', async (request) => {
        const toggleHabitParams = z.object({
            id: z.string().uuid()
        })

        const { id } = toggleHabitParams.parse(request.params)

        const today_min = new Date(dayjs().startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'))
        const today_max = new Date(dayjs().endOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'))

        let days = await prisma.day.findMany({
            where: {
                date: {
                    lte: today_max,
                    gte: today_min,
                }
            }
        })

        let day = days?.length === 0 ? null : days[0];

        if(!day) {
            day = await prisma.day.create({
                data: {
                    date: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
                }
            })
        }

        const dayHabit = await prisma.dayHabit.findUnique({
            where: {
                day_id_habit_id: {
                    day_id: day.id,
                    habit_id: id
                }
            }
        })

        if(dayHabit) {
            // Remover a marcação do hábito
            await prisma.dayHabit.delete({
                where: {
                    id: dayHabit.id
                }
            })
        } else {
            // Completar o hábito
            await prisma.dayHabit.create({
                data: {
                    day_id: day.id,
                    habit_id: id
                }
            })
        }

    })

    app.get('/summary', async (request) => {
        // Query mais complexa, mais condições, relacionamentos => SQL na mão (RAW)
        // Prisma ORM: RAW SQL => SQLite

        const summary = await prisma.$queryRaw`
            SELECT 
                D.id, 
                D.date,
                (
                    SELECT 
                        cast(count(*) as float)
                    FROM day_habits DH 
                    WHERE DH.day_id = D.id
                ) as completed,
                (
                    SELECT
                        cast(count(*) as float)
                    FROM habit_week_days HWD
                    JOIN habits H 
                        ON H.id = HWD.habit_id
                    WHERE 
                        HWD.week_day = CAST(strftime('%w', D.date/1000.0, 'unixepoch') AS REAL)
                        AND H.created_at <= D.date
                ) as amount
            FROM days D
        `

        return summary
    })
}