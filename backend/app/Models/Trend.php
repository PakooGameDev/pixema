<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trend extends Model
{
    use HasFactory;

    protected $fillable = [
        'movie_id',
        'current_views',
        'previous_views',
        'trend_score',
        'last_updated',
    ];

    public function movie()
    {
        return $this->belongsTo(Movie::class);
    }
}
