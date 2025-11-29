import React from 'react';
import { App } from '../types';
import './AppGrid.css';

interface AppGridProps {
  apps: App[];
  onAppClick: (app: App) => void;
  onAddToCategory?: (appId: string) => void;
  selectedCategoryId?: string | null;
}

const AppGrid: React.FC<AppGridProps> = ({ 
  apps, 
  onAppClick, 
  onAddToCategory,
  selectedCategoryId 
}) => {
  if (apps.length === 0) {
    return (
      <div className="no-apps">
        <span className="no-apps-icon">📭</span>
        <p>No apps found</p>
      </div>
    );
  }

  return (
    <div className="app-grid">
      {apps.map((app) => (
        <div key={app.id} className="app-card">
          <button
            className="app-button"
            onClick={() => onAppClick(app)}
            aria-label={`Launch ${app.name}`}
          >
            <span className="app-icon">{app.icon}</span>
            <span className="app-name">{app.name}</span>
            <span className="app-category">{app.category}</span>
          </button>
          {onAddToCategory && selectedCategoryId && (
            <button
              className="add-to-category-btn"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCategory(app.id);
              }}
              aria-label={`Add ${app.name} to category`}
            >
              +
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AppGrid;
