<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactSubmissionController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Contacts/Index', [
            'submissions' => ContactSubmission::orderByDesc('created_at')->paginate(20),
        ]);
    }

    public function show(ContactSubmission $submission)
    {
        if (!$submission->is_read) {
            $submission->update(['is_read' => true]);
        }

        return Inertia::render('Admin/Contacts/Show', [
            'submission' => $submission,
        ]);
    }

    public function markRead(ContactSubmission $submission)
    {
        $submission->update(['is_read' => true]);
        return back()->with('success', 'Pesan ditandai sudah dibaca.');
    }

    public function destroy(ContactSubmission $submission)
    {
        $submission->delete();
        return redirect()->route('admin.contacts.index')->with('success', 'Pesan berhasil dihapus.');
    }
}
