<?php

namespace App\Services;

use App\Models\Source;
use App\Models\UserFavorite;
use Illuminate\Database\Eloquent\Model;

class UserFavoriteService extends BaseService implements UserFavoriteServiceInterface {
    public function __construct()
    {
        parent::__construct(UserFavorite::class);
    }
}
