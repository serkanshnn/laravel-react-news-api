<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

interface BaseServiceInterface {
    public function create(array $parameters): Model;
    public function updateOrCreate(array $filters, array $parameters): Model;
    public function first(array $parameters): ?Model;
    public function fetchAll(): Collection;
    public function destroy(array $parameters): bool;
}
