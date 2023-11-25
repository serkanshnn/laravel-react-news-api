<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleResource;
use App\Services\ArticleServiceInterface;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    protected ArticleServiceInterface $articleService;

    public function __construct(ArticleServiceInterface $articleService)
    {
        $this->articleService = $articleService;
    }

    public function index()
    {
        $articles = $this->articleService->fetchAll();

        return ArticleResource::collection($articles);
    }
}
