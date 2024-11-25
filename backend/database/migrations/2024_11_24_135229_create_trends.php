<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('trends', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('movie_id')->constrained()->onDelete('cascade');
            $table->integer('current_views')->default(0);
            $table->integer('previous_views')->default(0);
            $table->integer('trend_score')->default(-1);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('trends');
    }
};