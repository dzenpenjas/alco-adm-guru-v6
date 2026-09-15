import { CurriculumPhase, SchoolLevel } from '../types';
import { MasterCPEntry } from './types';
import { SD_CP_ENTRIES } from './sd';
import { SMP_CP_ENTRIES } from './smp';
import { SMA_CP_ENTRIES } from './sma';
import { findSubjectByNameOrAlias, findSubjectByCode } from '../subjects';

export * from './types';
export { SD_CP_ENTRIES } from './sd';
export { SMP_CP_ENTRIES } from './smp';
export { SMA_CP_ENTRIES } from './sma';

export const ALL_MASTER_CP_ENTRIES: MasterCPEntry[] = [
  ...SD_CP_ENTRIES,
  ...SMP_CP_ENTRIES,
  ...SMA_CP_ENTRIES,
];

/**
 * Cari Capaian Pembelajaran resmi berdasarkan mata pelajaran dan fase (serta tahun ajaran jika tersedia)
 */
export function findCPBySubjectAndPhase(
  subjectCodeOrName: string,
  phase: CurriculumPhase,
  academicYear?: string
): MasterCPEntry | undefined {
  const subject =
    findSubjectByCode(subjectCodeOrName) || findSubjectByNameOrAlias(subjectCodeOrName);
  const code = subject ? subject.code : subjectCodeOrName.toUpperCase();

  const candidates = ALL_MASTER_CP_ENTRIES.filter(
    (cp) => cp.subjectCode === code && cp.phase === phase
  );

  if (candidates.length === 0) return undefined;
  if (candidates.length === 1) return candidates[0];

  // Jika tahun ajaran spesifik disediakan, lakukan filter periode bila tersedia
  if (academicYear) {
    const yearMatch = academicYear.match(/\d{4}/);
    const startYear = yearMatch ? parseInt(yearMatch[0], 10) : null;
    if (startYear) {
      const yearDate = `${startYear}-07-01`;
      const periodMatched = candidates.filter((cp) => {
        const from = cp.effectiveFrom || '1970-01-01';
        const until = cp.effectiveUntil || '9999-12-31';
        return from <= yearDate && yearDate <= until;
      });
      if (periodMatched.length > 0) return periodMatched[0];
    }
  }

  // Prioritaskan non-superseded
  const nonSuperseded = candidates.filter((c) => c.verificationStatus !== 'SUPERSEDED');
  if (nonSuperseded.length > 0) return nonSuperseded[0];

  return candidates[0];
}

/**
 * Ambil seluruh CP resmi berdasarkan jenjang
 */
export function getCPsByLevel(level: SchoolLevel): MasterCPEntry[] {
  return ALL_MASTER_CP_ENTRIES.filter((cp) => cp.level === level);
}
