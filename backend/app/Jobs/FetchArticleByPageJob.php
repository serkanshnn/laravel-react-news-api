<?php

namespace App\Jobs;

use App\Models\Article;
use App\Models\Author;
use App\Models\Source;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
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
    public function handle(): void
    {
        if (count($this->data)) {
            $this->storeArticle($this->data);

            if ($this->page < $this->total_page) {
                FetchArticleByPageJob::dispatch($this->site, $this->page + 1);
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
            $source = null;
            $author = null;

            if ($article['source_name']) {
                $source = Source::query()->updateOrCreate(['name' => $article['source_name']], ['name' => $article['source_name']]);
            }

            if ($article['author_name']) {
                $author = Author::query()->updateOrCreate(['name' => $article['author_name']], ['name' => $article['author_name']]);
            }


            Article::query()->updateOrCreate(['title' => $article['title']],
                [
                    'url' => $article['url'],
                    'description' => $article['description'],
                    'content' => $article['content'],
                    'image_url' => $article['image_url'],
                    'published_at' => $article['published_at'],
                    'author_id' => $author?->id,
                    'source_id' => $source?->id,
                ]);
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
