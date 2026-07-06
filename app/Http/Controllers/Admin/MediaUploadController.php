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
        
        $isImage = in_array($ext, ['jpg', 'jpeg', 'png', 'webp']);

        if ($isImage) {
            // Force WebP output format
            $filename = Str::uuid() . '.webp';
            $path = "media/{$folder}/{$filename}";
            
            // Image Processing using Intervention Image v4
            $manager = new \Intervention\Image\ImageManager(new \Intervention\Image\Drivers\Gd\Driver());
            $img = $manager->decode($file->getRealPath());
            
            // Scale down to max 1600px width/height to avoid giant source files
            $img->scaleDown(width: 1600, height: 1600);
            
            // Save main WebP image
            $mainEncoded = $img->encode(new \Intervention\Image\Encoders\WebpEncoder(quality: 80));
            Storage::disk('local')->put($path, (string)$mainEncoded);
            
            // Generate and save WebP thumbnail
            $img->scaleDown(width: 400, height: 400);
            $thumbEncoded = $img->encode(new \Intervention\Image\Encoders\WebpEncoder(quality: 75));
            $thumbPath = "media/{$folder}/" . str_replace('.webp', '-thumb.webp', $filename);
            Storage::disk('local')->put($thumbPath, (string)$thumbEncoded);
        } else {
            $filename = Str::uuid() . '.' . $ext;
            $path = "media/{$folder}/{$filename}";
            Storage::disk('local')->putFileAs("media/{$folder}", $file, $filename);
        }

        $media = MediaFile::create([
            'disk' => 'local',
            'path' => $path,
            'filename' => $filename,
            'mime_type' => $isImage ? 'image/webp' : Storage::disk('local')->mimeType($path),
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
        
        // Also delete thumbnail if it exists
        if (str_ends_with($media->path, '.webp')) {
            $thumbPath = str_replace('.webp', '-thumb.webp', $media->path);
            if (Storage::disk('local')->exists($thumbPath)) {
                Storage::disk('local')->delete($thumbPath);
            }
        }

        $media->delete();
        return response()->json(['success' => true]);
    }
}
