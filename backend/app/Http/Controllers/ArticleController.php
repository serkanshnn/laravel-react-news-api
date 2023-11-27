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

    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 6);
        $page = $request->query('page', 1);
        $search = $request->query('q', '');

        $filters = [
            'from' => $request->query('from', ''),
            'to' => $request->query('to', ''),
            'category_id' => $request->query('category_id', ''),
            'source_id' => $request->query('source_id', ''),
            'author_id' => $request->query('author_id', ''),
        ];

        $articles = $this->articleService->fetchAllWithFilter($filters, $search, $perPage, $page, 'published_at', 'desc');

        return ArticleResource::collection($articles);
    }

    public function show(int $id)
    {
        $article = $this->articleService->first(['id' => $id]);

        return new ArticleResource($article);
    }

    public function personalizedArticles(Request $request)
    {
        $perPage = $request->query('per_page', 6);
        $page = $request->query('page', 1);
        $search = $request->query('q', '');

        $filters = [
            'from' => $request->query('from', ''),
            'to' => $request->query('to', ''),
            'category_id' => $request->query('category_id', ''),
            'source_id' => $request->query('source_id', ''),
            'author_id' => $request->query('author_id', ''),
        ];

        $articles = $this->articleService->personalizedArticles(auth()->id(), $filters, $search, $perPage, $page, 'published_at', 'desc');

        return ArticleResource::collection($articles);
    }
}
