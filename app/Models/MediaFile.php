<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MediaFile extends Model
{
    protected $fillable = ['disk', 'path', 'filename', 'mime_type', 'size', 'alt_text'];
}
