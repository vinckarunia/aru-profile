<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CoverageCity extends Model
{
    protected $fillable = ['city_name', 'province', 'sort_order', 'is_active'];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }
}
