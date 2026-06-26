<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LegalDocument;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LegalDocumentController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Legal/Index', [
            'documents' => LegalDocument::orderBy('sort_order')->get()->map(function ($d) {
                $d->image_url = $d->document_image ? url('/media/' . $d->document_image) : null;
                return $d;
            }),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'number' => 'nullable|string|max:255',
            'issuer' => 'nullable|string|max:255',
            'issued_date' => 'nullable|date',
            'expiry_date' => 'nullable|date',
            'document_image' => 'nullable|string|max:500',
        ]);

        LegalDocument::create([...$validated, 'sort_order' => LegalDocument::max('sort_order') + 1]);
        return back()->with('success', 'Dokumen berhasil ditambahkan.');
    }

    public function update(Request $request, LegalDocument $legal)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'number' => 'nullable|string|max:255',
            'issuer' => 'nullable|string|max:255',
            'issued_date' => 'nullable|date',
            'expiry_date' => 'nullable|date',
            'document_image' => 'nullable|string|max:500',
            'is_active' => 'boolean',
        ]);

        $legal->update($validated);
        return back()->with('success', 'Dokumen berhasil diperbarui.');
    }

    public function destroy(LegalDocument $legal)
    {
        $legal->delete();
        return back()->with('success', 'Dokumen berhasil dihapus.');
    }

    public function reorder(Request $request)
    {
        $request->validate(['ids' => 'required|array', 'ids.*' => 'integer|exists:legal_documents,id']);
        foreach ($request->ids as $i => $id) {
            LegalDocument::where('id', $id)->update(['sort_order' => $i + 1]);
        }
        return response()->json(['success' => true]);
    }
}
