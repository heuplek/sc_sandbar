import './App.css'
import Header from './components/header/header'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import LandingPage from './views/LandingPage'
import { CalendarProvider } from './context/calendarContext';

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App" style={{ height: "100vh" }}>
      <QueryClientProvider client={queryClient}>
        <CalendarProvider>
          <Header />
          <LandingPage />
        </CalendarProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App
