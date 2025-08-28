export interface Batch {
  batchId: string;
  batchTitle: string;
  batchStatus: string;
  batchRegion: string;
  batchStartDate: string;
  batchEndDate: string;
  batchMentor: string[];
  batchReviewer: string[];
  batchTrainer: string[];
  batchTrainee: string[];
  companyId: string;
  courseDescription: string;
  uploadDate: string;
}

export interface FileResource {
  inputControl: string;
  resourceId: string;
  resourceName: string;
  resourceSize: number;
  resourceType: string;
}

export interface BankData {
  accountName: string;
  accountNumber: string;
  bankIFSC: string;
  branchName: string;
}

export interface ProfilePicture {
  originalPicDetails: Record<string, unknown>;
  landScapePicDetails: Record<string, unknown>;
  portaitPicDetails: Record<string, unknown>;
  iconPicDetails: Record<string, unknown>;
  originalImageName: string;
}

export interface BasicData {
  bloodGroup: string;
  companyId: string;
  confirmDate: string;  // ISO Date string
  discipline: string;
  dob: string;          // ISO Date string
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string | null;
  grade: string;
  joiningDate: string;  // ISO Date string
  orgEmail: string;
  profilePicture: ProfilePicture;
  reportingManager: string;
  resignationDate: string;
  role: string;
}

export interface ContactData {
  currGuardian: string;
  currGuardianPhn: string;
  currRelation: string;
  currentAddr: string;
  currentPin: string;
  currentState: string;
  permGuardian: string;
  permGuardianPhn: string;
  permRelation: string;
  permanentAddr: string;
  permanentPin: string;
  permanentState: string;
  phnNumber: string;
}

export interface EducationDocuments {
  ugMarksheetFile: FileResource;
  xMarksheetFile: FileResource;
  xiiMarksheetFile: FileResource;
}

export interface EducationData {
  ugDegreeName: string;
  ugDegreePassingYear: string;
  ugInstituteName: string;
  ugPercentage: string;
  pgDegreeName: string | null;
  pgDegreePassingYear: string | null;
  pgInstituteName: string;
  pgPercentage: string;
  xInstituteName: string;
  xPassingYear: string;
  xPercentage: string;
  xiiInstituteName: string;
  xiiPassingYear: string;
  xiiPercentage: string;
  educationDocuments: EducationDocuments;
}

export interface PersonalDocuments {
  aadhaarFile: FileResource;
  panFile: FileResource;
  voterFile: FileResource;
}

export interface PersonalIdData {
  aadhaarNumber: string;
  panNumber: string;
  passportNumber: string;
  voterNumber: string;
  personalDocuments: PersonalDocuments;
}

export interface Employee {
  allInformationFilled: boolean;
  draftFlag: boolean;
  developer: string;   // "True" | "False" (as per backend)
  isConsultant: boolean;
  isDeveloper: boolean;
  biometricID: string;
  employeeIdentifier: string;
  state: string;   // e.g., "Active"
  status: string;  // e.g., "Working"
  userId: string;

  bankData: BankData;
  basicData: BasicData;
  contactData: ContactData;
  educationData: EducationData;
  personalIdData: PersonalIdData;

  rate: string;
}

export type Employees = Employee[];
