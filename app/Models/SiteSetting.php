<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class SiteSetting extends Model
{
    protected $fillable = ['key', 'value', 'type', 'group', 'label'];

    /**
     * Ambil semua setting sebagai key => value array (dicache 10 menit).
     */
    public static function allCached(): array
    {
        return Cache::remember('site_settings_all', 600, function () {
            return static::pluck('value', 'key')->toArray();
        });
    }

    /**
     * Ambil satu setting.
     */
    public static function get(string $key, mixed $default = null): mixed
    {
        $settings = static::allCached();
        return $settings[$key] ?? $default;
    }

    /**
     * Set satu setting dan invalidasi cache.
     */
    public static function set(string $key, mixed $value): void
    {
        static::updateOrCreate(['key' => $key], ['value' => $value]);
        Cache::forget('site_settings_all');
    }
}
