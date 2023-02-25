import { FastifyInstance } from "fastify"
import WebPush from 'web-push'
import { z } from "zod"

// console.log(WebPush.generateVAPIDKeys())

const publicKey = 'BEFAvkwBly3lDgplpwHQqQyN6U91cGgOWZg38N1E9RINRxyugCMpzuzEL2grOAn8uUZekSWkqmG_7yzVamUnmIc'
const privateKey = '7KbmtSm9G9kLh0fOXp0S-cQw-KFuMDP34Y50n4zSR6w'

WebPush.setVapidDetails( 'http://localhost:3333', publicKey, privateKey )

export async function notificationRoutes(app: FastifyInstance) {
    app.get('/push/public_key', () => {
        return {
            publicKey
        }
    })

    app.post('/push/register', (request, reply) => {
        console.log(request.body);

        return reply.status(201).send()
    })

    app.post('/push/send', async (request, reply) => {
        console.log(request.body);
        const sendPushBody = z.object({
            subscription: z.object({
                endpoint: z.string(),
                keys: z.object({
                    p256dh: z.string(),
                    auth: z.string()
                })
            })
        })

        const { subscription } = sendPushBody.parse(request.body);

        setTimeout( () => {
            WebPush.sendNotification(subscription, 'Hello do Backend')
        }, 5000)

        return reply.status(201).send()
    })
}