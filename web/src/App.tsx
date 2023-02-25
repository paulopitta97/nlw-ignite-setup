// import { Habit } from './components/Habit'
import { Header } from './components/Header';
import { SummaryTable } from './components/SummaryTable';
import './lib/dayjs';
import './styles/global.css';

// Service Worker para Push Notifications
navigator.serviceWorker.register('service-worker.js');

// Exemplo simples de notificação (que possui limitações) no navegador
// window.Notification.requestPermission(permission => {
//   if(permission === 'granted') {
//     new window.Notification('Habits', {
//       body: 'Texto',
//     });
//   }
// })

export function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />
        <SummaryTable />
      </div>
    </div>
  )
}