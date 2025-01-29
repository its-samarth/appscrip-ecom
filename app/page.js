// page.js
import { Suspense } from 'react';
import { Metadata } from 'next';
import ProductSection from './components/ProductSection';
import styles from './page.module.css';
import Footer from './components/Footer';

// Dynamic metadata generation
export async function generateMetadata() {
  const products = await getProducts();
  const categories = await getCategories();
  
  return {
    title: 'Discover Our Products | Premium Collection',
    description: 'Explore our collection of premium products curated just for you. Find the best deals across multiple categories.',
    keywords: categories.join(', '),
    openGraph: {
      title: 'Discover Our Products | Premium Collection',
      description: 'Explore our handpicked collection of premium products',
      type: 'website',
     
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

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
  const [initialProducts, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  // Generate organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Your Store Name",
    "url": "https://yourstore.com",
    "logo": "/logo.png"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.logo} role="banner">LOGO</div>
          <nav className={styles.nav} role="navigation" aria-label="Main navigation">
            <button 
              className={styles.menuBtn}
              aria-label="Open menu"
            >
              
            </button>
            <button 
              className={styles.globeBtn}
              aria-label="Change language"
            >
             
            </button>
          </nav>
        </header>

        <div className={styles.heroSection}>
          <h1 className={styles.title}>DISCOVER OUR PRODUCTS</h1>
          <p className={styles.subtitle}>
            Explore our collection of premium products curated just for you
          </p>
        </div>

        <Suspense 
          fallback={
            <div role="alert" aria-busy="true">
              Loading products...
            </div>
          }
        >
          <ProductSection 
            initialProducts={initialProducts} 
            categories={categories} 
          />
        </Suspense>
        
        <Footer />
      </main>
    </>
  );
}