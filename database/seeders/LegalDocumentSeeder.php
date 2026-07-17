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
                'name_en' => 'Deed of Incorporation',
                'number' => 'C-331 HT.01.01.TH.2002',
                'issuer' => 'Notaris I Nyoman Arta, S.H.Kn.',
                'issuer_en' => 'Notary I Nyoman Arta, S.H.Kn.',
                'issued_date' => '2002-02-01',
                'sort_order' => 1,
            ],
            [
                'name' => 'NPWP',
                'name_en' => 'NPWP (Taxpayer Identification Number)',
                'number' => '02.048.971.2-407.000',
                'issuer' => 'Direktorat Jenderal Pajak',
                'issuer_en' => 'Directorate General of Taxes',
                'sort_order' => 2,
            ],
            [
                'name' => 'PKP (Pengusaha Kena Pajak)',
                'name_en' => 'PKP (Taxable Entrepreneur Certificate)',
                'number' => 'S1840PKP/WPJ.33/KP.0203/2015',
                'issuer' => 'KPP Pratama',
                'issuer_en' => 'Tax Office (KPP Pratama)',
                'issued_date' => '2015-01-01',
                'sort_order' => 3,
            ],
            [
                'name' => 'SIUP',
                'name_en' => 'SIUP (Business License)',
                'number' => '510/PK/152/DPMPTSP.PPJU',
                'issuer' => 'DPMPTSP',
                'issuer_en' => 'DPMPTSP',
                'sort_order' => 4,
            ],
            [
                'name' => 'TDP',
                'name_en' => 'TDP (Company Registration Certificate)',
                'number' => 'AHU-331150AH.01.02.TAHUN.2009',
                'issuer' => 'Kementerian Hukum dan HAM',
                'issuer_en' => 'Ministry of Law and Human Rights',
                'issued_date' => '2017-03-13',
                'sort_order' => 5,
            ],
            [
                'name' => 'Ijin Penyedia Jasa Pekerja/Buruh',
                'name_en' => 'Manpower Provider License',
                'number' => '560/1237-SK/PHI & JAMSOS',
                'issuer' => 'Dinas Ketenagakerjaan',
                'issuer_en' => 'Office of Manpower',
                'sort_order' => 6,
            ],
            [
                'name' => 'NIB (Nomor Induk Berusaha Berbasis Resiko)',
                'name_en' => 'NIB (Risk-Based Business Identification Number)',
                'number' => '0220 2033 2121 2',
                'issuer' => 'OSS (Online Single Submission)',
                'issuer_en' => 'OSS (Online Single Submission)',
                'issued_date' => '2020-03-13',
                'sort_order' => 7,
            ],
            [
                'name' => 'Sertifikat BPJS Ketenagakerjaan',
                'name_en' => 'BPJS Ketenagakerjaan Certificate',
                'number' => '02 GKI 002',
                'issuer' => 'BPJS Ketenagakerjaan',
                'issuer_en' => 'BPJS Ketenagakerjaan',
                'sort_order' => 8,
            ],
            [
                'name' => 'Sertifikat BPJS JP',
                'name_en' => 'BPJS JP Certificate',
                'number' => '160000000073565',
                'issuer' => 'BPJS Ketenagakerjaan',
                'issuer_en' => 'BPJS Ketenagakerjaan',
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
