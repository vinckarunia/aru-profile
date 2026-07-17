<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    @php
        $metaTitle = \App\Models\SiteSetting::get('meta_title', config('app.name'));
        $metaDesc = \App\Models\SiteSetting::get('meta_description', '');
        $ogImageName = \App\Models\SiteSetting::get('og_image', '');
        $ogImage = $ogImageName ? url('/media/' . $ogImageName) : '';
        $companyName = \App\Models\SiteSetting::get('company_name', 'PT. Alfa Reka Usaha');
        $phone = \App\Models\SiteSetting::get('phone', '');
        $address = \App\Models\SiteSetting::get('address', '');
        $email = \App\Models\SiteSetting::get('email', '');
        $siteUrl = url('/');
        $logoUrl = $siteUrl . '/images/logo/logo-original.png';

        $orgSchema = [
            '@context' => 'https://schema.org',
            '@type' => 'Organization',
            'name' => $companyName,
            'url' => $siteUrl,
            'logo' => $logoUrl,
        ];
        if (!empty($phone)) {
            $orgSchema['contactPoint'] = [
                '@type' => 'ContactPoint',
                'telephone' => $phone,
                'contactType' => 'customer service'
            ];
        }
        if (!empty($address)) {
            $orgSchema['address'] = [
                '@type' => 'PostalAddress',
                'streetAddress' => $address,
                'addressCountry' => 'ID'
            ];
        }
        if (!empty($email)) {
            $orgSchema['email'] = $email;
        }
    @endphp

    <title inertia>{{ $metaTitle }}</title>
    <meta name="description" content="{{ $metaDesc }}" inertia />
    <link rel="canonical" href="{{ $siteUrl }}" inertia />

    <!-- Open Graph -->
    <meta property="og:title" content="{{ $metaTitle }}" inertia />
    <meta property="og:description" content="{{ $metaDesc }}" inertia />
    <meta property="og:url" content="{{ $siteUrl }}" inertia />
    @if($ogImage)
        <meta property="og:image" content="{{ $ogImage }}" inertia />
    @endif
    <meta property="og:type" content="website" inertia />

    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image" inertia />
    <meta name="twitter:title" content="{{ $metaTitle }}" inertia />
    <meta name="twitter:description" content="{{ $metaDesc }}" inertia />
    @if($ogImage)
        <meta name="twitter:image" content="{{ $ogImage }}" inertia />
    @endif

    <!-- JSON-LD Organization -->
    <script type="application/ld+json" inertia>
        {!! json_encode($orgSchema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}
    </script>

    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-title" content="ARU" />
    <link rel="manifest" href="/site.webmanifest" />

    {{-- Fonts --}}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

    @routes
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    @inertiaHead
</head>
<body class="antialiased">
    @inertia
</body>
</html>
