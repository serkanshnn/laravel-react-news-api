<?php

namespace App\Services;

use App\Models\Source;
use Illuminate\Database\Eloquent\Model;

class SourceService extends BaseService implements SourceServiceInterface {
    public function __construct()
    {
        parent::__construct(Source::class);
    }
}
