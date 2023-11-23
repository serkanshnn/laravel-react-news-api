<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\LoginResource;
use App\Http\Resources\RegisterResource;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function register(RegisterRequest $request)
    {
        try {
            $parameters = $request->validated();

            $this->userService->create([
                'name' => $parameters['name'],
                'email' => $parameters['email'],
                'password' => Hash::make($parameters['password'])
            ]);

            /** @var User $user */
            $user = $this->userService->createToken([
                'email' => $parameters['email'],
            ]);

            return new RegisterResource($user);
        } catch (\Throwable $throwable) {
            return response()->json([
                'status' => false,
                'message' => $throwable->getMessage()
            ], 500);
        }
    }

    public function login(LoginRequest $request)
    {
        try {
            $parameters = $request->validated();

            if(!Auth::attempt($request->only(['email', 'password']))){
                return response()->json([
                    'status' => false,
                    'message' => 'Email & Password does not match with our record.',
                ], 401);
            }

            /** @var User $user */
            $user = $this->userService->createToken([
                'email' => $parameters['email'],
            ]);

            return new LoginResource($user);
        } catch (\Throwable $throwable) {
            return response()->json([
                'status' => false,
                'message' => $throwable->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $user = $request->user();

            $user->tokens()->delete();

            return response()->json(['data' => true]);
        } catch (\Throwable $throwable) {
            return response()->json([
                'status' => false,
                'message' => $throwable->getMessage()
            ], 500);
        }
    }
}
