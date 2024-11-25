<?php

// app/Models/Movie.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    protected $fillable = [
        'title',
        'movie_description', 
        'release_date', 
        'budget', 
        'country', 
        'production_companies', 
        'actors', 
        'director', 
        'writers', 
        'ratings', 
        'duration', 
        'genre', 
        'poster_image'
    ];

    public function trends()
    {
        return $this->hasMany(Trend::class);
    }
}

