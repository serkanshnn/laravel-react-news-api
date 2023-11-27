<?php

namespace App\Services;

use App\Models\Article;
use App\Models\Author;
use App\Models\Category;
use App\Models\Source;
use App\Models\UserFavorite;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class ArticleService extends BaseService implements ArticleServiceInterface
{
    public AuthorServiceInterface $authorService;
    public SourceServiceInterface $sourceService;
    public CategoryServiceInterface $categoryService;
    public UserServiceInterface $userService;
    public UserFavoriteServiceInterface $userFavoriteService;

    public function __construct(AuthorServiceInterface $authorService, SourceServiceInterface $sourceService, CategoryServiceInterface $categoryService, UserServiceInterface $userService, UserFavoriteServiceInterface $userFavoriteService)
    {
        parent::__construct(Article::class);
        $this->authorService = $authorService;
        $this->sourceService = $sourceService;
        $this->categoryService = $categoryService;
        $this->userService = $userService;
        $this->userFavoriteService = $userFavoriteService;
    }

    public function updateOrCreate(array $filters, array $parameters): Model
    {
        $source = null;
        $author = null;

        if ($parameters['source_name']) {
            $source = $this->sourceService->updateOrCreate(['name' => $parameters['source_name']], ['name' => $parameters['source_name']]);
        }

        if ($parameters['author_name']) {
            $author = $this->authorService->updateOrCreate(['name' => $parameters['author_name']], ['name' => $parameters['author_name']]);
        }

        if ($parameters['category_name']) {
            $category = $this->categoryService->updateOrCreate(['name' => $parameters['author_name']], ['name' => $parameters['author_name']]);
        }


        return $this->model::query()->updateOrCreate($filters,
            [
                'url' => $parameters['url'],
                'description' => $parameters['description'],
                'content' => $parameters['content'],
                'image_url' => $parameters['image_url'],
                'published_at' => $parameters['published_at'],
                'author_id' => $author?->id,
                'source_id' => $source?->id,
                'category_id' => $category?->id,
            ]);

    }

    public function fetchAllWithFilter(array $filters = [], string $search = '', int $perPage = 6, int $page = 1, string $orderKey = 'id', string $sortBy = 'asc'): LengthAwarePaginator
    {
        $query = $this->model::query()
            ->orderBy($orderKey, $sortBy);

        $query = $this->searchAndFilter($query, $search, $filters);


        return $query->paginate($perPage, ['*'], 'page', $page);
    }

    private function searchAndFilter($query, $search, $filters): Builder
    {
        $newQuery = $query->where(function ($qq) use ($search) {
            $qq->where('title', 'ilike', '%' . $search . '%')
                ->orWhere('content', 'ilike', '%' . $search . '%')
                ->orWhere('description', 'ilike', '%' . $search . '%')
                ->orWhereHas('author', function ($q) use ($search) {
                    $q->where('name', 'ilike', '%' . $search . '%');
                })
                ->orWhereHas('source', function ($q) use ($search) {
                    $q->where('name', 'ilike', '%' . $search . '%');
                })
                ->orWhereHas('category', function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%');
                });
        });

        $from = $filters['from'] ?? null;
        $to = $filters['to'] ?? null;
        $categoryId = $filters['category_id'] ?? null;
        $sourceId = $filters['source_id'] ?? null;
        $authorId = $filters['author_id'] ?? null;

        if ($from) {
            $newQuery = $newQuery->whereDate('published_at', '>=', $from);
        }

        if ($to) {
            $newQuery = $newQuery->whereDate('published_at', '<=', $to);
        }

        if ($categoryId) {
            $newQuery = $newQuery->where('category_id', $categoryId);
        }

        if ($sourceId) {
            $newQuery = $newQuery->where('source_id', (int)$sourceId);
        }

        if ($authorId) {
            $newQuery = $newQuery->where('author_id', $authorId);
        }

        return $newQuery;
    }

    public function personalizedArticles($userId, array $filters = [], string $search = '', int $perPage = 6, int $page = 1, string $orderKey = 'id', string $sortBy = 'asc'): LengthAwarePaginator
    {
        $user = $this->userService->first(['id' => $userId]);
        $authorIds = $user->authors->pluck('id')->toArray();
        $sourceIds = $user->sources->pluck('id')->toArray();
        $categoryIds = $user->categories->pluck('id')->toArray();

        $query = $this->model::query()
            ->whereIn('author_id', $authorIds)
            ->orWhereIn('source_id', $sourceIds)
            ->orWhereIn('category_id', $categoryIds);

        $query = $this->searchAndFilter($query, $search, $filters);


        return $query->paginate($perPage, ['*'], 'page', $page);
    }
}
