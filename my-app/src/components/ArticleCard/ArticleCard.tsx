import { Link } from 'react-router-dom';
import { useState } from 'react';
import type { IArticle } from '../../types/article';
import './ArticleCard.scss';

interface ArticleCardProps {
  article: IArticle;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="card">
      {!imageError && article.image_url ? (
        <img
          className="image"
          src={article.image_url}
          alt={article.title}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="image-placeholder">📷</div>
      )}

      <div className="content">
        <h3 className="title-card">
          <Link to={`/article/${article.id}`}>
            {article.title}
          </Link>
        </h3>
        <p className="summary">
          {article.summary && article.summary.length > 100
            ? `${article.summary.substring(0, 150)}...`
            : article.summary || 'Описание отсутствует'
          }
        </p>

        <div className="article-meta">
          <span className="author">{article.news_site || 'Неизвестно'}</span>
          <span className="date">
            {article.published_at ? new Date(article.published_at).toLocaleDateString() : 'Нет даты'}
          </span>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;