import './src/lib/dayjs';
import { Button, StatusBar } from 'react-native';
import { 
  useFonts, 
  Inter_400Regular, 
  Inter_600SemiBold, 
  Inter_700Bold,
  Inter_800ExtraBold
} from '@expo-google-fonts/inter';

import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';

import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular, 
    Inter_600SemiBold, 
    Inter_700Bold,
    Inter_800ExtraBold
  })

  async function scheduleNotification() {
    const trigger = new Date(Date.now());
    trigger.setSeconds(trigger.getSeconds() + 10);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Olá, Paulo! 👏',
        body: 'Você praticou seus hábitos hoje?'
      },
      trigger
    })
  }


  if(!fontsLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <>
      <Button title="Enviar Notificação" onPress={scheduleNotification} />
      <Routes />
      <StatusBar barStyle='light-content' backgroundColor='transparent' /*translucent*/ />
    </>
  );
}