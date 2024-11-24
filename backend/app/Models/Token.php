<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
    use HasFactory;

    protected $table = 'tokens'; // Указываем имя таблицы

    protected $fillable = [
        'userID',
        'refreshToken',
    ];

    // Определение связи с моделью User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

