<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('register', [\App\Http\Controllers\AuthController::class, 'register'])->name('register');
Route::post('login', [\App\Http\Controllers\AuthController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [\App\Http\Controllers\AuthController::class, 'logout'])->name('logout');
    Route::get('me', [\App\Http\Controllers\UserController::class, 'me'])->name('user.me');
    Route::get('authors', [\App\Http\Controllers\AuthorController::class, 'index'])->name('author.index');
    Route::get('sources', [\App\Http\Controllers\SourceController::class, 'index'])->name('source.index');
    Route::get('articles', [\App\Http\Controllers\ArticleController::class, 'index'])->name('articles.index');
    Route::post('favorites', [\App\Http\Controllers\UserFavoriteController::class, 'store'])->name('favorite.store');
    Route::delete('favorites', [\App\Http\Controllers\UserFavoriteController::class, 'destroy'])->name('favorite.destroy');
    Route::get('user-favorites', [\App\Http\Controllers\UserFavoriteController::class, 'fetchUserFavorites'])->name('user.favorites');
});
