<?php

return [
    'sites' => [
        [
            'url' => 'https://newsapi.org/v2/everything',
            'api_key' => env('NEWSAPI_API_KEY'),
            'query' => [
                'sortBy' => 'publishedAt',
                'apiKey' => env('NEWSAPI_API_KEY'),
                'from' => \Carbon\Carbon::now()->subDay()->format('Y-m-d'),
                'q' => 'technology'
            ],
            'meta' => [
                'response_key' => 'articles',
                'total_count_key' => 'totalResults',
                'count_type' => 'items',
                'per_page' => 100,
                'item_mapper' => [
                    'title' => 'title',
                    'description' => 'description',
                    'content' => 'content',
                    'url' => 'url',
                    'image_url' => 'urlToImage',
                    'published_at' => 'publishedAt',
                    'source_name' => 'source.name',
                    'author_name' => 'author',
                ]
            ]
        ],
        [
            'url' => 'https://content.guardianapis.com/search',
            'api_key' => env('THEGUARDIAN_API_KEY'),
            'query' => [
                'api-key' => env('THEGUARDIAN_API_KEY'),
                'from-date' => \Carbon\Carbon::now()->subDay()->format('Y-m-d'),
                'order-by' => 'newest',
                'show-fields' => 'all'
            ],
            'meta' => [
                'response_key' => 'response.results',
                'total_count_key' => 'response.pages',
                'count_type' => 'pages',
                'per_page' => 10,
                'item_mapper' => [
                    'title' => 'webTitle',
                    'description' => 'fields.main',
                    'content' => 'fields.body',
                    'url' => 'webUrl',
                    'image_url' => 'thumbnail',
                    'published_at' => 'webPublicationDate',
                    'source_name' => 'publication',
                    'author_name' => 'fields.byline',
                ]
            ]
        ],
        [
            'url' => 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
            'api_key' => env('NYTIMES_API_KEY'),
            'query' => [
                'api-key' => env('NYTIMES_API_KEY'),
                'begin_date' => \Carbon\Carbon::now()->subDay()->format('Ymd'),
                'sort' => 'newest',
            ],
            'meta' => [
                'response_key' => 'response.docs',
                'total_count_key' => 'response.meta.hits',
                'count_type' => 'items',
                'per_page' => 10,
                'item_mapper' => [
                    'title' => 'headline.main',
                    'description' => 'abstract',
                    'content' => 'lead_paragraph',
                    'url' => 'web_url',
                    'image_url' => '',
                    'published_at' => 'pub_date',
                    'source_name' => 'source',
                    'author_name' => 'byline.original',
                ]
            ]
        ],
    ],
];
