<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserFavoriteCreateRequest;
use App\Http\Resources\UserFavoriteResource;
use App\Models\Article;
use App\Services\UserFavoriteServiceInterface;
use Illuminate\Http\Request;

class UserFavoriteController extends Controller
{
    protected UserFavoriteServiceInterface $userFavoriteService;

    public function __construct(UserFavoriteServiceInterface $userFavoriteService)
    {
        $this->userFavoriteService = $userFavoriteService;
    }

    public function fetchUserFavorites()
    {
        $user = auth()->user();

        return new UserFavoriteResource($user);
    }

    public function createOrDelete(UserFavoriteCreateRequest $request)
    {
        $parameters = $request->validationData();
        $userFavorite = $this->userFavoriteService->first($parameters);

        if ($userFavorite) {
            $result = $this->userFavoriteService->destroy($parameters);
        } else {
            $result = $this->userFavoriteService->create($parameters);
        }

        return response()->json(!!$result);
    }
}
