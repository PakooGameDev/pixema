<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMoviesTable extends Migration
{
    public function up()
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->id(); // Создает поле id
            $table->string('title'); // Название фильма
            $table->text('movie_description')->nullable(); // Описание фильма
            $table->date('release_date'); // Дата релиза
            $table->decimal('budget', 15, 2)->nullable(); // Бюджет
            $table->string('country')->nullable(); // Страна
            $table->string('production_companies')->nullable(); // Производственные компании
            $table->string('actors')->nullable(); // Актеры
            $table->string('director')->nullable(); // Режиссер
            $table->string('writers')->nullable(); // Сценаристы
            $table->float('ratings')->nullable(); // Рейтинг
            $table->integer('duration')->nullable(); // Длительность
            $table->string('genre')->nullable(); // Жанр
            $table->string('poster_image')->nullable(); // Изображение постера
            $table->timestamps(); // created_at и updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('movies');
    }
}

