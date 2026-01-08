export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

export interface Application {
  id: string;
  name: string;
  icon: string;
  type: 'mysql' | 'oracle' | 'sqlserver' | 'activedirectory' | 'salesforce' | 'custom';
  status: number;
  gradient: string;
  category: 'IGA' | 'SSO' | 'PAM';
}

export interface OnboardingStatus {
  identified: number;
  informationCollectionInProgress: number;
  informationCollectionCompleted: number;
  onboardingCompleted: number;
  onboardingFailed: number;
  onboardedOffline: number;
}

export interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  options?: ChatOption[];
  fileUpload?: FileUploadConfig;
}

export interface ChatOption {
  id: string;
  label: string;
  value: string;
}

export interface FileUploadConfig {
  types: FileUploadType[];
  multiple: boolean;
}

export interface FileUploadType {
  id: string;
  label: string;
  description?: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  type: string;
  category: string;
}

export interface OnboardingSession {
  applicationId: string;
  applicationName: string;
  selectedProducts: {
    iga?: string;
    sso?: string;
    pam?: string;
  };
  connectionMethod?: string;
  authenticationMethod?: string;
  uploadedDocuments: UploadedFile[];
  status: 'in_progress' | 'completed' | 'pending';
}

