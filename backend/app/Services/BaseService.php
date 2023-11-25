<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;
use Nette\NotImplementedException;

class BaseService implements BaseServiceInterface {
    /**
     * @var Model $model
     */
    protected $model;

    public function __construct($model)
    {
        if (empty($model)) {
            throw new NotImplementedException('You should specify Model class into your Service class.');
        }

        $this->model = new $model;
    }

    public function create(array $parameters): Model
    {
        return $this->model->create($parameters);
    }

    public function updateOrCreate(array $filters, array $parameters): Model
    {
        return $this->model->updateOrCreate($filters, $parameters);
    }

    public function first(array $parameters): Model
    {
        return $this->model->where($parameters)->first();
    }
}
