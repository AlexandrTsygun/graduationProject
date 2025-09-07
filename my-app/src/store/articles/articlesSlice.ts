import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IArticle } from '../../types/article';

interface ArticlesState {
  list: IArticle[];
  isLoading: boolean;
  error: string | null;
  selected: IArticle | null;
}

const initialState: ArticlesState = {
  list: [],
  isLoading: false,
  error: null,
  selected: null,
};

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setArticles: (state, action: PayloadAction<IArticle[]>) => {
      state.isLoading = false;
      state.error = null;
      state.list = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelected: (state, action: PayloadAction<IArticle | null>) => {
      state.isLoading = false;
      state.error = null;
      state.selected = action.payload;
    },
  },
});

export const { setLoading, setArticles, setError, setSelected } = articlesSlice.actions;
export default articlesSlice.reducer;