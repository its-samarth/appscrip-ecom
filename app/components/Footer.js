// components/Footer.js
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        {/* Newsletter Section */}
        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>BE THE FIRST TO KNOW</h3>
          <p className={styles.sectionText}>Sign up for updates from mettā muse.</p>
          <div className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.emailInput}
            />
            <button className={styles.subscribeButton}>SUBSCRIBE</button>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>QUICK LINKS</h3>
          <ul className={styles.linksList}>
            <li><a href="#">Orders & Shipping</a></li>
            <li><a href="#">Join/Login as a Seller</a></li>
            <li><a href="#">Payment & Pricing</a></li>
            <li><a href="#">Return & Refunds</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>CONTACT US</h3>
          <p className={styles.sectionText}>+44 221 133 5360</p>
          <p className={styles.sectionText}>customercare@mettamuse.com</p>
          <div className={styles.currencySection}>
            <h3 className={styles.sectionTitle}>CURRENCY</h3>
            <button className={styles.currencyButton}>
              <span>🌐</span> USD
            </button>
            <p className={styles.currencyNote}>
              Transactions will be completed in Euros and a currency reference is available on hover.
            </p>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>mettā muse ACCEPTS</h3>
          <div className={styles.paymentGrid}>
            {['Google Pay', 'Mastercard', 'PayPal', 'American Express', 'Apple Pay', 'Shop Pay'].map((method) => (
              <div key={method} className={styles.paymentMethod}>
                <img src={`/api/placeholder/60/40`} alt={method} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        Copyright © 2023 mettāmuse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
