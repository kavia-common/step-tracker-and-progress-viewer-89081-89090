import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Sidebar
 * Minimal navigation sidebar.
 */
export default function Sidebar({ open = true, current, onNavigate }) {
  if (!open) return null;

  const link = (id, label) => (
    <button
      key={id}
      className={current === id ? 'active' : ''}
      onClick={() => onNavigate(id)}
      aria-current={current === id ? 'page' : undefined}
    >
      {label}
    </button>
  );

  return (
    <aside className="ocean-sidebar" aria-label="Main">
      <div className="brand">Steps</div>
      <div className="subtitle">Ocean Professional</div>
      <nav className="ocean-nav">
        {link('dashboard', 'Dashboard')}
        {link('history', 'History')}
        {link('input', 'Input Steps')}
        {link('settings', 'Settings')}
      </nav>
    </aside>
  );
}
