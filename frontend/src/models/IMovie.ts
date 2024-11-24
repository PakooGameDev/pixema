export interface IMovie {
    id: number; // ID фильма
    title: string; // Название фильма
    movie_description: string; // Описание фильма
    release_date: string; // Дата релиза (можно использовать Date, если вы хотите работать с объектом даты)
    budget: number; // Бюджет фильма
    country: string; // Страна
    production_companies: string; // Производственные компании
    actors: string; // Актеры
    director: string; // Режиссер
    writers: string; // Сценаристы
    ratings: number; // Рейтинг
    duration: number; // Длительность в минутах
    genre: string; // Жанр
    poster_image: string; // Путь к изображению постера
}
