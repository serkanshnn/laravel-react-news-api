<?php

namespace App\Jobs;

use App\Services\ArticleServiceInterface;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FetchArticleByPageJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected ArticleServiceInterface $articleService;

    /**
     * Create a new job instance.
     */
    public function __construct(public array $site, public int $page = 1, public ?int $total_page = null, public ?array $data = [])
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(ArticleServiceInterface $articleService): void
    {
        $this->articleService = $articleService;

        if (count($this->data)) {
            $this->storeArticle($this->data);

            if ($this->page < $this->total_page) {
                FetchArticleByPageJob::dispatch($this->site, $this->page + 1, $this->total_page);
            }
        } else if ($this->page) {
            try {
                $result = Http::get($this->site['url'], $this->site['query']);
                $data = $result->json();

                $results = Arr::get($data, $this->site['meta']['response_key']);
                $totalCount = Arr::get($data, $this->site['meta']['total_count_key']);
                $totalPages = (int)ceil($totalCount / $this->site['meta']['per_page']);

                if ($this->site['meta']['count_type'] === 'pages') {
                    $totalPages = $totalCount;
                }

                $this->storeArticle($results);

                if ($this->page < $totalPages) {
                    FetchArticleByPageJob::dispatch($this->site, $this->page + 1, $totalPages);
                }
            } catch (\Throwable $throwable) {
                Log::error($throwable);
            }
        }
    }

    private function storeArticle($data)
    {
        foreach ($data as $result) {
            $article = $this->mapArticleItem($result, $this->site);
            $this->articleService->updateOrCreate(['title' => $article['title']], $article);
        }
    }

    private function mapArticleItem(array $item, $site)
    {
        $article = [];

        foreach ($site['meta']['item_mapper'] as $key => $value) {
            $article[$key] = $value ? Arr::get($item, $site['meta']['item_mapper'][$key]) : null;
        }

        return $article;
    }
}
