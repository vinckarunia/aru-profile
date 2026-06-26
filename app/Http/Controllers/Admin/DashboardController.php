<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\ContactSubmission;
use App\Models\CoverageCity;
use App\Models\Service;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'clients' => Client::count(),
                'services' => Service::count(),
                'cities' => CoverageCity::count(),
            ],
            'unreadContacts' => ContactSubmission::where('is_read', false)->count(),
        ]);
    }
}
