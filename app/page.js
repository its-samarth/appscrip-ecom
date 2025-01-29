
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

export default async function Home() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.logo}>LOGO</div>
        <nav className={styles.nav}>
          <button className={styles.menuBtn}>
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
        <aside className={styles.sidebar}>
          <div className={styles.filterContainer}>
            <Filters 
              categories={categories}
              onFilterChange={async (category) => {
                'use server';
              }}
              onSortChange={async (sortType) => {
                'use server';
              }}
            />
          </div>
        </aside>

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
      <Footer/>
    </main>
  );
}
