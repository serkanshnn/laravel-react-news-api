<?php

namespace App\Providers;

use App\Services\ArticleService;
use App\Services\ArticleServiceInterface;
use App\Services\AuthorService;
use App\Services\AuthorServiceInterface;
use App\Services\SourceService;
use App\Services\SourceServiceInterface;
use App\Services\UserService;
use App\Services\UserServiceInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(AuthorServiceInterface::class, AuthorService::class);
        $this->app->bind(SourceServiceInterface::class, SourceService::class);
        $this->app->bind(ArticleServiceInterface::class, ArticleService::class);
        $this->app->bind(UserServiceInterface::class, UserService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
