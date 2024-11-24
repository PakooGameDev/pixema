<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Movie;

class MoviePosterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($id = 1; $id <=1000; $id++) {
            $posterPath = "../../../frontend/src/assets/images/movie_{$id}.png"; // Путь к изображению постера

            // Проверяем, существует ли файл
            if (file_exists(public_path($posterPath))) {
                // Находим фильм по ID
                $movie = Movie::find($id);
                if ($movie) {
                    $movie->poster_image = $posterPath; // Устанавливаем путь к постеру
                    $movie->save(); // Сохраняем изменения
                }
            }
        }
    }
}


