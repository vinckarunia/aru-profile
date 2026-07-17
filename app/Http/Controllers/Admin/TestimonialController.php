<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Testimonials/Index', [
            'testimonials' => Testimonial::orderBy('sort_order')->get()->map(function ($t) {
                $t->avatar_url = $t->avatar ? url('/media/' . $t->avatar) : null;
                return $t;
            }),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'company_or_position' => 'required|string|max:255',
            'type' => 'required|string|in:corporate,worker',
            'testimonial' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'avatar' => 'nullable|string|max:500',
            'is_active' => 'boolean',
        ]);

        Testimonial::create([
            ...$validated,
            'sort_order' => Testimonial::max('sort_order') + 1,
        ]);

        return back()->with('success', 'Testimoni berhasil ditambahkan.');
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'company_or_position' => 'required|string|max:255',
            'type' => 'required|string|in:corporate,worker',
            'testimonial' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'avatar' => 'nullable|string|max:500',
            'is_active' => 'boolean',
        ]);

        $testimonial->update($validated);
        return back()->with('success', 'Testimoni berhasil diperbarui.');
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();
        return back()->with('success', 'Testimoni berhasil dihapus.');
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:testimonials,id',
        ]);

        foreach ($request->ids as $i => $id) {
            Testimonial::where('id', $id)->update(['sort_order' => $i + 1]);
        }

        return response()->json(['success' => true]);
    }
}
