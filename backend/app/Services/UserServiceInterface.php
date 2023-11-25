<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;

interface UserServiceInterface extends BaseServiceInterface {
    public function createToken(array $parameters): Model;
}
