import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './contexts/ThemeContext';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { StationStatus } from './pages/StationStatus';
import { Troubleshooting } from './pages/Troubleshooting';
import { Statistics } from './pages/Statistics';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/stations" element={<StationStatus />} />
              <Route path="/troubleshooting" element={<Troubleshooting />} />
              <Route path="/statistics" element={<Statistics />} />
            </Routes>
          </MainLayout>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
