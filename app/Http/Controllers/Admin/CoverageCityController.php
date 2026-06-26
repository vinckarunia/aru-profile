<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CoverageCity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CoverageCityController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Coverage/Index', [
            'cities' => CoverageCity::orderBy('province')->orderBy('sort_order')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'city_name' => 'required|string|max:255',
            'province' => 'nullable|string|max:255',
        ]);

        CoverageCity::create([...$validated, 'sort_order' => CoverageCity::max('sort_order') + 1]);
        return back()->with('success', 'Kota berhasil ditambahkan.');
    }

    public function update(Request $request, CoverageCity $coverage)
    {
        $validated = $request->validate([
            'city_name' => 'required|string|max:255',
            'province' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $coverage->update($validated);
        return back()->with('success', 'Kota berhasil diperbarui.');
    }

    public function destroy(CoverageCity $coverage)
    {
        $coverage->delete();
        return back()->with('success', 'Kota berhasil dihapus.');
    }
}
