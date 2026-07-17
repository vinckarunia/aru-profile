<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;

// Halaman publik
Route::get('/', [PublicController::class, 'index'])->name('home');

// Media serving (pengganti storage:link)
Route::get('/media/{path}', [MediaController::class, 'serve'])
    ->where('path', '.*')
    ->name('media.serve');

// Form kontak
Route::post('/contact', [ContactController::class, 'store'])
    ->middleware('throttle:3,1')
    ->name('contact.store');

// Testimonial submission
Route::post('/testimonials', [PublicController::class, 'submitTestimonial'])
    ->middleware('throttle:3,1')
    ->name('testimonials.store');

// Sitemap
Route::get('/sitemap.xml', [PublicController::class, 'sitemap'])->name('sitemap');

// Robots.txt
Route::get('/robots.txt', [PublicController::class, 'robots'])->name('robots');

