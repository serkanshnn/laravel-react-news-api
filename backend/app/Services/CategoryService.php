<?php

namespace App\Services;

use App\Models\Category;

class CategoryService extends BaseService implements CategoryServiceInterface {
    public function __construct()
    {
        parent::__construct(Category::class);
    }
}
