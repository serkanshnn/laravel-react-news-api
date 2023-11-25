<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;

interface BaseServiceInterface {
    public function create(array $parameters): Model;
    public function updateOrCreate(array $filters, array $parameters): Model;
    public function first(array $parameters): Model;
}
