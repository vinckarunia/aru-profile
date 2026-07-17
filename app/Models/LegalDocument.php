<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LegalDocument extends Model
{
    protected $fillable = [
        'name', 'name_en', 'number', 'issuer', 'issuer_en', 'issued_date', 'expiry_date',
        'document_image', 'sort_order', 'is_active',
    ];

    protected function casts(): array
    {
        return [
            'issued_date' => 'date',
            'expiry_date' => 'date',
            'is_active' => 'boolean',
        ];
    }
}
