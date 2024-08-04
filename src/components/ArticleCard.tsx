import React from 'react';
import Link from 'next/link';
import { NoFallbackError } from 'next/dist/server/base-server';

interface ArticleCardProps {
  slug: string;
  title: string;
  description: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ slug, title, description }) => (
  <div>
    <Link href={`/articles/${slug}`}>
      <a>
        <h2>{title}</h2>
        <p>{description}</p>
      </a>
    </Link>
  </div>
);

export default ArticleCard;

