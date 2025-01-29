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

  // Generate product schema for each product
  const generateProductSchema = (product) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "image": product.image,
    "category": product.category,
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating.rate,
      "reviewCount": product.rating.count
    }
  });

  return (
    <div className={`${styles.contentWrapper} ${!isFilterOpen ? styles.filtersHidden : ''}`}>
      <button 
        className={styles.filterToggleBtn}
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        aria-expanded={isFilterOpen}
        aria-controls="filters-panel"
      >
        {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
      </button>

      {isFilterOpen && (
        <Filters
          id="filters-panel"
          role="region"
          aria-label="Product filters"
          categories={categories}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          isOpen={isFilterOpen}
          onToggle={() => setIsFilterOpen(!isFilterOpen)}
        />
      )}

      <section 
        className={styles.productGrid}
        aria-label="Products grid"
      >
        {products.map((product) => (
          <article 
            key={product.id} 
            className={styles.productCard}
            itemScope 
            itemType="https://schema.org/Product"
          >
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(generateProductSchema(product))
              }}
            />
            
            <div className={styles.imageContainer}>
              <Image
                src={product.image}
                alt={`${product.title} - ${product.category} product`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.productImage}
                itemProp="image"
                priority={true}
              />
            </div>
            
            <div className={styles.productInfo}>
              <h2 
                className={styles.productTitle}
                itemProp="name"
              >
                {product.title}
              </h2>
              
              <div className={styles.productMeta}>
                <span 
                  className={styles.price}
                  itemProp="offers"
                  itemScope
                  itemType="https://schema.org/Offer"
                >
                  <meta itemProp="priceCurrency" content="USD" />
                  <span itemProp="price" content={product.price}>
                    ${product.price}
                  </span>
                </span>
                
                <div 
                  className={styles.rating}
                  itemProp="aggregateRating"
                  itemScope
                  itemType="https://schema.org/AggregateRating"
                >
                  <meta itemProp="ratingValue" content={product.rating.rate} />
                  <meta itemProp="reviewCount" content={product.rating.count} />
                  <span className={styles.stars}>
                    {'★'.repeat(Math.round(product.rating.rate))}
                    {'☆'.repeat(5 - Math.round(product.rating.rate))}
                  </span>
                  <span className={styles.ratingCount}>
                    ({product.rating.count})
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}