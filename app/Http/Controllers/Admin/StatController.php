<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Stat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StatController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Stats/Index', [
            'stats' => Stat::orderBy('sort_order')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'value' => 'required|string|max:50',
            'label' => 'required|string|max:255',
        ]);

        Stat::create([...$validated, 'sort_order' => Stat::max('sort_order') + 1]);

        return back()->with('success', 'Statistik berhasil ditambahkan.');
    }

    public function update(Request $request, Stat $stat)
    {
        $validated = $request->validate([
            'value' => 'required|string|max:50',
            'label' => 'required|string|max:255',
            'is_active' => 'boolean',
        ]);

        $stat->update($validated);

        return back()->with('success', 'Statistik berhasil diperbarui.');
    }

    public function destroy(Stat $stat)
    {
        $stat->delete();
        return back()->with('success', 'Statistik berhasil dihapus.');
    }

    public function reorder(Request $request)
    {
        $request->validate(['ids' => 'required|array', 'ids.*' => 'integer|exists:stats,id']);

        foreach ($request->ids as $index => $id) {
            Stat::where('id', $id)->update(['sort_order' => $index + 1]);
        }

        return response()->json(['success' => true]);
    }
}
