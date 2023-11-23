<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class UserService extends BaseService implements UserServiceInterface {
    public function __construct()
    {
        parent::__construct(User::class);
    }

    public function createToken($parameters): Model
    {
        /** @var User $user */
        $user = $this->first([
            'email' => $parameters['email'],
        ]);

        $user->token = $user->createToken("innoscripta")->plainTextToken;

        return $user;
    }
}
