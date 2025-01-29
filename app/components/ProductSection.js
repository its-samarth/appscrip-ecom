// components/ProductSection.js
'use client';
import { useState } from 'react';
import Image from 'next/image';
import Filters from './Filters';
import styles from './ProductSection.module.css';

export default function ProductSection({ initialProducts, categories }) {
  const [products, setProducts] = useState(initialProducts);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = async (category) => {
    try {
      const filteredProducts = category === 'all'
        ? initialProducts
        : await fetch(`https://fakestoreapi.com/products/category/${category}`)
            .then(res => res.json());
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error filtering products:', error);
    }
  };

  const handleSortChange = (sortType) => {
    const sortedProducts = [...products];
    switch (sortType) {
      case 'price-low-high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        setProducts(initialProducts);
        return;
    }
    setProducts(sortedProducts);
  };

  return (
    <div className={`${styles.contentWrapper} ${!isFilterOpen ? styles.filtersHidden : ''}`}>
      <button 
        className={styles.filterToggleBtn}
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
      </button>

      {isFilterOpen && (
        <Filters
          categories={categories}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          isOpen={isFilterOpen}
          onToggle={() => setIsFilterOpen(!isFilterOpen)}
        />
      )}

      <section className={styles.productGrid}>
        {products.map((product) => (
          <article key={product.id} className={styles.productCard}>
            <div className={styles.imageContainer}>
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.productImage}
              />
            </div>
            <div className={styles.productInfo}>
              <h2 className={styles.productTitle}>{product.title}</h2>
              <div className={styles.productMeta}>
                <span className={styles.price}>${product.price}</span>
                <div className={styles.rating}>
                  <span className={styles.stars}>
                    {'★'.repeat(Math.round(product.rating.rate))}
                    {'☆'.repeat(5 - Math.round(product.rating.rate))}
                  </span>
                  <span className={styles.ratingCount}>({product.rating.count})</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}