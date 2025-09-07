// Здесь описываем как выглядит новость
export interface IArticle {
  id: number;           // Уникальный номер
  title: string;        // Заголовок
  url: string;          // Ссылка на статью
  image_url: string;    // Картинка
  summary: string;      // Краткое описание
  published_at: string; // Дата публикации
  updated_at: string;   // Дата обновления
  news_site?: string;   // Сайт-источник
}