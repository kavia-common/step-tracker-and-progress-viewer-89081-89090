import React, { useMemo, useState } from 'react';
import { formatISODate } from '../utils/date';

/**
 * PUBLIC_INTERFACE
 * InputSteps
 * Form to input or update steps for a specific date.
 */
export default function InputSteps({ onSave, lastDate, lastCount }) {
  const todayISO = useMemo(() => formatISODate(new Date()), []);
  const [date, setDate] = useState(lastDate || todayISO);
  const [count, setCount] = useState(lastCount || 0);
  const [msg, setMsg] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const c = parseInt(count || 0, 10);
    if (Number.isNaN(c) || c < 0) {
      setMsg('Please enter a valid non-negative number.');
      return;
    }
    onSave(date, c);
    setMsg('Saved.');
    setTimeout(() => setMsg(''), 1200);
  };

  return (
    <section className="ocean-card">
      <h3>Input Steps</h3>
      <form className="ocean-form" onSubmit={submit}>
        <div className="ocean-field">
          <label className="ocean-label" htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            className="ocean-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={todayISO}
            required
          />
        </div>
        <div className="ocean-field">
          <label className="ocean-label" htmlFor="steps">Steps</label>
          <input
            id="steps"
            inputMode="numeric"
            pattern="[0-9]*"
            className="ocean-input"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            placeholder="e.g., 8500"
            required
          />
        </div>
        <div className="ocean-row">
          <button className="ocean-btn primary" type="submit">Save</button>
          {msg && <span style={{ color: '#10B981', alignSelf: 'center' }}>{msg}</span>}
        </div>
      </form>
    </section>
  );
}
