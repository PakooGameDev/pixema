<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    protected $table = 'movies'; 
    
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
        'poster_image',
    ];

}
