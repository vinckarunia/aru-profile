<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MediaFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaUploadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpeg,png,webp,gif,pdf,svg|max:10240',
            'alt_text' => 'nullable|string|max:500',
        ]);

        $file = $request->file('file');
        $ext = strtolower($file->getClientOriginalExtension());
        $folder = in_array($ext, ['pdf']) ? 'documents' : 'images';
        $filename = Str::uuid() . '.' . $ext;
        $path = "media/{$folder}/{$filename}";

        Storage::disk('local')->putFileAs("media/{$folder}", $file, $filename);

        $media = MediaFile::create([
            'disk' => 'local',
            'path' => $path,
            'filename' => $filename,
            'mime_type' => Storage::disk('local')->mimeType($path),
            'size' => Storage::disk('local')->size($path),
            'alt_text' => $request->input('alt_text'),
        ]);

        return response()->json([
            'id' => $media->id,
            'path' => str_replace('media/', '', $path),
            'url' => url('/media/' . str_replace('media/', '', $path)),
        ]);
    }

    public function destroy(MediaFile $media)
    {
        Storage::disk('local')->delete($media->path);
        $media->delete();
        return response()->json(['success' => true]);
    }
}
