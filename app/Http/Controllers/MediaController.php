<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class MediaController extends Controller
{
    /**
     * Stream file dari storage/app/private/media/ ke browser.
     * Tidak memerlukan artisan storage:link sama sekali.
     */
    public function serve(string $path): StreamedResponse|\Illuminate\Http\Response
    {
        // Sanitasi path: cegah directory traversal
        $path = ltrim(str_replace(['..', '\\'], ['', '/'], $path), '/');
        $fullPath = 'media/' . $path;

        if (!Storage::disk('local')->exists($fullPath)) {
            abort(404);
        }

        $mimeType = Storage::disk('local')->mimeType($fullPath);
        $size = Storage::disk('local')->size($fullPath);

        $allowedMimes = [
            'image/jpeg', 'image/png', 'image/webp', 'image/gif',
            'image/svg+xml', 'application/pdf',
        ];

        if (!in_array($mimeType, $allowedMimes)) {
            abort(403);
        }

        $lastModified = Storage::disk('local')->lastModified($fullPath);
        $etag = md5($fullPath . $lastModified);

        return response()->stream(function () use ($fullPath) {
            $stream = Storage::disk('local')->readStream($fullPath);
            fpassthru($stream);
        }, 200, [
            'Content-Type' => $mimeType,
            'Content-Length' => $size,
            'Cache-Control' => 'public, max-age=2592000',
            'ETag' => '"' . $etag . '"',
            'Last-Modified' => gmdate('D, d M Y H:i:s', $lastModified) . ' GMT',
        ]);
    }
}
