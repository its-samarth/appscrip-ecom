'use client';
import { useState } from 'react';
import styles from './Filters.module.css';

export default function Filters({ categories, onFilterChange, onSortChange }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilterChange(category);
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
    onSortChange(sortType);
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.leftFilters}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>CATEGORIES</span>
          <div className={styles.categoryList}>
            <button 
              className={`${styles.categoryBtn} ${selectedCategory === 'all' ? styles.active : ''}`}
              onClick={() => handleCategoryChange('all')}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryBtn} ${selectedCategory === category ? styles.active : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>PRICE RANGE</span>
          <div className={styles.priceRange}>
            <button className={styles.priceBtn}>$0 - $50</button>
            <button className={styles.priceBtn}>$50 - $100</button>
            <button className={styles.priceBtn}>$100+</button>
          </div>
        </div>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>RATING</span>
          <div className={styles.ratingFilter}>
            {[4, 3, 2, 1].map((stars) => (
              <button key={stars} className={styles.ratingBtn}>
                {stars}+ ★
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.sortFilter}>
        <select 
          className={styles.sortSelect}
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="recommended">RECOMMENDED</option>
          <option value="price-low">PRICE: LOW TO HIGH</option>
          <option value="price-high">PRICE: HIGH TO LOW</option>
          <option value="rating">HIGHEST RATED</option>
        </select>
      </div>
    </div>
  );
}