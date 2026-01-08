import { Application, OnboardingStatus } from '../types';

// Start with an empty list - add applications through the UI
export const applications: Application[] = [];

// Onboarding status counters - will update as you add applications
export const onboardingStatus: OnboardingStatus = {
  identified: 0,
  informationCollectionInProgress: 0,
  informationCollectionCompleted: 0,
  onboardingCompleted: 0,
  onboardingFailed: 0,
  onboardedOffline: 0
};

export const productTypes = ['IGA, SSO, PAM', 'IGA Only', 'SSO Only', 'PAM Only'];

export const complianceObjectives = [
  'FERPA (Family Educational Rights and Privacy)',
  'HIPAA (Health Insurance Portability)',
  'SOX (Sarbanes-Oxley)',
  'PCI-DSS (Payment Card Industry)',
  'GDPR (General Data Protection)',
  'SOC 2 (Service Organization Control)'
];

export const igaProducts = ['SailPoint IdentityIQ', 'SailPoint IdentityNow', 'Saviynt', 'None'];
export const ssoProducts = ['Okta', 'Azure AD', 'Ping Identity', 'None'];
export const pamProducts = ['CyberArk', 'ServiceNow', 'BeyondTrust', 'None'];

export const connectionMethods = [
  'Active Directory',
  'Salesforce',
  'Service Now',
  'Proprietary API',
  'WebServices',
  'JDBC',
  'LDAP',
  'Delimited File',
  'None'
];

export const authenticationMethods = ['SAML', 'OIDC', 'SAML20', 'None'];

export const documentTypes = [
  { id: 'access-request', label: 'Access Request Processes', description: 'ITSM access request forms and workflows' },
  { id: 'access-provisioning', label: 'Access Provisioning Processes', description: 'Provisioning runbooks and procedures' },
  { id: 'sso-metadata', label: 'SSO (SAML) metadata configurations', description: 'SAML configuration files' },
  { id: 'csv-files', label: 'CSV Files', description: 'User and entitlement data files' },
  { id: 'other', label: 'Any Other Documents', description: 'Additional supporting documentation' }
];

export const complianceRequirements = [
  { id: 'sox', label: 'SOX (Sarbanes-Oxley Act)' },
  { id: 'ferpa', label: 'FERPA (Family Educational Rights and Privacy Act)' },
  { id: 'fisma', label: 'FISMA (Federal Information Security Management Act)' },
  { id: 'gdpr', label: 'GDPR (General Data Protection Regulation)' },
  { id: 'glba', label: 'GLBA (Gramm-Leach-Bliley Act)' },
  { id: 'hipaa', label: 'HIPAA (Health Insurance Portability and Accountability Act)' },
  { id: 'iso', label: 'ISO/IEC 27001/ITIL (Information Technology Infrastructure Library)' },
  { id: 'nist', label: 'NIST (National Institute of Standards and Technology) Guidelines' },
  { id: 'pci', label: 'PCI DSS (Payment Card Industry Data Security Standard)' },
  { id: 'others', label: 'Others' },
  { id: 'none', label: 'None' }
];

export const databaseTypes = ['IBM DB2', 'Oracle', 'MySQL', 'SQL Server'];

export const igaOperations = ['Create', 'Read', 'Disable', 'Update', 'Delete', 'Other (please specify)'];
