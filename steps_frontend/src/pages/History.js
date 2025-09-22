import React, { useMemo } from 'react';
import { toDisplay } from '../utils/date';

/**
 * PUBLIC_INTERFACE
 * History
 * Displays recorded step entries in a table with delete action.
 */
export default function History({ stepsByDate, onDelete }) {
  const rows = useMemo(() => {
    return Object.entries(stepsByDate)
      .map(([date, steps]) => ({ date, steps }))
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [stepsByDate]);

  return (
    <section className="ocean-card">
      <h3>History</h3>
      <table className="ocean-table" aria-label="Step entries history">
        <thead>
          <tr>
            <th style={{ width: 180 }}>Date</th>
            <th>Steps</th>
            <th style={{ width: 110 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan="3" style={{ color: '#6B7280' }}>No entries yet.</td>
            </tr>
          )}
          {rows.map((r) => (
            <tr key={r.date}>
              <td>{toDisplay(r.date)}</td>
              <td>{r.steps.toLocaleString()}</td>
              <td>
                <button className="ocean-btn danger" onClick={() => onDelete(r.date)} aria-label={`Delete ${r.date}`}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
