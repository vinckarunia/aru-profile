<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class SettingController extends Controller
{
    protected array $groups = [
        'identity' => 'Identitas Perusahaan',
        'hero' => 'Hero Section',
        'about' => 'Tentang Kami',
        'contact' => 'Kontak',
        'footer' => 'Footer',
        'seo' => 'SEO & Meta',
    ];

    public function index(string $group = 'identity')
    {
        abort_unless(array_key_exists($group, $this->groups), 404);

        $settings = SiteSetting::where('group', $group)->get()->keyBy('key');

        return Inertia::render('Admin/Settings/Index', [
            'group' => $group,
            'groups' => $this->groups,
            'settings' => $settings,
            'mediaBaseUrl' => url('/media/'),
        ]);
    }

    public function update(Request $request, string $group)
    {
        abort_unless(array_key_exists($group, $this->groups), 404);

        foreach ($request->all() as $key => $value) {
            if (str_starts_with($key, '_')) continue;

            $setting = SiteSetting::where('key', $key)->where('group', $group)->first();
            if (!$setting) continue;

            SiteSetting::set($key, $value);
        }

        return back()->with('success', 'Pengaturan berhasil disimpan.');
    }
}
