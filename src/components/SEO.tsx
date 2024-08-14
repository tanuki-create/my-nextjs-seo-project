import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, image }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image || '/images/logo.png'} />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": title,
        "url": "https://yourwebsite.com",
        "description": description,
        "image": image || '/images/logo.png'
      })}
    </script>
  </Head>
);

export default SEO;