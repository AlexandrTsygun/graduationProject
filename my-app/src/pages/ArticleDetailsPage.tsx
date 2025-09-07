import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { type RootState, type AppDispatch } from '../store';
import { fetchArticleById } from '../store/articles/articlesThunks';
import './ArticleDetailsPage.scss';

function ArticleDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { selected, isLoading, error } = useSelector((state: RootState) => state.articles);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    if (id) {
      dispatch(fetchArticleById(Number(id)));
    }
  }, [dispatch, id]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  if (!selected) {
    return (
      <div className="container">
        <div className="notFound">
          <p>Блог не найден</p>
          <Link to="/">На главную</Link>
        </div>
      </div>
    );
  }

  if (isLoading) return <div className="loading">Загрузка статьи...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <div className="container">
      <div className="page-header">
        <div className="header-top">

          <div className="logo-container">
            <img src="/img/Union.svg" alt="Logo" className="logo-image" />
            <Link to="/" className="logo-link">
              <span className="logo">MetaBlog</span>
            </Link>
          </div>

          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">🔍</button>
          </form>
        </div>
      </div>

      <div className="container-details__page">

        <h1 className="title">{selected.title}</h1>

        <div className="article-meta">
          <span className="author">{selected.news_site || 'Автор неизвестен'}</span>
          <span className="date">
            {selected.published_at ? new Date(selected.published_at).toLocaleDateString() : 'Дата неизвестна'}
          </span>
        </div>

        {selected.image_url && (
          <img
            src={selected.image_url}
            alt={selected.title}
            className="image"
          />
        )}

        <p className="summary">{selected.summary || 'Информация недоступна'}</p>

        <a
          href={selected.url}
          className="backButton"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to site
        </a>

      </div>
    </div>
  );
}

export default ArticleDetailsPage;





