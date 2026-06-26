<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactSubmission extends Model
{
    protected $fillable = [
        'name', 'company', 'email', 'phone', 'subject', 'message', 'is_read', 'ip_address',
    ];

    protected function casts(): array
    {
        return ['is_read' => 'boolean'];
    }
}
