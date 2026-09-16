import {
  CPData,
  CPAnalysisData,
  TPData,
  WorkflowCompletionStatus,
  ActiveContext,
  AcademicSetting,
  normalizeCPVerificationStatus,
} from '../types';

export interface CPValidationDetails {
  status: WorkflowCompletionStatus;
  isSiap: boolean;
  issues: string[];
}

/**
 * Validasi mendalam untuk status workflow CPData
 */
export function validateCPDataWorkflow(
  cp: CPData,
  context?: Partial<ActiveContext> | Partial<AcademicSetting>
): CPValidationDetails {
  const issues: string[] = [];

  const hasDesc = !!(cp.generalDescription && cp.generalDescription.trim().length >= 10);
  const hasElements = !!(cp.elements && cp.elements.length > 0);

  if (!hasDesc && !hasElements) {
    return {
      status: 'BELUM_DIMULAI',
      isSiap: false,
      issues: ['Deskripsi CP umum dan rincian elemen CP masih kosong.'],
    };
  }

  // Check element validity
  if (cp.elements && cp.elements.length > 0) {
    for (let i = 0; i < cp.elements.length; i++) {
      const el = cp.elements[i];
      if (!el.name || !el.name.trim()) {
        issues.push(`Elemen ke-${i + 1} tidak memiliki nama elemen.`);
      }
      if (!el.content || !el.content.trim()) {
        issues.push(`Elemen "${el.name || i + 1}" tidak memiliki uraian konten.`);
      }
    }
  }

  // Check source availability & verification status
  if (!cp.source) {
    issues.push('Sumber rujukan CP belum diset.');
  } else {
    const status = normalizeCPVerificationStatus(cp.source.verificationStatus);
    if (status === 'SUPERSEDED') {
      issues.push('Sumber CP yang digunakan telah kedaluwarsa/digantikan (SUPERSEDED).');
    } else if (status === 'VERSION_CONFLICT') {
      issues.push('Terjadi konflik versi CP (AMBIGUOUS). Spesifikasikan tahun ajaran/regulasi.');
    }
  }

  // Check context match if context is provided
  if (context) {
    if (context.subject && cp.source?.title) {
      // Basic sanity check
    }
  }

  if (issues.length > 0) {
    const isDraft = hasDesc || hasElements;
    return {
      status: isDraft ? 'PERLU_DILENGKAPI' : 'BELUM_DIMULAI',
      isSiap: false,
      issues,
    };
  }

  return {
    status: 'SIAP',
    isSiap: true,
    issues: [],
  };
}

export interface CPAnalysisValidationDetails {
  status: WorkflowCompletionStatus;
  isSiap: boolean;
  issues: string[];
}

/**
 * Validasi mendalam untuk status workflow CPAnalysisData
 */
export function validateCPAnalysisDataWorkflow(
  cpAnalysis?: CPAnalysisData,
  cp?: CPData
): CPAnalysisValidationDetails {
  const issues: string[] = [];

  if (!cpAnalysis || !cpAnalysis.items || cpAnalysis.items.length === 0) {
    return {
      status: 'BELUM_DIMULAI',
      isSiap: false,
      issues: ['Analisis CP belum memiliki baris bedah kompetensi.'],
    };
  }

  // Check if CP version changed or review needed
  if (cpAnalysis.needsReview) {
    issues.push(
      cpAnalysis.reviewReason ||
        'Versi CP sumber telah diperbarui. Analisis CP perlu ditinjau ulang.'
    );
  }

  // Check items completeness
  for (let i = 0; i < cpAnalysis.items.length; i++) {
    const item = cpAnalysis.items[i];
    if (!item.elementName || !item.elementName.trim()) {
      issues.push(`Baris analisis ke-${i + 1} belum memiliki nama elemen.`);
    }
    if (!item.cpCompetence || !item.cpCompetence.trim()) {
      issues.push(`Baris "${item.elementName || i + 1}" belum mengisi Kata Kerja Operasional (Kompetensi).`);
    }
    if (!item.materialScope || !item.materialScope.trim()) {
      issues.push(`Baris "${item.elementName || i + 1}" belum mengisi Lingkup Materi Inti.`);
    }
  }

  // Check if source CP is outdated
  if (cp && cpAnalysis.basedOnCpUpdatedAt && cp.updatedAt) {
    const cpTime = new Date(cp.updatedAt).getTime();
    const anaTime = new Date(cpAnalysis.basedOnCpUpdatedAt).getTime();
    if (cpTime > anaTime + 1000) {
      issues.push('Teks CP telah diperbarui sejak analisis ini dibuat. Mohon sesuaikan analisis.');
    }
  }

  if (issues.length > 0) {
    return {
      status: 'PERLU_DILENGKAPI',
      isSiap: false,
      issues,
    };
  }

  return {
    status: 'SIAP',
    isSiap: true,
    issues: [],
  };
}

export interface TPValidationDetails {
  status: WorkflowCompletionStatus;
  isSiap: boolean;
  issues: string[];
}

/**
 * Validasi mendalam untuk status workflow TPData (Tujuan Pembelajaran)
 */
export function validateTPDataWorkflow(
  tp?: TPData,
  cp?: CPData,
  cpAnalysis?: CPAnalysisData,
  context?: Partial<ActiveContext> | Partial<AcademicSetting>
): TPValidationDetails {
  const issues: string[] = [];

  if (!tp || !tp.items || tp.items.length === 0) {
    return {
      status: 'BELUM_DIMULAI',
      isSiap: false,
      issues: ['Daftar Tujuan Pembelajaran (TP) belum dirumuskan.'],
    };
  }

  // Check if review is flagged
  if (tp.needsReview) {
    issues.push(
      tp.reviewReason ||
        'Tujuan Pembelajaran memerlukan peninjauan ulang karena data acuan (CP / Analisis CP) mengalami perubahan.'
    );
  }

  // Check CP source validity if CP is provided
  if (cp) {
    if (cp.source) {
      const status = normalizeCPVerificationStatus(cp.source.verificationStatus);
      if (status === 'SUPERSEDED') {
        issues.push('CP sumber yang digunakan telah kedaluwarsa/digantikan (SUPERSEDED).');
      } else if (status === 'VERSION_CONFLICT') {
        issues.push('Terjadi konflik versi CP pada sumber rujukan (AMBIGUOUS).');
      }
    }
    if (cp.updatedAt && tp.basedOnCpUpdatedAt) {
      const cpTime = new Date(cp.updatedAt).getTime();
      const tpCpTime = new Date(tp.basedOnCpUpdatedAt).getTime();
      if (cpTime > tpCpTime + 1000) {
        issues.push('Capaian Pembelajaran (CP) telah diperbarui sejak TP ini dirumuskan.');
      }
    }
  }

  // Check CP Analysis validity if CP Analysis is provided
  if (cpAnalysis) {
    if (cpAnalysis.needsReview) {
      issues.push('Analisis CP rujukan memerlukan peninjauan ulang.');
    }
    if (cpAnalysis.updatedAt && tp.basedOnAnalysisUpdatedAt) {
      const anaTime = new Date(cpAnalysis.updatedAt).getTime();
      const tpAnaTime = new Date(tp.basedOnAnalysisUpdatedAt).getTime();
      if (anaTime > tpAnaTime + 1000) {
        issues.push('Analisis CP telah diperbarui sejak TP ini dirumuskan.');
      }
    }
  }

  // Check Context / AcademicSetting consistency if context is provided
  if (context) {
    const level = context.level || (context.grade ? (
      ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6', '1', '2', '3', '4', '5', '6'].some((g) => String(context.grade).includes(g)) ? 'SD' :
      ['Kelas 7', 'Kelas 8', 'Kelas 9', '7', '8', '9'].some((g) => String(context.grade).includes(g)) ? 'SMP' : 'SMA'
    ) : undefined);

    if (level && context.phase) {
      if (level === 'SD' && !['A', 'B', 'C'].includes(context.phase)) {
        issues.push(`Fase ${context.phase} tidak sesuai untuk jenjang SD (harus A, B, atau C).`);
      } else if (level === 'SMP' && context.phase !== 'D') {
        issues.push(`Fase ${context.phase} tidak sesuai untuk jenjang SMP (harus Fase D).`);
      } else if (level === 'SMA' && !['E', 'F'].includes(context.phase)) {
        issues.push(`Fase ${context.phase} tidak sesuai untuk jenjang SMA (harus E atau F).`);
      }
    }
  }

  // Check items completeness & stable ID uniqueness
  const seenIds = new Set<string>();
  for (let i = 0; i < tp.items.length; i++) {
    const item = tp.items[i];
    const stmt = item.statement || item.description || '';
    if (!stmt.trim()) {
      issues.push(`Butir TP ke-${i + 1} (${item.code || 'Tanpa Kode'}) belum memiliki rumusan kalimat TP.`);
    }
    if (!item.id) {
      issues.push(`Butir TP ke-${i + 1} (${item.code || 'Tanpa Kode'}) belum memiliki Stable ID.`);
    } else {
      if (seenIds.has(item.id)) {
        issues.push(`Terdeteksi duplikasi Stable ID (${item.id}) pada butir TP.`);
      }
      seenIds.add(item.id);
    }
  }

  if (issues.length > 0) {
    return {
      status: 'PERLU_DILENGKAPI',
      isSiap: false,
      issues,
    };
  }

  return {
    status: 'SIAP',
    isSiap: true,
    issues: [],
  };
}
