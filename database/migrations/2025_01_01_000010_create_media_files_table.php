<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('media_files', function (Blueprint $table) {
            $table->id();
            $table->string('disk', 50)->default('private');
            $table->string('path', 500)->unique();
            $table->string('filename');
            $table->string('mime_type', 100)->nullable();
            $table->bigInteger('size')->unsigned()->nullable();
            $table->string('alt_text', 500)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media_files');
    }
};
