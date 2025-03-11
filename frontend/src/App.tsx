import './App.css'
import Header from './components/header/header'
import Calendar from './components/calendar/calendar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CalendarProvider } from './context/calendarContext'

function App() {
  const queryClient = new QueryClient();

  return (
    <div className='app-wrapper'>
      <QueryClientProvider client={queryClient}>
        <Header />
        <CalendarProvider>
          <Calendar />
        </CalendarProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App
