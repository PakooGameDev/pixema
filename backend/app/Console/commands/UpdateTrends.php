<?php

namespace App\Console\Commands;

use App\Models\Movie;
use App\Models\Trend;
use Carbon\Carbon;
use Illuminate\Console\Command;


class UpdateTrends extends Command
{
    protected $signature = 'trends:update';
    protected $description = 'Updates the trends table';

    public function handle(): void
    {
        $movies = Movie::all();

        foreach ($movies as $movie) {
            $trend = Trend::firstOrCreate(['movie_id' => $movie->id]);
            if ($trend->trend_score === -1) {
                $trend->trend_score = rand(1, 1000); // Задаем случайное значение от 1 до 1000
            } else {
                $trend->trend_score = $this->calculateTrendScore($movie->ratings, $trend->previous_views, $trend->current_views); 
            }
            $trend->previous_views = $trend->current_views ?? 0; // Установить значение по умолчанию, если null
            $trend->current_views =  0; // обнуляем текущией просмотры
            $trend->save();
        }

        $this->info('Trends table updated successfully.');
    }

    protected function calculateTrendScore(float $rating, ?int $previousViews, ?int $currentViews): int
    {
        $previousViews = $previousViews ?? 1; // Установить значение по умолчанию, если null
        $currentViews = $currentViews ?? 1; // Установить значение по умолчанию, если null
        $growth = $previousViews > 0 ? ($currentViews / $previousViews) : 0;
        $score = (int)($rating * 80 + $growth * 20);
        return $score;
    }
}
