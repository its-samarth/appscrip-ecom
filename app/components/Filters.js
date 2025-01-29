// components/Filters.js
'use client';
import { useState } from 'react';
import styles from './Filters.module.css';
import Image from 'next/image';

const Filters = ({ categories, onFilterChange, onSortChange, isOpen, onToggle }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('recommended');
  const [selectedType, setSelectedType] = useState('all');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilterChange(category);
  };

  const handleSortChange = (sortType) => {
    setSelectedSort(sortType);
    onSortChange(sortType);
  };

  return (
    <div className={`${styles.filtersWrapper} ${isOpen ? styles.open : ''}`}>
      <div className={styles.filterHeader}>
        <h3>Filters</h3>
        <button onClick={onToggle} className={styles.closeButton}>
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      <div className={styles.filterSection}>
        <h4>Sort By</h4>
        <div className={styles.filterOptions}>
          <label>
            <input
              type="radio"
              name="sort"
              value="recommended"
              checked={selectedSort === 'recommended'}
              onChange={() => handleSortChange('recommended')}
            />
            Recommended
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              value="price-low-high"
              checked={selectedSort === 'price-low-high'}
              onChange={() => handleSortChange('price-low-high')}
            />
            Price: Low to High
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              value="price-high-low"
              checked={selectedSort === 'price-high-low'}
              onChange={() => handleSortChange('price-high-low')}
            />
            Price: High to Low
          </label>
        </div>
      </div>

      <div className={styles.filterSection}>
        <h4>Category</h4>
        <div className={styles.filterOptions}>
          {categories.map((category) => (
            <label key={category}>
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => handleCategoryChange(category)}
              />
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </label>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default Filters;

