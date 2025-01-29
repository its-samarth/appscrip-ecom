export const metadata = {
  title: 'Product Listing Page',
  description: 'Discover our amazing products collection',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "Product",
                  "name": "Product Catalog",
                  "description": "Discover our exclusive collection of products"
                }
              ]
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}