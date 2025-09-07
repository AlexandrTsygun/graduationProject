import { setLoading, setArticles, setError, setSelected } from './articlesSlice';
import { axiosInstance } from '../../api/axiosInstance';
import type { AppDispatch } from '..';

export const fetchArticles = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading());
      const response = await axiosInstance.get('/articles?limit=1000');
      dispatch(setArticles(response.data.results));
    } catch (error: any) {
      dispatch(setError('Не удалось загрузить новости'));
    }
  };
};

export const fetchArticleById = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading());
      console.log('Fetching article:', id);

      const response = await axiosInstance.get(`/articles/${id}`);
      console.log('Article data:', response.data);

      dispatch(setSelected(response.data));
    } catch (error: any) {
      console.error('Error:', error);
      dispatch(setError('Не удалось загрузить новость'));
    }
  };
};

