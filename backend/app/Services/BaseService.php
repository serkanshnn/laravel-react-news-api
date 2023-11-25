<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
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

    public function first(array $parameters): ?Model
    {
        return $this->model->where($parameters)->first();
    }

    public function fetchAll($columns = ['*'], $orderKey = 'id', $sort = 'ASC'): Collection
    {
        return $this->model->orderBy($orderKey, $sort)->get($columns);
    }

    public function destroy(array $parameters): bool
    {
        $model = $this->model::where($parameters)->first();

        return $model->delete();
    }
}
