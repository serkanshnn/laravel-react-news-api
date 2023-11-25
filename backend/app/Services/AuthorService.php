<?php

namespace App\Services;

use App\Models\Article;
use App\Models\Author;
use Illuminate\Database\Eloquent\Model;

class AuthorService extends BaseService implements AuthorServiceInterface {
    public function __construct()
    {
        parent::__construct(Author::class);
    }
}
