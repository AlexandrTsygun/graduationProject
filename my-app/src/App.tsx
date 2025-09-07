import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticlesListPage from './pages/ArticlesListPage';
import ArticleDetailsPage from './pages/ArticleDetailsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ArticlesListPage />} />
          <Route path="/article/:id" element={<ArticleDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;