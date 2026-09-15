import * as fs from 'fs';
import * as path from 'path';

const RELIGION_CODES = ['PAI', 'PAK', 'PKAT', 'PHINDU', 'PBUDDHA', 'PKHONGHUCU'] as const;
const ART_SD_CODES = ['SENI_RUPA', 'SENI_MUSIK', 'SENI_TARI', 'SENI_TEATER'] as const;
const ART_PRAKARYA_SMP_CODES = ['SENI_RUPA', 'SENI_MUSIK', 'SENI_TARI', 'SENI_TEATER', 'PRAKARYA'] as const;
const ART_SMA_CODES = ['SENI_RUPA', 'SENI_MUSIK', 'SENI_TARI', 'SENI_TEATER'] as const;

// =========================================================================
// 1. GENERATE SD
// =========================================================================
function generateSD(): string {
  let content = `import { CurriculumStructureRule } from '../types';

/**
 * STRUKTUR KURIKULUM RESMI JENJANG SEKOLAH DASAR (SD / MI)
 * KELAS 1 SAMPAI KELAS 6
 *
 * Regulasi Rujukan:
 * - Permendikbudristek No. 12 Tahun 2024 (Lampiran II: Struktur Kurikulum SD)
 * - Permendikdasmen No. 13 Tahun 2025 (Pembaruan Mapel Pilihan Coding dan AI)
 * - Permendikbud No. 37 Tahun 2018 (Struktur & KD Kurikulum 2013)
 *
 * Parameter Normatif:
 * - 1 JP = 35 menit
 * - Asumsi minggu efektif:
 *   Kelas 1 - 5: 36 minggu per tahun
 *   Kelas 6: 32 minggu per tahun
 */

const RELIGION_CODES = ['PAI', 'PAK', 'PKAT', 'PHINDU', 'PBUDDHA', 'PKHONGHUCU'] as const;
const ART_CODES = ['SENI_RUPA', 'SENI_MUSIK', 'SENI_TARI', 'SENI_TEATER'] as const;

export const SD_STRUCTURE_RULES: CurriculumStructureRule[] = [
  // =========================================================================
  // HISTORIS TA 2024/2025 (PERMENDIKBUDRISTEK NO. 12 TAHUN 2024)
  // Berlaku s/d 30 Juni 2025
  // =========================================================================
`;

  // 2024 SD Grade 1-6
  for (let grade = 1; grade <= 6; grade++) {
    const phase = grade <= 2 ? 'A' : grade <= 4 ? 'B' : 'C';
    const weeks = grade === 6 ? 32 : 36;
    const factor = grade === 6 ? 32 : 36;

    content += `\n  // --- KELAS ${grade} (FASE ${phase} - ${weeks} MINGGU) [2024] ---\n`;
    
    // Agama
    for (const rel of RELIGION_CODES) {
      const intra = 3 * factor;
      const koku = 1 * factor;
      content += `  {
    id: 'km-sd-${grade}-${rel.toLowerCase()}',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SD',
    grade: ${grade},
    phase: '${phase}',
    subjectCode: '${rel}',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${intra},
    kokurikulerAnnualJP: ${koku},
    totalAnnualJP: ${intra + koku},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 35,
    derivedWeeklyJP: 3,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Pendidikan Agama dan Budi Pekerti SD Kelas ${grade} (${intra} JP intrakurikuler + ${koku} JP Kokurikuler)',
  },\n`;
    }

    // Pancasila
    const pncIntra = 4 * factor;
    const pncKoku = 1 * factor;
    content += `  {
    id: 'km-sd-${grade}-pancasila',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SD',
    grade: ${grade},
    phase: '${phase}',
    subjectCode: 'PANCASILA',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${pncIntra},
    kokurikulerAnnualJP: ${pncKoku},
    totalAnnualJP: ${pncIntra + pncKoku},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 35,
    derivedWeeklyJP: 4,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Pendidikan Pancasila SD Kelas ${grade} (4 JP/minggu)',
  },\n`;

    // Bahasa Indonesia
    const bindoWeekly = grade === 1 ? 6 : grade === 2 ? 7 : 6;
    const bindoKokuWeekly = (grade === 1 || grade === 2) ? 2 : 1;
    const bindoIntra = bindoWeekly * factor;
    const bindoKoku = bindoKokuWeekly * factor;
    content += `  {
    id: 'km-sd-${grade}-bindo',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SD',
    grade: ${grade},
    phase: '${phase}',
    subjectCode: 'BINDO',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${bindoIntra},
    kokurikulerAnnualJP: ${bindoKoku},
    totalAnnualJP: ${bindoIntra + bindoKoku},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 35,
    derivedWeeklyJP: ${bindoWeekly},
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Bahasa Indonesia SD Kelas ${grade} (${bindoWeekly} JP/minggu intrakurikuler + ${bindoKoku} JP Kokurikuler)',
  },\n`;

    // Matematika
    const matWeekly = grade === 1 ? 4 : 5;
    const matIntra = matWeekly * factor;
    const matKoku = 1 * factor;
    content += `  {
    id: 'km-sd-${grade}-mat',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SD',
    grade: ${grade},
    phase: '${phase}',
    subjectCode: 'MAT',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${matIntra},
    kokurikulerAnnualJP: ${matKoku},
    totalAnnualJP: ${matIntra + matKoku},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 35,
    derivedWeeklyJP: ${matWeekly},
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Matematika SD Kelas ${grade} (${matWeekly} JP/minggu)',
  },\n`;

    // IPAS (Kelas 3-6)
    if (grade >= 3) {
      const ipasIntra = 5 * factor;
      const ipasKoku = 1 * factor;
      content += `  {
    id: 'km-sd-${grade}-ipas',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SD',
    grade: ${grade},
    phase: '${phase}',
    subjectCode: 'IPAS',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${ipasIntra},
    kokurikulerAnnualJP: ${ipasKoku},
    totalAnnualJP: ${ipasIntra + ipasKoku},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 35,
    derivedWeeklyJP: 5,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'IPAS SD Kelas ${grade} (5 JP/minggu)',
  },\n`;
    }

    // PJOK
    const pjokIntra = 3 * factor;
    const pjokKoku = 1 * factor;
    content += `  {
    id: 'km-sd-${grade}-pjok',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SD',
    grade: ${grade},
    phase: '${phase}',
    subjectCode: 'PJOK',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${pjokIntra},
    kokurikulerAnnualJP: ${pjokKoku},
    totalAnnualJP: ${pjokIntra + pjokKoku},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 35,
    derivedWeeklyJP: 3,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'PJOK SD Kelas ${grade} (3 JP/minggu)',
  },\n`;

    // Seni
    for (const art of ART_SD_CODES) {
      const artIntra = 3 * factor;
      const artKoku = 1 * factor;
      content += `  {
    id: 'km-sd-${grade}-${art.toLowerCase()}',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SD',
    grade: ${grade},
    phase: '${phase}',
    subjectCode: '${art}',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${artIntra},
    kokurikulerAnnualJP: ${artKoku},
    totalAnnualJP: ${artIntra + artKoku},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 35,
    derivedWeeklyJP: 3,
    selectionGroup: 'SENI_BUDAYA',
    minSelections: 1,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Seni dan Budaya SD Kelas ${grade} (3 JP/minggu)',
  },\n`;
    }

    // Bahasa Inggris
    const bingIntra = 2 * factor;
    content += `  {
    id: 'km-sd-${grade}-bing',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SD',
    grade: ${grade},
    phase: '${phase}',
    subjectCode: 'BING',
    subjectType: 'ELECTIVE',
    intrakurikulerAnnualJP: ${bingIntra},
    kokurikulerAnnualJP: 0,
    totalAnnualJP: ${bingIntra},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 35,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Bahasa Inggris SD Kelas ${grade} sebagai mapel pilihan (2 JP/minggu)',
  },\n`;

    // Mulok
    const mulokIntra = 2 * factor;
    content += `  {
    id: 'km-sd-${grade}-local-content',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SD',
    grade: ${grade},
    phase: '${phase}',
    subjectCode: 'LOCAL_CONTENT',
    subjectType: 'LOCAL_CONTENT',
    intrakurikulerAnnualJP: ${mulokIntra},
    kokurikulerAnnualJP: 0,
    totalAnnualJP: ${mulokIntra},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 35,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Muatan Lokal SD Kelas ${grade} (2 JP/minggu)',
  },\n`;
  }

  // =========================================================================
  // 2025/2026 SD Grade 1-6
  // =========================================================================
  content += `\n  // =========================================================================
  // CURRENT DATASET TA 2025/2026 & 2026/2027 (PERMENDIKDASMEN NO. 13 TAHUN 2025)
  // Berlaku mulai 1 Juli 2025 (TA 2025/2026)
  // =========================================================================\n`;

  for (let grade = 1; grade <= 6; grade++) {
    const phase = grade <= 2 ? 'A' : grade <= 4 ? 'B' : 'C';
    const weeks = grade === 6 ? 32 : 36;
    const factor = grade === 6 ? 32 : 36;

    content += `\n  // --- KELAS ${grade} (FASE ${phase} - ${weeks} MINGGU) [2025/2026] ---\n`;
    
    // Agama
    for (const rel of RELIGION_CODES) {
      const intra = 3 * factor;
      const koku = 1 * factor;
      content += `  {
    id: 'km25-sd-${grade}-${rel.toLowerCase()}',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SD',
    grade: ${grade},
    phase: '${phase}',
    subjectCode: '${rel}',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${intra},
    kokurikulerAnnualJP: ${koku},
    totalAnnualJP: ${intra + koku},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 35,
    derivedWeeklyJP: 3,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Pendidikan Agama dan Budi Pekerti SD Kelas ${grade} TA 2025/2026 (${intra} JP intrakurikuler + ${koku} JP Kokurikuler)',
  },\n`;
    }

    // Pancasila
    const pncIntra = 4 * factor;
    const pncKoku = 1 * factor;
    content += `  {
    id: 'km25-sd-${grade}-pancasila',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SD',
    grade: ${grade},
    phase: '${phase}',
    subjectCode: 'PANCASILA',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${pncIntra},
    kokurikulerAnnualJP: ${pncKoku},
    totalAnnualJP: ${pncIntra + pncKoku},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 35,
    derivedWeeklyJP: 4,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Pendidikan Pancasila SD Kelas ${grade} TA 2025/2026 (4 JP/minggu)',
  },\n`;

    // Bahasa Indonesia
    const bindoWeekly = grade === 1 ? 6 : grade === 2 ? 7 : 6;
    const bindoKokuWeekly = (grade === 1 || grade === 2) ? 2 : 1;
    const bindoIntra = bindoWeekly * factor;
    const bindoKoku = bindoKokuWeekly * factor;
    content += `  {
    id: 'km25-sd-${grade}-bindo',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SD',
    grade: ${grade},
    phase: '${phase}',
    subjectCode: 'BINDO',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${bindoIntra},
    kokurikulerAnnualJP: ${bindoKoku},
    totalAnnualJP: ${bindoIntra + bindoKoku},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 35,
    derivedWeeklyJP: ${bindoWeekly},
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Bahasa Indonesia SD Kelas ${grade} TA 2025/2026 (${bindoWeekly} JP/minggu intrakurikuler + ${bindoKoku} JP Kokurikuler)',
  },\n`;

    // Matematika
    const matWeekly = grade === 1 ? 4 : 5;
    const matIntra = matWeekly * factor;
    const matKoku = 1 * factor;
    content += `  {
    id: 'km25-sd-${grade}-mat',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SD',
    grade: ${grade},
    phase: '${phase}',
    subjectCode: 'MAT',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${matIntra},
    kokurikulerAnnualJP: ${matKoku},
    totalAnnualJP: ${matIntra + matKoku},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 35,
    derivedWeeklyJP: ${matWeekly},
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Matematika SD Kelas ${grade} TA 2025/2026 (${matWeekly} JP/minggu)',
  },\n`;

    // IPAS (Kelas 3-6)
    if (grade >= 3) {
      const ipasIntra = 5 * factor;
      const ipasKoku = 1 * factor;
      content += `  {
    id: 'km25-sd-${grade}-ipas',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SD',
    grade: ${grade},
    phase: '${phase}',
    subjectCode: 'IPAS',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${ipasIntra},
    kokurikulerAnnualJP: ${ipasKoku},
    totalAnnualJP: ${ipasIntra + ipasKoku},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 35,
    derivedWeeklyJP: 5,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'IPAS SD Kelas ${grade} TA 2025/2026 (5 JP/minggu)',
  },\n`;
    }

    // PJOK
    const pjokIntra = 3 * factor;
    const pjokKoku = 1 * factor;
    content += `  {
    id: 'km25-sd-${grade}-pjok',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SD',
    grade: ${grade},
    phase: '${phase}',
    subjectCode: 'PJOK',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${pjokIntra},
    kokurikulerAnnualJP: ${pjokKoku},
    totalAnnualJP: ${pjokIntra + pjokKoku},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 35,
    derivedWeeklyJP: 3,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'PJOK SD Kelas ${grade} TA 2025/2026 (3 JP/minggu)',
  },\n`;

    // Seni
    for (const art of ART_SD_CODES) {
      const artIntra = 3 * factor;
      const artKoku = 1 * factor;
      content += `  {
    id: 'km25-sd-${grade}-${art.toLowerCase()}',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SD',
    grade: ${grade},
    phase: '${phase}',
    subjectCode: '${art}',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${artIntra},
    kokurikulerAnnualJP: ${artKoku},
    totalAnnualJP: ${artIntra + artKoku},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 35,
    derivedWeeklyJP: 3,
    selectionGroup: 'SENI_BUDAYA',
    minSelections: 1,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Seni dan Budaya SD Kelas ${grade} TA 2025/2026 (3 JP/minggu)',
  },\n`;
    }

    // Bahasa Inggris
    const bingIntra = 2 * factor;
    content += `  {
    id: 'km25-sd-${grade}-bing',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SD',
    grade: ${grade},
    phase: '${phase}',
    subjectCode: 'BING',
    subjectType: 'ELECTIVE',
    intrakurikulerAnnualJP: ${bingIntra},
    kokurikulerAnnualJP: 0,
    totalAnnualJP: ${bingIntra},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 35,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Bahasa Inggris SD Kelas ${grade} TA 2025/2026 sebagai mapel pilihan (2 JP/minggu)',
  },\n`;

    // Mulok
    const mulokIntra = 2 * factor;
    content += `  {
    id: 'km25-sd-${grade}-local-content',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SD',
    grade: ${grade},
    phase: '${phase}',
    subjectCode: 'LOCAL_CONTENT',
    subjectType: 'LOCAL_CONTENT',
    intrakurikulerAnnualJP: ${mulokIntra},
    kokurikulerAnnualJP: 0,
    totalAnnualJP: ${mulokIntra},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 35,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Muatan Lokal SD Kelas ${grade} TA 2025/2026 (2 JP/minggu)',
  },\n`;

    // Coding & AI spesifik per kelas
    if (grade === 4) {
      // 2025/2026 unverified
      content += `  {
    id: 'km25-sd-4-coding-ai',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SD',
    grade: 4,
    phase: 'B',
    subjectCode: 'CODING_AI',
    subjectType: 'ELECTIVE',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 0,
    totalAnnualJP: 72,
    referenceWeeksPerYear: 36,
    minutesPerJP: 35,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    effectiveUntil: '2026-06-30',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'UNVERIFIED',
    notes: 'Koding dan Kecerdasan Artifisial belum aktif untuk SD Kelas 4 pada implementasi awal TA 2025/2026 (status UNVERIFIED)',
  },
  {
    id: 'km26-sd-4-coding-ai',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SD',
    grade: 4,
    phase: 'B',
    subjectCode: 'CODING_AI',
    subjectType: 'ELECTIVE',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 0,
    totalAnnualJP: 72,
    referenceWeeksPerYear: 36,
    minutesPerJP: 35,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2026-07-01',
    implementationFromAcademicYear: '2026/2027',
    verificationStatus: 'VERIFIED',
    notes: 'Koding dan Kecerdasan Artifisial SD Kelas 4 mulai diterapkan aktif pada TA 2026/2027 (2 JP/minggu)',
  },\n`;
    } else if (grade === 5) {
      content += `  {
    id: 'km25-sd-5-coding-ai',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SD',
    grade: 5,
    phase: 'C',
    subjectCode: 'CODING_AI',
    subjectType: 'ELECTIVE',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 0,
    totalAnnualJP: 72,
    referenceWeeksPerYear: 36,
    minutesPerJP: 35,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Koding dan Kecerdasan Artifisial sebagai mapel pilihan SD Kelas 5 TA 2025/2026 (2 JP/minggu)',
  },\n`;
    } else if (grade === 6) {
      content += `  {
    id: 'km25-sd-6-coding-ai',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SD',
    grade: 6,
    phase: 'C',
    subjectCode: 'CODING_AI',
    subjectType: 'ELECTIVE',
    intrakurikulerAnnualJP: 64,
    kokurikulerAnnualJP: 0,
    totalAnnualJP: 64,
    referenceWeeksPerYear: 32,
    minutesPerJP: 35,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'UNVERIFIED',
    notes: 'Koding dan Kecerdasan Artifisial belum diverifikasi secara spesifik per kelas untuk SD Kelas 6 pada TA 2025/2026 (status UNVERIFIED)',
  },\n`;
    }
  }

  // K13 SD
  content += `\n  // =========================================================================
  // KURIKULUM 2013 (K13) SD - KELAS 4 S/D 6 (PERMENDIKBUD 37/2018)
  // =========================================================================
  ...[4, 5, 6].flatMap((grade) => {
    const weeks = grade === 6 ? 32 : 36;
    return [
      {
        id: \`k13-sd-\${grade}-pai\`,
        curriculumType: 'K13' as const,
        level: 'SD' as const,
        grade,
        subjectCode: 'PAI',
        subjectType: 'REQUIRED' as const,
        intrakurikulerAnnualJP: 4 * weeks,
        kokurikulerAnnualJP: 0,
        totalAnnualJP: 4 * weeks,
        referenceWeeksPerYear: weeks,
        minutesPerJP: 35,
        derivedWeeklyJP: 4,
        regulationIds: ['REG-PERMENDIKBUD-37-2018'],
        effectiveFrom: '2018-12-21',
        verificationStatus: 'VERIFIED' as const,
        notes: \`K13 SD Kelas \${grade} PAI (4 JP/minggu)\`,
      },
      {
        id: \`k13-sd-\${grade}-pkn\`,
        curriculumType: 'K13' as const,
        level: 'SD' as const,
        grade,
        subjectCode: 'PANCASILA',
        subjectType: 'REQUIRED' as const,
        intrakurikulerAnnualJP: 4 * weeks,
        kokurikulerAnnualJP: 0,
        totalAnnualJP: 4 * weeks,
        referenceWeeksPerYear: weeks,
        minutesPerJP: 35,
        derivedWeeklyJP: 4,
        regulationIds: ['REG-PERMENDIKBUD-37-2018'],
        effectiveFrom: '2018-12-21',
        verificationStatus: 'VERIFIED' as const,
        notes: \`K13 SD Kelas \${grade} PPKn (4 JP/minggu)\`,
      },
      {
        id: \`k13-sd-\${grade}-bindo\`,
        curriculumType: 'K13' as const,
        level: 'SD' as const,
        grade,
        subjectCode: 'BINDO',
        subjectType: 'REQUIRED' as const,
        intrakurikulerAnnualJP: 7 * weeks,
        kokurikulerAnnualJP: 0,
        totalAnnualJP: 7 * weeks,
        referenceWeeksPerYear: weeks,
        minutesPerJP: 35,
        derivedWeeklyJP: 7,
        regulationIds: ['REG-PERMENDIKBUD-37-2018'],
        effectiveFrom: '2018-12-21',
        verificationStatus: 'VERIFIED' as const,
        notes: \`K13 SD Kelas \${grade} Bahasa Indonesia (7 JP/minggu)\`,
      },
      {
        id: \`k13-sd-\${grade}-mtk\`,
        curriculumType: 'K13' as const,
        level: 'SD' as const,
        grade,
        subjectCode: 'MAT',
        subjectType: 'REQUIRED' as const,
        intrakurikulerAnnualJP: 6 * weeks,
        kokurikulerAnnualJP: 0,
        totalAnnualJP: 6 * weeks,
        referenceWeeksPerYear: weeks,
        minutesPerJP: 35,
        derivedWeeklyJP: 6,
        regulationIds: ['REG-PERMENDIKBUD-37-2018'],
        effectiveFrom: '2018-12-21',
        verificationStatus: 'VERIFIED' as const,
        notes: \`K13 SD Kelas \${grade} Matematika Berdiri Sendiri (6 JP/minggu)\`,
      },
      {
        id: \`k13-sd-\${grade}-ipa\`,
        curriculumType: 'K13' as const,
        level: 'SD' as const,
        grade,
        subjectCode: 'IPA',
        subjectType: 'REQUIRED' as const,
        intrakurikulerAnnualJP: 3 * weeks,
        kokurikulerAnnualJP: 0,
        totalAnnualJP: 3 * weeks,
        referenceWeeksPerYear: weeks,
        minutesPerJP: 35,
        derivedWeeklyJP: 3,
        regulationIds: ['REG-PERMENDIKBUD-37-2018'],
        effectiveFrom: '2018-12-21',
        verificationStatus: 'VERIFIED' as const,
        notes: \`K13 SD Kelas \${grade} IPA Tematik (3 JP/minggu)\`,
      },
      {
        id: \`k13-sd-\${grade}-ips\`,
        curriculumType: 'K13' as const,
        level: 'SD' as const,
        grade,
        subjectCode: 'IPS',
        subjectType: 'REQUIRED' as const,
        intrakurikulerAnnualJP: 3 * weeks,
        kokurikulerAnnualJP: 0,
        totalAnnualJP: 3 * weeks,
        referenceWeeksPerYear: weeks,
        minutesPerJP: 35,
        derivedWeeklyJP: 3,
        regulationIds: ['REG-PERMENDIKBUD-37-2018'],
        effectiveFrom: '2018-12-21',
        verificationStatus: 'VERIFIED' as const,
        notes: \`K13 SD Kelas \${grade} IPS Tematik (3 JP/minggu)\`,
      },
      {
        id: \`k13-sd-\${grade}-pjok\`,
        curriculumType: 'K13' as const,
        level: 'SD' as const,
        grade,
        subjectCode: 'PJOK',
        subjectType: 'REQUIRED' as const,
        intrakurikulerAnnualJP: 4 * weeks,
        kokurikulerAnnualJP: 0,
        totalAnnualJP: 4 * weeks,
        referenceWeeksPerYear: weeks,
        minutesPerJP: 35,
        derivedWeeklyJP: 4,
        regulationIds: ['REG-PERMENDIKBUD-37-2018'],
        effectiveFrom: '2018-12-21',
        verificationStatus: 'VERIFIED' as const,
        notes: \`K13 SD Kelas \${grade} PJOK (4 JP/minggu)\`,
      },
    ];
  }),
];
`;
  return content;
}

// =========================================================================
// 2. GENERATE SMP
// =========================================================================
function generateSMP(): string {
  let content = `import { CurriculumStructureRule } from '../types';

/**
 * STRUKTUR KURIKULUM RESMI JENJANG SEKOLAH MENENGAH PERTAMA (SMP / MTs)
 * KELAS 7, 8, DAN 9 (FASE D)
 *
 * Regulasi Rujukan:
 * - Permendikbudristek No. 12 Tahun 2024 (Lampiran II: Struktur Kurikulum SMP)
 * - Permendikdasmen No. 13 Tahun 2025 (Mapel Pilihan Coding & AI)
 * - Permendikbud No. 35 Tahun 2018 (Struktur Kurikulum 2013 SMP)
 *
 * Parameter Normatif:
 * - 1 JP = 40 menit
 * - Asumsi minggu efektif:
 *   Kelas 7 - 8: 36 minggu per tahun
 *   Kelas 9: 32 minggu per tahun
 */

const RELIGION_CODES = ['PAI', 'PAK', 'PKAT', 'PHINDU', 'PBUDDHA', 'PKHONGHUCU'] as const;
const ART_PRAKARYA_CODES = ['SENI_RUPA', 'SENI_MUSIK', 'SENI_TARI', 'SENI_TEATER', 'PRAKARYA'] as const;

export const SMP_STRUCTURE_RULES: CurriculumStructureRule[] = [
  // =========================================================================
  // HISTORIS TA 2024/2025 (PERMENDIKBUDRISTEK NO. 12 TAHUN 2024)
  // Berlaku s/d 30 Juni 2025
  // =========================================================================
`;

  for (let grade = 7; grade <= 9; grade++) {
    const weeks = grade === 9 ? 32 : 36;
    const factor = grade === 9 ? 32 : 36;

    content += `\n  // --- KELAS ${grade} (FASE D - ${weeks} MINGGU) [2024] ---\n`;

    // Agama
    for (const rel of RELIGION_CODES) {
      const intra = 2 * factor;
      const koku = 1 * factor;
      content += `  {
    id: 'km-smp-${grade}-${rel.toLowerCase()}',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMP',
    grade: ${grade},
    phase: 'D',
    subjectCode: '${rel}',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${intra},
    kokurikulerAnnualJP: ${koku},
    totalAnnualJP: ${intra + koku},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 40,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Pendidikan Agama dan Budi Pekerti SMP Kelas ${grade} (2 JP/minggu + ${koku} JP/tahun Kokurikuler)',
  },\n`;
    }

    // Pancasila
    content += `  {
    id: 'km-smp-${grade}-pancasila',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMP',
    grade: ${grade},
    phase: 'D',
    subjectCode: 'PANCASILA',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${2 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${3 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 40,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Pendidikan Pancasila SMP Kelas ${grade} (2 JP/minggu)',
  },
  {
    id: 'km-smp-${grade}-bindo',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMP',
    grade: ${grade},
    phase: 'D',
    subjectCode: 'BINDO',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${5 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${6 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 40,
    derivedWeeklyJP: 5,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Bahasa Indonesia SMP Kelas ${grade} (5 JP/minggu)',
  },
  {
    id: 'km-smp-${grade}-mat',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMP',
    grade: ${grade},
    phase: 'D',
    subjectCode: 'MAT',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${4 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${5 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 40,
    derivedWeeklyJP: 4,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Matematika SMP Kelas ${grade} (4 JP/minggu)',
  },
  {
    id: 'km-smp-${grade}-ipa',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMP',
    grade: ${grade},
    phase: 'D',
    subjectCode: 'IPA',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${4 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${5 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 40,
    derivedWeeklyJP: 4,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'IPA SMP Kelas ${grade} (4 JP/minggu)',
  },
  {
    id: 'km-smp-${grade}-ips',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMP',
    grade: ${grade},
    phase: 'D',
    subjectCode: 'IPS',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${3 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${4 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 40,
    derivedWeeklyJP: 3,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'IPS SMP Kelas ${grade} (3 JP/minggu)',
  },
  {
    id: 'km-smp-${grade}-bing',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMP',
    grade: ${grade},
    phase: 'D',
    subjectCode: 'BING',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${3 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${4 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 40,
    derivedWeeklyJP: 3,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Bahasa Inggris SMP Kelas ${grade} (3 JP/minggu)',
  },
  {
    id: 'km-smp-${grade}-pjok',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMP',
    grade: ${grade},
    phase: 'D',
    subjectCode: 'PJOK',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${2 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${3 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 40,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'PJOK SMP Kelas ${grade} (2 JP/minggu)',
  },
  {
    id: 'km-smp-${grade}-informatika',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMP',
    grade: ${grade},
    phase: 'D',
    subjectCode: 'INFORMATIKA',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${2 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${3 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 40,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Informatika SMP Kelas ${grade} (2 JP/minggu)',
  },\n`;

    // Seni & Prakarya
    for (const art of ART_PRAKARYA_SMP_CODES) {
      content += `  {
    id: 'km-smp-${grade}-${art.toLowerCase()}',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMP',
    grade: ${grade},
    phase: 'D',
    subjectCode: '${art}',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${2 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${3 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 40,
    derivedWeeklyJP: 2,
    selectionGroup: 'SENI_PRAKARYA',
    minSelections: 1,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Seni dan Prakarya SMP Kelas ${grade} (2 JP/minggu)',
  },\n`;
    }

    // Mulok
    content += `  {
    id: 'km-smp-${grade}-local-content',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMP',
    grade: ${grade},
    phase: 'D',
    subjectCode: 'LOCAL_CONTENT',
    subjectType: 'LOCAL_CONTENT',
    intrakurikulerAnnualJP: ${2 * factor},
    kokurikulerAnnualJP: 0,
    totalAnnualJP: ${2 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 40,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Muatan Lokal SMP Kelas ${grade} (2 JP/minggu)',
  },\n`;
  }

  // =========================================================================
  // 2025/2026 SMP Grade 7-9
  // =========================================================================
  content += `\n  // =========================================================================
  // CURRENT DATASET TA 2025/2026 (PERMENDIKDASMEN NO. 13 TAHUN 2025)
  // Berlaku mulai 1 Juli 2025 (TA 2025/2026)
  // =========================================================================\n`;

  for (let grade = 7; grade <= 9; grade++) {
    const weeks = grade === 9 ? 32 : 36;
    const factor = grade === 9 ? 32 : 36;

    content += `\n  // --- KELAS ${grade} (FASE D - ${weeks} MINGGU) [2025/2026] ---\n`;

    // Agama
    for (const rel of RELIGION_CODES) {
      const intra = 2 * factor;
      const koku = 1 * factor;
      content += `  {
    id: 'km25-smp-${grade}-${rel.toLowerCase()}',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMP',
    grade: ${grade},
    phase: 'D',
    subjectCode: '${rel}',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${intra},
    kokurikulerAnnualJP: ${koku},
    totalAnnualJP: ${intra + koku},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 40,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Pendidikan Agama dan Budi Pekerti SMP Kelas ${grade} TA 2025/2026 (2 JP/minggu + ${koku} JP/tahun Kokurikuler)',
  },\n`;
    }

    // Pancasila
    content += `  {
    id: 'km25-smp-${grade}-pancasila',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMP',
    grade: ${grade},
    phase: 'D',
    subjectCode: 'PANCASILA',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${2 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${3 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 40,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Pendidikan Pancasila SMP Kelas ${grade} TA 2025/2026 (2 JP/minggu)',
  },
  {
    id: 'km25-smp-${grade}-bindo',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMP',
    grade: ${grade},
    phase: 'D',
    subjectCode: 'BINDO',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${5 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${6 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 40,
    derivedWeeklyJP: 5,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Bahasa Indonesia SMP Kelas ${grade} TA 2025/2026 (5 JP/minggu)',
  },
  {
    id: 'km25-smp-${grade}-mat',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMP',
    grade: ${grade},
    phase: 'D',
    subjectCode: 'MAT',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${4 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${5 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 40,
    derivedWeeklyJP: 4,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Matematika SMP Kelas ${grade} TA 2025/2026 (4 JP/minggu)',
  },
  {
    id: 'km25-smp-${grade}-ipa',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMP',
    grade: ${grade},
    phase: 'D',
    subjectCode: 'IPA',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${4 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${5 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 40,
    derivedWeeklyJP: 4,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'IPA SMP Kelas ${grade} TA 2025/2026 (4 JP/minggu)',
  },
  {
    id: 'km25-smp-${grade}-ips',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMP',
    grade: ${grade},
    phase: 'D',
    subjectCode: 'IPS',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${3 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${4 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 40,
    derivedWeeklyJP: 3,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'IPS SMP Kelas ${grade} TA 2025/2026 (3 JP/minggu)',
  },
  {
    id: 'km25-smp-${grade}-bing',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMP',
    grade: ${grade},
    phase: 'D',
    subjectCode: 'BING',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${3 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${4 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 40,
    derivedWeeklyJP: 3,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Bahasa Inggris SMP Kelas ${grade} TA 2025/2026 (3 JP/minggu)',
  },
  {
    id: 'km25-smp-${grade}-pjok',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMP',
    grade: ${grade},
    phase: 'D',
    subjectCode: 'PJOK',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${2 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${3 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 40,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'PJOK SMP Kelas ${grade} TA 2025/2026 (2 JP/minggu)',
  },
  {
    id: 'km25-smp-${grade}-informatika',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMP',
    grade: ${grade},
    phase: 'D',
    subjectCode: 'INFORMATIKA',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${2 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${3 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 40,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Informatika SMP Kelas ${grade} TA 2025/2026 (2 JP/minggu)',
  },\n`;

    // Seni & Prakarya
    for (const art of ART_PRAKARYA_SMP_CODES) {
      content += `  {
    id: 'km25-smp-${grade}-${art.toLowerCase()}',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMP',
    grade: ${grade},
    phase: 'D',
    subjectCode: '${art}',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${2 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${3 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 40,
    derivedWeeklyJP: 2,
    selectionGroup: 'SENI_PRAKARYA',
    minSelections: 1,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Seni dan Prakarya SMP Kelas ${grade} TA 2025/2026 (2 JP/minggu)',
  },\n`;
    }

    // Mulok
    content += `  {
    id: 'km25-smp-${grade}-local-content',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMP',
    grade: ${grade},
    phase: 'D',
    subjectCode: 'LOCAL_CONTENT',
    subjectType: 'LOCAL_CONTENT',
    intrakurikulerAnnualJP: ${2 * factor},
    kokurikulerAnnualJP: 0,
    totalAnnualJP: ${2 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 40,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Muatan Lokal SMP Kelas ${grade} TA 2025/2026 (2 JP/minggu)',
  },\n`;

    // Coding & AI
    if (grade === 7) {
      content += `  {
    id: 'km25-smp-7-coding-ai',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMP',
    grade: 7,
    phase: 'D',
    subjectCode: 'CODING_AI',
    subjectType: 'ELECTIVE',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 0,
    totalAnnualJP: 72,
    referenceWeeksPerYear: 36,
    minutesPerJP: 40,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Koding dan Kecerdasan Artifisial sebagai mapel pilihan SMP Kelas 7 TA 2025/2026 (2 JP/minggu)',
  },\n`;
    } else {
      content += `  {
    id: 'km25-smp-${grade}-coding-ai',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMP',
    grade: ${grade},
    phase: 'D',
    subjectCode: 'CODING_AI',
    subjectType: 'ELECTIVE',
    intrakurikulerAnnualJP: ${2 * factor},
    kokurikulerAnnualJP: 0,
    totalAnnualJP: ${2 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 40,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'UNVERIFIED',
    notes: 'Koding dan Kecerdasan Artifisial belum diverifikasi secara spesifik per kelas untuk SMP Kelas ${grade} (status UNVERIFIED)',
  },\n`;
    }
  }

  content += `];\n`;
  return content;
}

// =========================================================================
// 3. GENERATE SMA
// =========================================================================
function generateSMA(): string {
  let content = `import { CurriculumStructureRule } from '../types';

/**
 * STRUKTUR KURIKULUM RESMI JENJANG SEKOLAH MENENGAH ATAS (SMA / MA)
 * KELAS 10 (FASE E), KELAS 11 DAN 12 (FASE F)
 *
 * Regulasi Rujukan:
 * - Permendikbudristek No. 12 Tahun 2024 (Lampiran II: Struktur Kurikulum SMA)
 * - Permendikdasmen No. 13 Tahun 2025 (Pembaruan Mapel Pilihan Coding & AI)
 * - Permendikbud No. 36 Tahun 2018 (Struktur Kurikulum 2013 SMA)
 *
 * Parameter Normatif:
 * - 1 JP = 45 menit
 * - Asumsi minggu efektif:
 *   Kelas 10 - 11: 36 minggu per tahun
 *   Kelas 12: 32 minggu per tahun
 */

const RELIGION_CODES = ['PAI', 'PAK', 'PKAT', 'PHINDU', 'PBUDDHA', 'PKHONGHUCU'] as const;
const ART_CODES = ['SENI_RUPA', 'SENI_MUSIK', 'SENI_TARI', 'SENI_TEATER'] as const;

export const SMA_STRUCTURE_RULES: CurriculumStructureRule[] = [
  // =========================================================================
  // HISTORIS TA 2024/2025 (PERMENDIKBUDRISTEK NO. 12 TAHUN 2024)
  // Berlaku s/d 30 Juni 2025
  // =========================================================================

  // --- KELAS 10 (FASE E - 36 MINGGU) [2024] ---
`;

  // Kelas 10 2024
  for (const rel of RELIGION_CODES) {
    content += `  {
    id: 'km-sma-10-${rel.toLowerCase()}',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: '${rel}',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 36,
    totalAnnualJP: 108,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Pendidikan Agama dan Budi Pekerti SMA Kelas 10 (2 JP/minggu + 36 JP/tahun Kokurikuler)',
  },\n`;
  }

  content += `  {
    id: 'km-sma-10-pancasila',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'PANCASILA',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 54,
    kokurikulerAnnualJP: 18,
    totalAnnualJP: 72,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 1.5,
    allocationMode: 'ANNUAL',
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Pendidikan Pancasila SMA Kelas 10 (Alokasi 54 JP/tahun, setara 1.5 JP/minggu)',
  },
  {
    id: 'km-sma-10-bindo',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'BINDO',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 108,
    kokurikulerAnnualJP: 36,
    totalAnnualJP: 144,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 3,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Bahasa Indonesia SMA Kelas 10 (3 JP/minggu)',
  },
  {
    id: 'km-sma-10-mat',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'MAT',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 108,
    kokurikulerAnnualJP: 36,
    totalAnnualJP: 144,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 3,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Matematika SMA Kelas 10 (3 JP/minggu)',
  },
  {
    id: 'km-sma-10-fisika',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'FISIKA',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 36,
    totalAnnualJP: 108,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Fisika SMA Kelas 10 (2 JP/minggu)',
  },
  {
    id: 'km-sma-10-kimia',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'KIMIA',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 36,
    totalAnnualJP: 108,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Kimia SMA Kelas 10 (2 JP/minggu)',
  },
  {
    id: 'km-sma-10-biologi',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'BIOLOGI',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 36,
    totalAnnualJP: 108,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Biologi SMA Kelas 10 (2 JP/minggu)',
  },
  {
    id: 'km-sma-10-sosiologi',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'SOSIOLOGI',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 36,
    totalAnnualJP: 108,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Sosiologi SMA Kelas 10 (2 JP/minggu)',
  },
  {
    id: 'km-sma-10-ekonomi',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'EKONOMI',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 36,
    totalAnnualJP: 108,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Ekonomi SMA Kelas 10 (2 JP/minggu)',
  },
  {
    id: 'km-sma-10-sejarah',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'SEJARAH',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 54,
    kokurikulerAnnualJP: 18,
    totalAnnualJP: 72,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 1.5,
    allocationMode: 'ANNUAL',
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Sejarah SMA Kelas 10 (Alokasi 54 JP/tahun, setara 1.5 JP/minggu)',
  },
  {
    id: 'km-sma-10-geografi',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'GEOGRAFI',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 36,
    totalAnnualJP: 108,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Geografi SMA Kelas 10 (2 JP/minggu)',
  },
  {
    id: 'km-sma-10-bing',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'BING',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 36,
    totalAnnualJP: 108,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Bahasa Inggris SMA Kelas 10 (2 JP/minggu)',
  },
  {
    id: 'km-sma-10-pjok',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'PJOK',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 36,
    totalAnnualJP: 108,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'PJOK SMA Kelas 10 (2 JP/minggu)',
  },
  {
    id: 'km-sma-10-informatika',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'INFORMATIKA',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 36,
    totalAnnualJP: 108,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Informatika SMA Kelas 10 (2 JP/minggu)',
  },\n`;

  for (const art of ART_SMA_CODES) {
    content += `  {
    id: 'km-sma-10-${art.toLowerCase()}',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: '${art}',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 54,
    kokurikulerAnnualJP: 18,
    totalAnnualJP: 72,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 1.5,
    allocationMode: 'ANNUAL',
    selectionGroup: 'SENI_PRAKARYA',
    minSelections: 1,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Seni SMA Kelas 10 (Alokasi 54 JP/tahun, setara 1.5 JP/minggu)',
  },\n`;
  }

  content += `  {
    id: 'km-sma-10-local-content',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'LOCAL_CONTENT',
    subjectType: 'LOCAL_CONTENT',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 0,
    totalAnnualJP: 72,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Muatan Lokal SMA Kelas 10 (2 JP/minggu)',
  },\n`;

  // Kelas 11 & 12 2024
  const SMA_ELECTIVES = [
    { code: 'BIOLOGI', name: 'Biologi' },
    { code: 'FISIKA', name: 'Fisika' },
    { code: 'KIMIA', name: 'Kimia' },
    { code: 'INFORMATIKA', name: 'Informatika' },
    { code: 'SOSIOLOGI', name: 'Sosiologi' },
    { code: 'EKONOMI', name: 'Ekonomi' },
    { code: 'GEOGRAFI', name: 'Geografi' },
    { code: 'ANTROPOLOGI', name: 'Antropologi' },
    { code: 'MAT_LANJUT', name: 'Matematika Tingkat Lanjut' },
    { code: 'BINDO_LANJUT', name: 'Bahasa Indonesia Tingkat Lanjut' },
    { code: 'BING_LANJUT', name: 'Bahasa Inggris Tingkat Lanjut' },
    { code: 'PRAKARYA', name: 'Prakarya dan Kewirausahaan' },
  ];

  for (const grade of [11, 12]) {
    const weeks = grade === 12 ? 32 : 36;
    const factor = grade === 12 ? 32 : 36;

    content += `\n  // --- KELAS ${grade} (FASE F - ${weeks} MINGGU) [2024] ---\n`;

    for (const rel of RELIGION_CODES) {
      content += `  {
    id: 'km-sma-${grade}-${rel.toLowerCase()}',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: ${grade},
    phase: 'F',
    subjectCode: '${rel}',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${2 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${3 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Pendidikan Agama SMA Kelas ${grade} (2 JP/minggu + ${1 * factor} JP Kokurikuler)',
  },\n`;
    }

    const pncIntra = grade === 12 ? 48 : 54;
    const pncKoku = grade === 12 ? 16 : 18;
    content += `  {
    id: 'km-sma-${grade}-pancasila',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: ${grade},
    phase: 'F',
    subjectCode: 'PANCASILA',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${pncIntra},
    kokurikulerAnnualJP: ${pncKoku},
    totalAnnualJP: ${pncIntra + pncKoku},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 45,
    derivedWeeklyJP: 1.5,
    allocationMode: 'ANNUAL',
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Pendidikan Pancasila SMA Kelas ${grade} (${pncIntra} JP/tahun, setara 1.5 JP/minggu)',
  },
  {
    id: 'km-sma-${grade}-bindo',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: ${grade},
    phase: 'F',
    subjectCode: 'BINDO',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${3 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${4 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 45,
    derivedWeeklyJP: 3,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Bahasa Indonesia SMA Kelas ${grade} (3 JP/minggu)',
  },
  {
    id: 'km-sma-${grade}-mat',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: ${grade},
    phase: 'F',
    subjectCode: 'MAT',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${3 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${4 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 45,
    derivedWeeklyJP: 3,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Matematika SMA Kelas ${grade} (3 JP/minggu)',
  },
  {
    id: 'km-sma-${grade}-bing',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: ${grade},
    phase: 'F',
    subjectCode: 'BING',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${3 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${4 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 45,
    derivedWeeklyJP: 3,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Bahasa Inggris SMA Kelas ${grade} (3 JP/minggu)',
  },
  {
    id: 'km-sma-${grade}-pjok',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: ${grade},
    phase: 'F',
    subjectCode: 'PJOK',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${2 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${3 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'PJOK SMA Kelas ${grade} (2 JP/minggu)',
  },
  {
    id: 'km-sma-${grade}-sejarah',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: ${grade},
    phase: 'F',
    subjectCode: 'SEJARAH',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${2 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${3 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Sejarah SMA Kelas ${grade} (2 JP/minggu)',
  },\n`;

    for (const art of ART_SMA_CODES) {
      const artIntra = grade === 12 ? 48 : 54;
      const artKoku = grade === 12 ? 16 : 18;
      content += `  {
    id: 'km-sma-${grade}-${art.toLowerCase()}',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: ${grade},
    phase: 'F',
    subjectCode: '${art}',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${artIntra},
    kokurikulerAnnualJP: ${artKoku},
    totalAnnualJP: ${artIntra + artKoku},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 45,
    derivedWeeklyJP: 1.5,
    allocationMode: 'ANNUAL',
    selectionGroup: 'SENI_PRAKARYA',
    minSelections: 1,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Seni SMA Kelas ${grade} (${artIntra} JP/tahun, setara 1.5 JP/minggu)',
  },\n`;
    }

    content += `  {
    id: 'km-sma-${grade}-local-content',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: ${grade},
    phase: 'F',
    subjectCode: 'LOCAL_CONTENT',
    subjectType: 'LOCAL_CONTENT',
    intrakurikulerAnnualJP: ${2 * factor},
    kokurikulerAnnualJP: 0,
    totalAnnualJP: ${2 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Muatan Lokal SMA Kelas ${grade} (2 JP/minggu)',
  },\n`;

    // Mapel Pilihan Fase F
    for (const el of SMA_ELECTIVES) {
      content += `  {
    id: 'km-sma-${grade}-${el.code.toLowerCase()}',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: ${grade},
    phase: 'F',
    subjectCode: '${el.code}',
    subjectType: 'ELECTIVE',
    intrakurikulerAnnualJP: ${5 * factor},
    kokurikulerAnnualJP: 0,
    totalAnnualJP: ${5 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 45,
    derivedWeeklyJP: 5,
    selectionGroup: 'SMA_F_ELECTIVE',
    minSelections: 4,
    maxSelections: 5,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024'],
    effectiveFrom: '2024-03-26',
    effectiveUntil: '2025-06-30',
    verificationStatus: 'VERIFIED',
    notes: 'Mapel Pilihan ${el.name} SMA Kelas ${grade} (5 JP/minggu, 4-5 pilihan)',
  },\n`;
    }
  }

  // =========================================================================
  // 2025/2026 SMA Grade 10-12
  // =========================================================================
  content += `\n  // =========================================================================
  // CURRENT DATASET TA 2025/2026 (PERMENDIKDASMEN NO. 13 TAHUN 2025)
  // Berlaku mulai 1 Juli 2025 (TA 2025/2026)
  // =========================================================================

  // --- KELAS 10 (FASE E - 36 MINGGU) [2025/2026] ---\n`;

  for (const rel of RELIGION_CODES) {
    content += `  {
    id: 'km25-sma-10-${rel.toLowerCase()}',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: '${rel}',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 36,
    totalAnnualJP: 108,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Pendidikan Agama dan Budi Pekerti SMA Kelas 10 TA 2025/2026 (2 JP/minggu + 36 JP Kokurikuler)',
  },\n`;
  }

  content += `  {
    id: 'km25-sma-10-pancasila',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'PANCASILA',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 54,
    kokurikulerAnnualJP: 18,
    totalAnnualJP: 72,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 1.5,
    allocationMode: 'ANNUAL',
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Pendidikan Pancasila SMA Kelas 10 TA 2025/2026 (Alokasi 54 JP/tahun, setara 1.5 JP/minggu)',
  },
  {
    id: 'km25-sma-10-bindo',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'BINDO',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 108,
    kokurikulerAnnualJP: 36,
    totalAnnualJP: 144,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 3,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Bahasa Indonesia SMA Kelas 10 TA 2025/2026 (3 JP/minggu)',
  },
  {
    id: 'km25-sma-10-mat',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'MAT',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 108,
    kokurikulerAnnualJP: 36,
    totalAnnualJP: 144,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 3,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Matematika SMA Kelas 10 TA 2025/2026 (3 JP/minggu)',
  },
  {
    id: 'km25-sma-10-fisika',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'FISIKA',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 36,
    totalAnnualJP: 108,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Fisika SMA Kelas 10 TA 2025/2026 (2 JP/minggu)',
  },
  {
    id: 'km25-sma-10-kimia',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'KIMIA',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 36,
    totalAnnualJP: 108,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Kimia SMA Kelas 10 TA 2025/2026 (2 JP/minggu)',
  },
  {
    id: 'km25-sma-10-biologi',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'BIOLOGI',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 36,
    totalAnnualJP: 108,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Biologi SMA Kelas 10 TA 2025/2026 (2 JP/minggu)',
  },
  {
    id: 'km25-sma-10-sosiologi',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'SOSIOLOGI',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 36,
    totalAnnualJP: 108,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Sosiologi SMA Kelas 10 TA 2025/2026 (2 JP/minggu)',
  },
  {
    id: 'km25-sma-10-ekonomi',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'EKONOMI',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 36,
    totalAnnualJP: 108,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Ekonomi SMA Kelas 10 TA 2025/2026 (2 JP/minggu)',
  },
  {
    id: 'km25-sma-10-sejarah',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'SEJARAH',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 54,
    kokurikulerAnnualJP: 18,
    totalAnnualJP: 72,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 1.5,
    allocationMode: 'ANNUAL',
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Sejarah SMA Kelas 10 TA 2025/2026 (Alokasi 54 JP/tahun, setara 1.5 JP/minggu)',
  },
  {
    id: 'km25-sma-10-geografi',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'GEOGRAFI',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 36,
    totalAnnualJP: 108,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Geografi SMA Kelas 10 TA 2025/2026 (2 JP/minggu)',
  },
  {
    id: 'km25-sma-10-bing',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'BING',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 36,
    totalAnnualJP: 108,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Bahasa Inggris SMA Kelas 10 TA 2025/2026 (2 JP/minggu)',
  },
  {
    id: 'km25-sma-10-pjok',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'PJOK',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 36,
    totalAnnualJP: 108,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'PJOK SMA Kelas 10 TA 2025/2026 (2 JP/minggu)',
  },
  {
    id: 'km25-sma-10-informatika',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'INFORMATIKA',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 36,
    totalAnnualJP: 108,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Informatika SMA Kelas 10 TA 2025/2026 (2 JP/minggu)',
  },\n`;

  for (const art of ART_SMA_CODES) {
    content += `  {
    id: 'km25-sma-10-${art.toLowerCase()}',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: '${art}',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: 54,
    kokurikulerAnnualJP: 18,
    totalAnnualJP: 72,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 1.5,
    allocationMode: 'ANNUAL',
    selectionGroup: 'SENI_PRAKARYA',
    minSelections: 1,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Seni SMA Kelas 10 TA 2025/2026 (Alokasi 54 JP/tahun, setara 1.5 JP/minggu)',
  },\n`;
  }

  content += `  {
    id: 'km25-sma-10-local-content',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'LOCAL_CONTENT',
    subjectType: 'LOCAL_CONTENT',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 0,
    totalAnnualJP: 72,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Muatan Lokal SMA Kelas 10 TA 2025/2026 (2 JP/minggu)',
  },
  {
    id: 'km25-sma-10-coding-ai',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: 10,
    phase: 'E',
    subjectCode: 'CODING_AI',
    subjectType: 'ELECTIVE',
    intrakurikulerAnnualJP: 72,
    kokurikulerAnnualJP: 0,
    totalAnnualJP: 72,
    referenceWeeksPerYear: 36,
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'UNVERIFIED',
    notes: 'Koding dan Kecerdasan Artifisial belum diverifikasi secara spesifik per kelas untuk SMA Kelas 10 (status UNVERIFIED)',
  },\n`;

  // Kelas 11 & 12 2025/2026
  for (const grade of [11, 12]) {
    const weeks = grade === 12 ? 32 : 36;
    const factor = grade === 12 ? 32 : 36;

    content += `\n  // --- KELAS ${grade} (FASE F - ${weeks} MINGGU) [2025/2026] ---\n`;

    for (const rel of RELIGION_CODES) {
      content += `  {
    id: 'km25-sma-${grade}-${rel.toLowerCase()}',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: ${grade},
    phase: 'F',
    subjectCode: '${rel}',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${2 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${3 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Pendidikan Agama SMA Kelas ${grade} TA 2025/2026 (2 JP/minggu + ${1 * factor} JP Kokurikuler)',
  },\n`;
    }

    const pncIntra = grade === 12 ? 48 : 54;
    const pncKoku = grade === 12 ? 16 : 18;
    content += `  {
    id: 'km25-sma-${grade}-pancasila',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: ${grade},
    phase: 'F',
    subjectCode: 'PANCASILA',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${pncIntra},
    kokurikulerAnnualJP: ${pncKoku},
    totalAnnualJP: ${pncIntra + pncKoku},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 45,
    derivedWeeklyJP: 1.5,
    allocationMode: 'ANNUAL',
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Pendidikan Pancasila SMA Kelas ${grade} TA 2025/2026 (${pncIntra} JP/tahun, setara 1.5 JP/minggu)',
  },
  {
    id: 'km25-sma-${grade}-bindo',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: ${grade},
    phase: 'F',
    subjectCode: 'BINDO',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${3 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${4 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 45,
    derivedWeeklyJP: 3,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Bahasa Indonesia SMA Kelas ${grade} TA 2025/2026 (3 JP/minggu)',
  },
  {
    id: 'km25-sma-${grade}-mat',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: ${grade},
    phase: 'F',
    subjectCode: 'MAT',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${3 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${4 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 45,
    derivedWeeklyJP: 3,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Matematika SMA Kelas ${grade} TA 2025/2026 (3 JP/minggu)',
  },
  {
    id: 'km25-sma-${grade}-bing',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: ${grade},
    phase: 'F',
    subjectCode: 'BING',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${3 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${4 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 45,
    derivedWeeklyJP: 3,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Bahasa Inggris SMA Kelas ${grade} TA 2025/2026 (3 JP/minggu)',
  },
  {
    id: 'km25-sma-${grade}-pjok',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: ${grade},
    phase: 'F',
    subjectCode: 'PJOK',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${2 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${3 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'PJOK SMA Kelas ${grade} TA 2025/2026 (2 JP/minggu)',
  },
  {
    id: 'km25-sma-${grade}-sejarah',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: ${grade},
    phase: 'F',
    subjectCode: 'SEJARAH',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${2 * factor},
    kokurikulerAnnualJP: ${1 * factor},
    totalAnnualJP: ${3 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Sejarah SMA Kelas ${grade} TA 2025/2026 (2 JP/minggu)',
  },\n`;

    for (const art of ART_SMA_CODES) {
      const artIntra = grade === 12 ? 48 : 54;
      const artKoku = grade === 12 ? 16 : 18;
      content += `  {
    id: 'km25-sma-${grade}-${art.toLowerCase()}',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: ${grade},
    phase: 'F',
    subjectCode: '${art}',
    subjectType: 'REQUIRED',
    intrakurikulerAnnualJP: ${artIntra},
    kokurikulerAnnualJP: ${artKoku},
    totalAnnualJP: ${artIntra + artKoku},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 45,
    derivedWeeklyJP: 1.5,
    allocationMode: 'ANNUAL',
    selectionGroup: 'SENI_PRAKARYA',
    minSelections: 1,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Seni SMA Kelas ${grade} TA 2025/2026 (${artIntra} JP/tahun, setara 1.5 JP/minggu)',
  },\n`;
    }

    content += `  {
    id: 'km25-sma-${grade}-local-content',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: ${grade},
    phase: 'F',
    subjectCode: 'LOCAL_CONTENT',
    subjectType: 'LOCAL_CONTENT',
    intrakurikulerAnnualJP: ${2 * factor},
    kokurikulerAnnualJP: 0,
    totalAnnualJP: ${2 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Muatan Lokal SMA Kelas ${grade} TA 2025/2026 (2 JP/minggu)',
  },\n`;

    // Mapel Pilihan Fase F
    for (const el of SMA_ELECTIVES) {
      content += `  {
    id: 'km25-sma-${grade}-${el.code.toLowerCase()}',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: ${grade},
    phase: 'F',
    subjectCode: '${el.code}',
    subjectType: 'ELECTIVE',
    intrakurikulerAnnualJP: ${5 * factor},
    kokurikulerAnnualJP: 0,
    totalAnnualJP: ${5 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 45,
    derivedWeeklyJP: 5,
    selectionGroup: 'SMA_F_ELECTIVE',
    minSelections: 4,
    maxSelections: 5,
    regulationIds: ['REG-PERMENDIKBUDRISTEK-12-2024', 'REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'VERIFIED',
    notes: 'Mapel Pilihan ${el.name} SMA Kelas ${grade} TA 2025/2026 (5 JP/minggu, 4-5 pilihan)',
  },\n`;
    }

    content += `  {
    id: 'km25-sma-${grade}-coding-ai',
    curriculumType: 'KURIKULUM_MERDEKA',
    level: 'SMA',
    grade: ${grade},
    phase: 'F',
    subjectCode: 'CODING_AI',
    subjectType: 'ELECTIVE',
    intrakurikulerAnnualJP: ${2 * factor},
    kokurikulerAnnualJP: 0,
    totalAnnualJP: ${2 * factor},
    referenceWeeksPerYear: ${weeks},
    minutesPerJP: 45,
    derivedWeeklyJP: 2,
    regulationIds: ['REG-PERMENDIKDASMEN-13-2025'],
    effectiveFrom: '2025-07-01',
    implementationFromAcademicYear: '2025/2026',
    verificationStatus: 'UNVERIFIED',
    notes: 'Koding dan Kecerdasan Artifisial belum diverifikasi secara spesifik per kelas untuk SMA Kelas ${grade} (status UNVERIFIED)',
  },\n`;
  }

  content += `];\n`;
  return content;
}

// Write files
fs.writeFileSync(path.join(process.cwd(), 'src/data/curriculum/structure/sd.ts'), generateSD());
fs.writeFileSync(path.join(process.cwd(), 'src/data/curriculum/structure/smp.ts'), generateSMP());
fs.writeFileSync(path.join(process.cwd(), 'src/data/curriculum/structure/sma.ts'), generateSMA());

console.log('Successfully generated SD, SMP, and SMA structure datasets!');
