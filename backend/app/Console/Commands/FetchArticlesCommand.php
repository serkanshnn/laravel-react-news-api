<?php

namespace App\Console\Commands;

use App\Jobs\FetchArticleByPageJob;
use App\Models\Article;
use App\Models\Author;
use App\Models\Source;
use Illuminate\Console\Command;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FetchArticlesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch:articles';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch articles from public apis';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $sites = config('articles.sites');

        foreach ($sites as $site) {
            try {
                $result = Http::get($site['url'], $site['query']);
                $data = $result->json();

                $results = Arr::get($data, $site['meta']['response_key']);
                $totalCount = Arr::get($data, $site['meta']['total_count_key']);
                $totalPages = (int)ceil($totalCount/$site['meta']['per_page']);

                if ($site['meta']['count_type'] === 'pages') {
                    $totalPages = $totalCount;
                }

                if ($totalPages > 0) {
                    FetchArticleByPageJob::dispatch($site, 1, $totalPages, $results);
                }
            } catch (\Throwable $throwable) {
                Log::error($throwable);
            }
        }
    }
}
