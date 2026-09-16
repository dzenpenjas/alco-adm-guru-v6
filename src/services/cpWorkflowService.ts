import {
  CPData,
  CPAnalysisData,
  WorkflowCompletionStatus,
  ActiveContext,
  AcademicSetting,
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
    if (cp.source.verificationStatus === 'superseded') {
      issues.push('Sumber CP yang digunakan telah kedaluwarsa/digantikan (SUPERSEDED).');
    } else if (cp.source.verificationStatus === 'version_conflict') {
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
