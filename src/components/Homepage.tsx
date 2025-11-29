import React, { useState, useEffect, useMemo } from 'react';
import { App, Category } from '../types';
import { sampleApps } from '../data/sampleApps';
import Header from './Header';
import SearchBar from './SearchBar';
import CategoryManager from './CategoryManager';
import AppGrid from './AppGrid';
import './Homepage.css';

const CATEGORIES_STORAGE_KEY = 'kfa-categories';

const Homepage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Load categories from localStorage on mount
  useEffect(() => {
    const storedCategories = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  // Save categories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  const handleCategoryCreate = (name: string) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      apps: []
    };
    setCategories([...categories, newCategory]);
  };

  const handleCategoryDelete = (categoryId: string) => {
    setCategories(categories.filter((cat) => cat.id !== categoryId));
  };

  const handleAddToCategory = (appId: string) => {
    if (!selectedCategory) return;
    
    setCategories(categories.map((cat) => {
      if (cat.id === selectedCategory && !cat.apps.includes(appId)) {
        return { ...cat, apps: [...cat.apps, appId] };
      }
      return cat;
    }));
  };

  const handleAppClick = (app: App) => {
    window.open(app.url, '_blank', 'noopener,noreferrer');
  };

  // Filter apps based on search term and selected category
  const filteredApps = useMemo(() => {
    let apps = sampleApps;

    // Filter by selected category
    if (selectedCategory) {
      const category = categories.find((cat) => cat.id === selectedCategory);
      if (category) {
        apps = apps.filter((app) => category.apps.includes(app.id));
      }
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      apps = apps.filter(
        (app) =>
          app.name.toLowerCase().includes(term) ||
          app.description.toLowerCase().includes(term) ||
          app.category.toLowerCase().includes(term)
      );
    }

    return apps;
  }, [searchTerm, selectedCategory, categories]);

  return (
    <div className="homepage">
      <Header />
      <main className="main-content">
        <h1 className="page-title">App Launcher</h1>
        <p className="page-subtitle">Quick access to your favorite apps</p>
        
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <CategoryManager
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          onCategoryCreate={handleCategoryCreate}
          onCategoryDelete={handleCategoryDelete}
        />
        
        <div className="apps-section">
          <p className="apps-count">
            {filteredApps.length} {filteredApps.length === 1 ? 'app' : 'apps'} found
          </p>
          <AppGrid
            apps={filteredApps}
            onAppClick={handleAppClick}
            onAddToCategory={handleAddToCategory}
            selectedCategoryId={selectedCategory}
          />
        </div>
      </main>
    </div>
  );
};

export default Homepage;
