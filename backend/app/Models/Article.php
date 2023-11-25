<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'description',
        'url',
        'image_url',
        'published_at',
        'author_id',
        'source_id',
    ];

    protected $with = [
        'author',
        'source'
    ];

    public function author(): BelongsTo
    {
        return  $this->belongsTo(Author::class);
    }

    public function source(): BelongsTo
    {
        return  $this->belongsTo(Author::class);
    }
}
