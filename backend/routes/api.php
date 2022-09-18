<?php

use App\Http\Controllers\ReviewController;
use App\Http\Controllers\VideogameController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// --------- VIDEOGAMES ---------

Route::get('videogames/{id}', [VideogameController::class, 'read'])
    ->name('videogame-read');

Route::get('videogames/{id}/reviews', [VideogameController::class, 'getReviews'])
    ->name('videogame-getreviews');

Route::get('videogames', [VideogameController::class, 'list'])
    ->name('videogame-list');

Route::post('videogames', [VideogameController::class, 'create'])
    ->name('videogame-create');

// --------- REVIEWS ---------

Route::get('reviews', [ReviewController::class, 'list'])
    ->name('review-list');
