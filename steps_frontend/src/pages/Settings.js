import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * Settings
 * Minimal form to update the daily step goal.
 */
export default function Settings({ dailyGoal, onChangeGoal }) {
  const [val, setVal] = useState(dailyGoal);

  const submit = (e) => {
    e.preventDefault();
    const n = parseInt(val || 0, 10);
    if (Number.isNaN(n) || n < 0) return;
    onChangeGoal(n);
  };

  return (
    <section className="ocean-card">
      <h3>Settings</h3>
      <form className="ocean-form" onSubmit={submit}>
        <div className="ocean-field">
          <label className="ocean-label" htmlFor="goal">Daily Goal</label>
          <input
            id="goal"
            className="ocean-input"
            inputMode="numeric"
            pattern="[0-9]*"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
        </div>
        <div>
          <button className="ocean-btn success" type="submit">Update Goal</button>
        </div>
      </form>
    </section>
  );
}
