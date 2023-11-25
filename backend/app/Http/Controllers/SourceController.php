<?php

namespace App\Http\Controllers;

use App\Http\Resources\SourceResource;
use App\Services\SourceServiceInterface;
use Illuminate\Http\Request;

class SourceController extends Controller
{
    public SourceServiceInterface $sourceService;

    public function __construct(SourceServiceInterface $sourceService)
    {
        $this->sourceService = $sourceService;
    }

    public function index()
    {
        $result = $this->sourceService->fetchAll();

        return SourceResource::collection($result);
    }
}
