import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Topbar
 * Minimal app bar with a sidebar toggle.
 */
export default function Topbar({ onToggleSidebar }) {
  return (
    <header className="ocean-topbar">
      <button className="toggle" aria-label="Toggle sidebar" onClick={onToggleSidebar}>
        ☰
      </button>
      <div className="app-title">Step Tracker</div>
    </header>
  );
}
