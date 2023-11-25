<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserFavoriteCreateRequest;
use App\Http\Requests\UserFavoriteDestroyRequest;
use App\Http\Resources\UserFavoriteCreateResource;
use App\Http\Resources\UserFavoriteResource;
use App\Services\UserFavoriteServiceInterface;
use Illuminate\Http\Request;

class UserFavoriteController extends Controller
{
    protected UserFavoriteServiceInterface $userFavoriteService;

    public function __construct(UserFavoriteServiceInterface $userFavoriteService)
    {
        $this->userFavoriteService = $userFavoriteService;
    }

    public function store(UserFavoriteCreateRequest $request)
    {
        $parameters = $request->validationData();

        $result = $this->userFavoriteService->updateOrCreate($parameters, $parameters);

        return new UserFavoriteCreateResource($result);
    }

    public function fetchUserFavorites()
    {
        $user = auth()->user();

        return new UserFavoriteResource($user);
    }

    public function destroy(UserFavoriteDestroyRequest $request)
    {
        $parameters = $request->validationData();
        $userFavorite = $this->userFavoriteService->first($parameters);

        if ($userFavorite) {
            $result = $this->userFavoriteService->destroy($parameters);
        } else {
            $result = true;
        }

        return response()->json($result);
    }
}
