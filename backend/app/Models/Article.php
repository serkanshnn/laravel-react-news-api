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
        'category_id',
    ];

    protected $with = [
        'author',
        'source',
        'category',
    ];

    protected $appends = [
        'is_author_favorised',
        'is_category_favorised',
        'is_source_favorised',
    ];

    public function getIsAuthorFavorisedAttribute(): bool
    {
        $userId = auth()->id();

        return UserFavorite::where([
            'user_id' => $userId,
            'related_type' => 'App\\Models\\Author',
            'related_id' => $this->author?->id
        ])->exists();
    }

    public function getIsCategoryFavorisedAttribute(): bool
    {
        $userId = auth()->id();

        return UserFavorite::where([
            'user_id' => $userId,
            'related_type' => 'App\\Models\\Category',
            'related_id' => $this->category?->id
        ])->exists();
    }

    public function getIsSourceFavorisedAttribute(): bool
    {
        $userId = auth()->id();

        return UserFavorite::where([
            'user_id' => $userId,
            'related_type' => 'App\\Models\\Source',
            'related_id' => $this->source?->id
        ])->exists();
    }

    public function author(): BelongsTo
    {
        return  $this->belongsTo(Author::class);
    }

    public function source(): BelongsTo
    {
        return  $this->belongsTo(Source::class);
    }

    public function category(): BelongsTo
    {
        return  $this->belongsTo(Category::class);
    }
}
