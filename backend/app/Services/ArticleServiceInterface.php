<?php

namespace App\Services;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

interface ArticleServiceInterface extends BaseServiceInterface {
    public function fetchAllWithFilter(array $filters = [], string $search = '', int $perPage = 6, int $page = 1, string $orderKey = 'id', string $sortBy = 'asc'): LengthAwarePaginator;
}
