<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Clients/Index', [
            'clients' => Client::orderBy('sort_order')->get()->map(function ($c) {
                $c->logo_url = $c->logo ? url('/media/' . $c->logo) : null;
                return $c;
            }),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|string|max:500',
            'website_url' => 'nullable|url|max:500',
        ]);

        Client::create([...$validated, 'sort_order' => Client::max('sort_order') + 1]);
        return back()->with('success', 'Klien berhasil ditambahkan.');
    }

    public function update(Request $request, Client $client)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|string|max:500',
            'website_url' => 'nullable|string|max:500',
            'is_active' => 'boolean',
        ]);

        $client->update($validated);
        return back()->with('success', 'Klien berhasil diperbarui.');
    }

    public function destroy(Client $client)
    {
        $client->delete();
        return back()->with('success', 'Klien berhasil dihapus.');
    }

    public function reorder(Request $request)
    {
        $request->validate(['ids' => 'required|array', 'ids.*' => 'integer|exists:clients,id']);
        foreach ($request->ids as $i => $id) {
            Client::where('id', $id)->update(['sort_order' => $i + 1]);
        }
        return response()->json(['success' => true]);
    }
}
