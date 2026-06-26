<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GalleryItemController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Gallery/Index', [
            'items' => GalleryItem::orderBy('sort_order')->get()->map(function ($g) {
                $g->image_url = $g->image ? url('/media/' . $g->image) : null;
                return $g;
            }),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string|max:500',
        ]);

        GalleryItem::create([...$validated, 'sort_order' => GalleryItem::max('sort_order') + 1]);
        return back()->with('success', 'Item galeri berhasil ditambahkan.');
    }

    public function update(Request $request, GalleryItem $gallery)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string|max:500',
            'is_active' => 'boolean',
        ]);

        $gallery->update($validated);
        return back()->with('success', 'Item galeri berhasil diperbarui.');
    }

    public function destroy(GalleryItem $gallery)
    {
        $gallery->delete();
        return back()->with('success', 'Item galeri berhasil dihapus.');
    }

    public function reorder(Request $request)
    {
        $request->validate(['ids' => 'required|array', 'ids.*' => 'integer|exists:gallery_items,id']);
        foreach ($request->ids as $i => $id) {
            GalleryItem::where('id', $id)->update(['sort_order' => $i + 1]);
        }
        return response()->json(['success' => true]);
    }
}
