import React, { useMemo } from 'react';
import { startOfToday, addDays, formatISODate, toDisplay } from '../utils/date';

/**
 * PUBLIC_INTERFACE
 * Dashboard
 * Shows KPIs and a minimalist bar chart for the last 30 days.
 */
export default function Dashboard({ stepsByDate, dailyGoal }) {
  const today = startOfToday();

  const days = useMemo(() => {
    const arr = [];
    for (let i = 29; i >= 0; i--) {
      const d = addDays(today, -i);
      const key = formatISODate(d);
      arr.push({ date: d, key, steps: stepsByDate[key] || 0 });
    }
    return arr;
  }, [stepsByDate, today]);

  const totals = useMemo(() => {
    const totalSteps = days.reduce((acc, d) => acc + d.steps, 0);
    const avg = Math.round(totalSteps / days.length);
    const todayKey = formatISODate(today);
    const todaySteps = stepsByDate[todayKey] || 0;
    const progress = dailyGoal > 0 ? Math.min(100, Math.round((todaySteps / dailyGoal) * 100)) : 0;
    return { totalSteps, avg, todaySteps, progress };
  }, [days, dailyGoal, stepsByDate, today]);

  // Compute chart scaling
  const maxSteps = useMemo(() => {
    const max = days.reduce((m, d) => Math.max(m, d.steps), 0);
    return Math.max(max, dailyGoal || 0, 1000);
  }, [days, dailyGoal]);

  return (
    <div className="ocean-grid">
      <section className="ocean-card" style={{ gridColumn: 'span 12' }}>
        <h3>Today</h3>
        <div className="ocean-kpi">
          <div className="value">{totals.todaySteps.toLocaleString()}</div>
          <div className="muted">steps</div>
        </div>
        <div className="ocean-legend">
          <span>Goal: {dailyGoal.toLocaleString()} • Progress: {totals.progress}%</span>
        </div>
      </section>

      <section className="ocean-card" style={{ gridColumn: 'span 6' }}>
        <h3>Average (30 days)</h3>
        <div className="ocean-kpi">
          <div className="value">{totals.avg.toLocaleString()}</div>
          <div className="muted">steps/day</div>
        </div>
      </section>

      <section className="ocean-card" style={{ gridColumn: 'span 6' }}>
        <h3>Total (30 days)</h3>
        <div className="ocean-kpi">
          <div className="value">{totals.totalSteps.toLocaleString()}</div>
          <div className="muted">steps</div>
        </div>
      </section>

      <section className="ocean-card" style={{ gridColumn: 'span 12' }}>
        <h3>Last 30 Days</h3>
        <div className="ocean-chart" role="img" aria-label="Bar chart of steps for the last 30 days">
          {days.map((d) => {
            const h = maxSteps ? Math.max(2, Math.round((d.steps / maxSteps) * 180)) : 2;
            const hitGoal = dailyGoal > 0 && d.steps >= dailyGoal;
            return (
              <div
                key={d.key}
                className="ocean-bar"
                style={{
                  height: `${h}px`,
                  background: hitGoal ? '#D1FAE5' : '#DBEAFE',
                  borderColor: hitGoal ? '#A7F3D0' : '#BFDBFE',
                }}
                title={`${toDisplay(d.date)} • ${d.steps.toLocaleString()} steps`}
              />
            );
          })}
        </div>
        <div className="ocean-legend">
          <span style={{ width: 10, height: 10, background: '#DBEAFE', border: '1px solid #BFDBFE', borderRadius: 2 }} />
          <span>Steps</span>
          <span style={{ width: 10, height: 10, background: '#D1FAE5', border: '1px solid #A7F3D0', borderRadius: 2, marginLeft: 12 }} />
          <span>Goal reached</span>
        </div>
      </section>
    </div>
  );
}
