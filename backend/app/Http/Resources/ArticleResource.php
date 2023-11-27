<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'content' => $this->content,
            'url' => $this->url,
            'image_url' => $this->image_url,
            'published_at' => $this->published_at,
            'is_author_liked' => $this->is_author_favorised,
            'is_source_liked' => $this->is_source_favorised,
            'is_category_liked' => $this->is_category_favorised,
            'author' => new AuthorResource($this->author),
            'source' => new SourceResource($this->source),
        ];
    }
}
