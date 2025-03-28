import './App.css'
import Header from './components/header/header'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import LandingPage from './views/Landing/LandingPage'
import { CalendarProvider } from './context/calendarContext';
import ErrorBar from './components/errorBar/errorBar';

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App" style={{ height: "100vh" }}>
      <QueryClientProvider client={queryClient}>
        <CalendarProvider>
          <Header />
          <ErrorBar />
          <LandingPage />
        </CalendarProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App
