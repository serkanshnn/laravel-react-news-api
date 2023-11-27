<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Services\CategoryServiceInterface;

class CategoryController extends Controller
{
    public CategoryServiceInterface $categoryService;

    public function __construct(CategoryServiceInterface $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function index()
    {
        $result = $this->categoryService->fetchAll();

        return CategoryResource::collection($result);
    }
}
