'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Suspense } from 'react';
import Filters from './components/Filters';
import styles from './page.module.css';
import Footer from './components/Footer';

async function getProducts() {
  try {
    const res = await fetch('https://fakestoreapi.com/products', { next: { revalidate: 3600 } });
    return res.json();
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

async function getCategories() {
  try {
    const res = await fetch('https://fakestoreapi.com/products/categories', { next: { revalidate: 3600 } });
    return res.json();
  } catch (error) {
    console.error('Error loading categories:', error);
    return [];
  }
}

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // Fetch data on component mount
  useState(() => {
    const fetchData = async () => {
      const [productsData, categoriesData] = await Promise.all([getProducts(), getCategories()]);
      setProducts(productsData);
      setCategories(categoriesData);
    };
    fetchData();
  }, []);

  const handleFilterChange = async (category) => {
    // Implement filter logic
    const filteredProducts = category === 'all' 
      ? await getProducts()
      : await fetch(`https://fakestoreapi.com/products/category/${category}`).then(res => res.json());
    setProducts(filteredProducts);
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
        // Reset to original order for 'recommended'
        getProducts().then(setProducts);
        return;
    }
    setProducts(sortedProducts);
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.logo}>LOGO</div>
        <nav className={styles.nav}>
          <button 
            className={styles.menuBtn}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Image src="/window.svg" alt="Menu" width={24} height={24} />
          </button>
          <button className={styles.globeBtn}>
            <Image src="/globe.svg" alt="Language" width={24} height={24} />
          </button>
        </nav>
      </header>

      <div className={styles.heroSection}>
        <h1 className={styles.title}>DISCOVER OUR PRODUCTS</h1>
        <p className={styles.subtitle}>
          Explore our collection of premium products curated just for you
        </p>
      </div>

      <div className={styles.contentWrapper}>
        <Filters
          categories={categories}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          isOpen={isFilterOpen}
          onToggle={() => setIsFilterOpen(!isFilterOpen)}
        />

        <section className={styles.productGrid}>
          <Suspense fallback={<div>Loading products...</div>}>
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
          </Suspense>
        </section>
      </div>
      <Footer />
    </main>
  );
}