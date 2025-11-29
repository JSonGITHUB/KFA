import React, { useState } from 'react';
import { Category } from '../types';
import './CategoryManager.css';

interface CategoryManagerProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  onCategoryCreate: (name: string) => void;
  onCategoryDelete: (categoryId: string) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  onCategoryCreate,
  onCategoryDelete
}) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      onCategoryCreate(newCategoryName.trim());
      setNewCategoryName('');
      setShowCreateForm(false);
    }
  };

  return (
    <div className="category-manager">
      <div className="category-selector">
        <select
          className="category-dropdown"
          value={selectedCategory || ''}
          onChange={(e) => onCategorySelect(e.target.value || null)}
          aria-label="Select category"
        >
          <option value="">All Apps</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          className="create-category-btn"
          onClick={() => setShowCreateForm(!showCreateForm)}
          aria-label="Create new category"
        >
          {showCreateForm ? '✕' : '+ New Category'}
        </button>
      </div>

      {showCreateForm && (
        <form className="create-category-form" onSubmit={handleCreateCategory}>
          <input
            type="text"
            className="category-input"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category name"
            aria-label="New category name"
            autoFocus
          />
          <button type="submit" className="submit-btn" disabled={!newCategoryName.trim()}>
            Create
          </button>
        </form>
      )}

      {selectedCategory && (
        <button
          className="delete-category-btn"
          onClick={() => {
            onCategoryDelete(selectedCategory);
            onCategorySelect(null);
          }}
          aria-label="Delete selected category"
        >
          🗑️ Delete Category
        </button>
      )}
    </div>
  );
};

export default CategoryManager;
