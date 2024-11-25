<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMoviesTable extends Migration
{
    public function up()
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string('title', 50);
            $table->string('movie_description', 500);
            $table->date('release_date')->nullable();
            $table->decimal('budget', 15, 2)->nullable();
            $table->string('country', 50)->nullable();
            $table->string('production_companies', 18)->nullable();
            $table->string('actors', 17)->nullable();
            $table->string('director', 17)->nullable();
            $table->string('writers', 15)->nullable();
            $table->decimal('ratings', 3, 1)->nullable();
            $table->integer('duration')->nullable();
            $table->string('genre', 50)->nullable();
            $table->string('poster_image', 50)->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('movies');
    }
}


