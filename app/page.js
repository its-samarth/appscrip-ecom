// page.js
import { Suspense } from 'react';
import ProductSection from './components/ProductSection';
import styles from './page.module.css';
import Footer from './components/Footer';

// Server-side data fetching
async function getProducts() {
  try {
    const res = await fetch('https://fakestoreapi.com/products', {
      next: { revalidate: 3600 }
    });
    return res.json();
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

async function getCategories() {
  try {
    const res = await fetch('https://fakestoreapi.com/products/categories', {
      next: { revalidate: 3600 }
    });
    return res.json();
  } catch (error) {
    console.error('Error loading categories:', error);
    return [];
  }
}

// Server Component
export default async function Home() {
  // Fetch data on the server
  const [initialProducts, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.logo}>LOGO</div>
        <nav className={styles.nav}>
          <button className={styles.menuBtn}>
            <img src="/window.svg" alt="Menu" width={24} height={24} />
          </button>
          <button className={styles.globeBtn}>
            <img src="/globe.svg" alt="Language" width={24} height={24} />
          </button>
        </nav>
      </header>

      <div className={styles.heroSection}>
        <h1 className={styles.title}>DISCOVER OUR PRODUCTS</h1>
        <p className={styles.subtitle}>
          Explore our collection of premium products curated just for you
        </p>
      </div>

      <Suspense fallback={<div>Loading products...</div>}>
        <ProductSection 
          initialProducts={initialProducts} 
          categories={categories} 
        />
      </Suspense>
      
      <Footer />
    </main>
  );
}