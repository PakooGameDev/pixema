<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTokensTable extends Migration
{
    public function up()
    {
        Schema::create('tokens', function (Blueprint $table) {
            $table->id(); // Уникальный идентификатор
            $table->foreignId('userID')->constrained('users')->onDelete('cascade'); // Внешний ключ на таблицу users
            $table->text('refreshToken'); // Поле для хранения refreshToken
            $table->timestamps(); // Поля created_at и updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('tokens');
    }
}


