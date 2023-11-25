<?php

namespace App\Http\Controllers;

use App\Http\Resources\AuthorResource;
use App\Services\AuthorServiceInterface;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public AuthorServiceInterface $authorService;

    public function __construct(AuthorServiceInterface $authorService)
    {
        $this->authorService = $authorService;
    }

    public function index()
    {
        $result = $this->authorService->fetchAll();

        return AuthorResource::collection($result);
    }
}
