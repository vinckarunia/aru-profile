<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\ClientController;
use App\Http\Controllers\Admin\ContactSubmissionController;
use App\Http\Controllers\Admin\CoverageCityController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\GalleryItemController;
use App\Http\Controllers\Admin\LegalDocumentController;
use App\Http\Controllers\Admin\MediaUploadController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\StatController;
use Illuminate\Support\Facades\Route;

// Auth (guest)
Route::middleware('guest:admin')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.post');
});

// Protected
Route::middleware('auth.admin')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Settings
    Route::get('/settings/{group?}', [SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings/{group}', [SettingController::class, 'update'])->name('settings.update');

    // CRUD resources
    Route::resource('stats', StatController::class)->except(['create', 'edit', 'show']);
    Route::resource('services', ServiceController::class)->except(['create', 'edit', 'show']);
    Route::resource('coverage', CoverageCityController::class)->except(['create', 'edit', 'show']);
    Route::resource('clients', ClientController::class)->except(['create', 'edit', 'show']);
    Route::resource('legal', LegalDocumentController::class)->except(['create', 'edit', 'show']);
    Route::resource('gallery', GalleryItemController::class)->except(['create', 'edit', 'show']);

    // Sort order (AJAX)
    Route::post('/stats/reorder', [StatController::class, 'reorder'])->name('stats.reorder');
    Route::post('/services/reorder', [ServiceController::class, 'reorder'])->name('services.reorder');
    Route::post('/clients/reorder', [ClientController::class, 'reorder'])->name('clients.reorder');
    Route::post('/legal/reorder', [LegalDocumentController::class, 'reorder'])->name('legal.reorder');
    Route::post('/gallery/reorder', [GalleryItemController::class, 'reorder'])->name('gallery.reorder');

    // Media upload
    Route::post('/media/upload', [MediaUploadController::class, 'store'])->name('media.upload');
    Route::delete('/media/{media}', [MediaUploadController::class, 'destroy'])->name('media.destroy');

    // Contact submissions
    Route::get('/contacts', [ContactSubmissionController::class, 'index'])->name('contacts.index');
    Route::get('/contacts/{submission}', [ContactSubmissionController::class, 'show'])->name('contacts.show');
    Route::patch('/contacts/{submission}/read', [ContactSubmissionController::class, 'markRead'])->name('contacts.read');
    Route::delete('/contacts/{submission}', [ContactSubmissionController::class, 'destroy'])->name('contacts.destroy');
});
