import { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

export function New() {
    const [title, setTitle] = useState('');
    const [weekDays, setWeekDays] = useState<number[]>([]);

    function handleToggleWeekDay(weekDayIndex: number) {
        if(weekDays.includes(weekDayIndex)) {
            // Desmarcar
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex));
        } else {
            // Marcar
            setWeekDays(prevState => [...prevState, weekDayIndex]);
        }
    }

    async function handleCreateNewHabit() {
        try {
            let errors = [];

            if( !title.trim() )
                errors.push('Informe o titulo do hábito.');
            if( weekDays.length === 0 )
                errors.push('Informe a periodicidade do hábito.');

            if(errors.length > 0)
                Alert.alert('Novo Hábito', errors.join('\n'));

            // Chamando API
            await api.post('/habits', { title, weekDays });

            // Limpando estado
            setTitle('');
            setWeekDays([]);

            Alert.alert('Novo Hábito', 'Hábito criado com sucesso!');
        } catch (error) {
            console.log( error )
            Alert.alert('Ops', 'Não foi possível criar o novo hábito.');
        }
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
                <BackButton />

                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Criar hábito
                </Text>

                <Text className="mt-6 text-white font-semibold text-base">
                    Qual seu comprometimento?
                </Text>

                <TextInput 
                    className="h-12 pl-4 rounder-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600" 
                    placeholder="Exercícios, dormir bem, etc..."
                    placeholderTextColor={colors.zinc[400]}
                    onChangeText={setTitle}
                    value={title}
                />

                <Text className="mt-4 mb-3 text-white font-semibold text-base">
                    Qual a recorrência?
                </Text>

                {availableWeekDays.map((weekDay, indice) => (
                    <Checkbox 
                        key={weekDay}
                        title={weekDay}
                        checked={weekDays.includes(indice)}
                        onPress={() => handleToggleWeekDay(indice)}
                    />
                ))}

                <TouchableOpacity 
                    className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6" 
                    activeOpacity={0.7}
                    onPress={handleCreateNewHabit}>
                    <Feather
                        name="check"
                        size={20}
                        color={colors.white}
                    />

                    <Text className="text-semibold text-base text-white ml-2">
                        Confirmar
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}