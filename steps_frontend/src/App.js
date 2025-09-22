import React, { useMemo, useState } from 'react';
import './App.css';
import './ocean.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import InputSteps from './pages/InputSteps';
import Settings from './pages/Settings';
import { generateInitialMockData } from './utils/mockData';
import { formatISODate } from './utils/date';

// PUBLIC_INTERFACE
function App() {
  /**
   * Minimal in-memory state store for steps. This simulates a future backend.
   * State shape:
   * - stepsByDate: { 'YYYY-MM-DD': number }
   * - dailyGoal: number
   */
  const initialData = useMemo(() => generateInitialMockData(30), []);
  const [stepsByDate, setStepsByDate] = useState(initialData.stepsByDate);
  const [dailyGoal, setDailyGoal] = useState(initialData.dailyGoal);
  const [route, setRoute] = useState('dashboard'); // 'dashboard' | 'history' | 'input' | 'settings'
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // PUBLIC_INTERFACE
  const navigate = (to) => {
    /** Simple router - updates current route string */
    setRoute(to);
  };

  // PUBLIC_INTERFACE
  const upsertSteps = (date, count) => {
    /**
     * Upsert a steps entry.
     * - date: Date or 'YYYY-MM-DD'
     * - count: integer >= 0
     */
    const key = typeof date === 'string' ? date : formatISODate(date);
    setStepsByDate(prev => ({ ...prev, [key]: Math.max(0, parseInt(count || 0, 10)) }));
  };

  // PUBLIC_INTERFACE
  const removeSteps = (date) => {
    /** Remove a specific date entry */
    const key = typeof date === 'string' ? date : formatISODate(date);
    setStepsByDate(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  // PUBLIC_INTERFACE
  const setGoal = (value) => {
    /** Set the daily goal (>= 0) */
    setDailyGoal(Math.max(0, parseInt(value || 0, 10)));
  };

  // PUBLIC_INTERFACE
  const toggleSidebar = () => setSidebarOpen(v => !v);

  return (
    <div className="ocean-app">
      <Sidebar
        open={sidebarOpen}
        current={route}
        onNavigate={navigate}
      />
      <main className={`ocean-main ${sidebarOpen ? 'with-sidebar' : ''}`}>
        <Topbar onToggleSidebar={toggleSidebar} />
        <div className="ocean-content">
          {route === 'dashboard' && (
            <Dashboard stepsByDate={stepsByDate} dailyGoal={dailyGoal} />
          )}
          {route === 'history' && (
            <History
              stepsByDate={stepsByDate}
              onDelete={removeSteps}
            />
          )}
          {route === 'input' && (
            <InputSteps
              onSave={upsertSteps}
              lastDate={formatISODate(new Date())}
              lastCount={stepsByDate[formatISODate(new Date())] || 0}
            />
          )}
          {route === 'settings' && (
            <Settings dailyGoal={dailyGoal} onChangeGoal={setGoal} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
