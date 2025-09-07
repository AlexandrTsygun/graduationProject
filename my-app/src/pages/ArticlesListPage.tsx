// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { type RootState, type AppDispatch } from '../store';
// import { fetchArticles } from '../store/articles/articlesThunks';
// import ArticleCard from '../components/ArticleCard/ArticleCard';
// import './ArticlesListPage.scss';

// function ArticlesListPage() {
//   const dispatch = useDispatch<AppDispatch>();
//   const { list, isLoading, error } = useSelector((state: RootState) => state.articles);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortBy, setSortBy] = useState('newest');
//   const [updateFilter, setUpdateFilter] = useState('recent');
//   const itemsPerPage = 9;

//   useEffect(() => {
//     dispatch(fetchArticles());
//   }, [dispatch]);

//   const filteredArticles = list
//     .filter(article => article.title.toLowerCase().includes(searchQuery.toLowerCase()))
//     .sort((a, b) => sortBy === 'newest'
//       ? new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
//       : new Date(a.published_at).getTime() - new Date(b.published_at).getTime()
//     )
//     .filter(article => {
//       const daysAgo = (Date.now() - new Date(article.published_at).getTime()) / (1000 * 60 * 60 * 24);
//       return updateFilter === 'recent' ? daysAgo <= 30 : daysAgo > 30;
//     });

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredArticles.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

//   const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
//   const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     setCurrentPage(1);
//   };

//   if (isLoading) return <div className="loading">Загрузка...</div>;
//   if (error) return <div className="error">Ошибка: {error}</div>;

//   return (

//     <div className="container">
//       <div className="page-header">

//         <div className="header-top">
//           <div className="logo-container">
//             <img src="/img/Union.svg" alt="Logo" className="logo-image" />
//             <Link to="/" className="logo-link"><span className="logo">MetaBlog</span></Link>
//           </div>

//           <form className="search-form" onSubmit={handleSearch}>
//             <input className="search-input"
//               type="text"
//               placeholder="Search"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//               <button type="submit" className="search-button">🔍</button>

//           </form>

//         </div>

//         <h1 className="title-blog">News Blog</h1>

//         <div className="filters">
//           <div className="filter-group">
//             <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//               <option value="newest">Сначала новые</option>
//               <option value="oldest">Сначала старые</option>
//             </select>
//           </div>

//           <div className="filter-group">
//             <select value={updateFilter} onChange={(e) => setUpdateFilter(e.target.value)}>
//               <option value="recent">Недавно обновленные</option>
//               <option value="old">Давно обновленные</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="grid">
//         {currentItems.map((article) => (
//           <ArticleCard key={article.id} article={article} />
//         ))}
//       </div>

//       {filteredArticles.length > itemsPerPage && (
//         <div className="pagination">
//           <button onClick={prevPage} disabled={currentPage === 1}>Load Prev</button>
//           <span>{currentPage} / {totalPages}</span>
//           <button onClick={nextPage} disabled={currentPage === totalPages}>Load Next</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ArticlesListPage;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { type RootState, type AppDispatch } from '../store';
import { fetchArticles } from '../store/articles/articlesThunks';
import ArticleCard from '../components/ArticleCard/ArticleCard';
import './ArticlesListPage.scss';

function ArticlesListPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, isLoading, error } = useSelector((state: RootState) => state.articles);
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('newest');
  const [updateFilter, setUpdateFilter] = useState('recent');
  const itemsPerPage = 9;

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  // Читаем параметр поиска из URL при загрузке
  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  // Функция для очистки поиска при клике на логотип
  const handleLogoClick = () => {
    setSearchQuery('');
    setSearchParams({});
    setCurrentPage(1);
  };

  const filteredArticles = list
    .filter(article => article.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => sortBy === 'newest'
      ? new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      : new Date(a.published_at).getTime() - new Date(b.published_at).getTime()
    )
    .filter(article => {
      const daysAgo = (Date.now() - new Date(article.published_at).getTime()) / (1000 * 60 * 60 * 24);
      return updateFilter === 'recent' ? daysAgo <= 30 : daysAgo > 30;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredArticles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery.trim() });
    } else {
      setSearchParams({});
    }
  };

  if (isLoading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <div className="container">
      <div className="page-header">
        <div className="header-top">
          <div className="logo-container">
            <img src="/img/Union.svg" alt="Logo" className="logo-image" />
            <Link
              to="/"
              className="logo-link"
              onClick={handleLogoClick}
            >
              <span className="logo">MetaBlog</span>
            </Link>
          </div>

          <form className="search-form" onSubmit={handleSearch}>
            <input className="search-input"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">🔍</button>
          </form>
        </div>

        <h1 className="title-blog">News Blog</h1>

        <div className="filters">
          <div className="filter-group">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Сначала новые</option>
              <option value="oldest">Сначала старые</option>
            </select>
          </div>

          <div className="filter-group">
            <select value={updateFilter} onChange={(e) => setUpdateFilter(e.target.value)}>
              <option value="recent">Недавно обновленные</option>
              <option value="old">Давно обновленные</option>
            </select>
          </div>
        </div>
      </div>

      {/* Сообщение "Ничего не найдено" */}
      {filteredArticles.length === 0 && searchQuery && (
        <div className="no-results">
          <p>По запросу "{searchQuery}" ничего не найдено</p>
        </div>
      )}

      {/* Сообщение "Нет статей" если список пустой без поиска */}
      {filteredArticles.length === 0 && !searchQuery && (
        <div className="no-results">
          <p>Статьи не найдены</p>
        </div>
      )}

      {/* Сетка со статьями */}
      {filteredArticles.length > 0 && (
        <>
          <div className="grid">
            {currentItems.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {filteredArticles.length > itemsPerPage && (
            <div className="pagination">
              <button onClick={prevPage} disabled={currentPage === 1}>Load Prev</button>
              <span>{currentPage} / {totalPages}</span>
              <button onClick={nextPage} disabled={currentPage === totalPages}>Load Next</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ArticlesListPage;




