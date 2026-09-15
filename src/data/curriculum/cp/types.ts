import { CurriculumPhase, SchoolLevel, VerificationStatus } from '../types';

export interface CPElement {
  name: string;
  content: string;
}

export interface MasterCPEntry {
  id: string;
  subjectCode: string;
  phase: CurriculumPhase;
  level: SchoolLevel;
  generalDescription: string;
  elements: CPElement[];
  regulationSourceId: string;
  effectiveFrom?: string;
  effectiveUntil?: string;
  verificationStatus: VerificationStatus;
  notes?: string;
}
