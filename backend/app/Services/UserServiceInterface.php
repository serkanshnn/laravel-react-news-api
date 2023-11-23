<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;

interface UserServiceInterface {
    public function createToken(array $parameters): Model;
}
