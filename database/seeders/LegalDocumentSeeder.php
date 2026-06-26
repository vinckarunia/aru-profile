<?php

namespace Database\Seeders;

use App\Models\LegalDocument;
use Illuminate\Database\Seeder;

class LegalDocumentSeeder extends Seeder
{
    public function run(): void
    {
        $docs = [
            [
                'name' => 'Akta Pendirian Perusahaan',
                'number' => 'C-331 HT.01.01.TH.2002',
                'issuer' => 'Notaris I Nyoman Arta, S.H.Kn.',
                'issued_date' => '2002-02-01',
                'sort_order' => 1,
            ],
            [
                'name' => 'NPWP',
                'number' => '02.048.971.2-407.000',
                'issuer' => 'Direktorat Jenderal Pajak',
                'sort_order' => 2,
            ],
            [
                'name' => 'PKP (Pengusaha Kena Pajak)',
                'number' => 'S1840PKP/WPJ.33/KP.0203/2015',
                'issuer' => 'KPP Pratama',
                'issued_date' => '2015-01-01',
                'sort_order' => 3,
            ],
            [
                'name' => 'SIUP',
                'number' => '510/PK/152/DPMPTSP.PPJU',
                'issuer' => 'DPMPTSP',
                'sort_order' => 4,
            ],
            [
                'name' => 'TDP',
                'number' => 'AHU-331150AH.01.02.TAHUN.2009',
                'issuer' => 'Kementerian Hukum dan HAM',
                'issued_date' => '2017-03-13',
                'sort_order' => 5,
            ],
            [
                'name' => 'Ijin Penyedia Jasa Pekerja/Buruh',
                'number' => '560/1237-SK/PHI & JAMSOS',
                'issuer' => 'Dinas Ketenagakerjaan',
                'sort_order' => 6,
            ],
            [
                'name' => 'NIB (Nomor Induk Berusaha Berbasis Resiko)',
                'number' => '0220 2033 2121 2',
                'issuer' => 'OSS (Online Single Submission)',
                'issued_date' => '2020-03-13',
                'sort_order' => 7,
            ],
            [
                'name' => 'Sertifikat BPJS Ketenagakerjaan',
                'number' => '02 GKI 002',
                'issuer' => 'BPJS Ketenagakerjaan',
                'sort_order' => 8,
            ],
            [
                'name' => 'Sertifikat BPJS JP',
                'number' => '160000000073565',
                'issuer' => 'BPJS Ketenagakerjaan',
                'sort_order' => 9,
            ],
        ];

        foreach ($docs as $doc) {
            LegalDocument::updateOrCreate(
                ['name' => $doc['name']],
                $doc,
            );
        }
    }
}
