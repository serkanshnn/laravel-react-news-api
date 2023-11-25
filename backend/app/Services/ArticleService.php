<?php

namespace App\Services;

use App\Models\Article;
use Illuminate\Database\Eloquent\Model;

class ArticleService extends BaseService implements ArticleServiceInterface {
    public AuthorServiceInterface $authorService;
    public SourceServiceInterface $sourceService;

    public function __construct(AuthorServiceInterface $authorService, SourceServiceInterface $sourceService)
    {
        parent::__construct(Article::class);
        $this->authorService = $authorService;
        $this->sourceService = $sourceService;
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


        return $this->model::query()->updateOrCreate($filters,
            [
                'url' => $parameters['url'],
                'description' => $parameters['description'],
                'content' => $parameters['content'],
                'image_url' => $parameters['image_url'],
                'published_at' => $parameters['published_at'],
                'author_id' => $author?->id,
                'source_id' => $source?->id,
            ]);

    }
}
