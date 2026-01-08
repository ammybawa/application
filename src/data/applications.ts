import { Application, OnboardingStatus } from '../types';

export const applications: Application[] = [
  {
    id: 'active-directory',
    name: 'Active Directory',
    icon: 'windows',
    type: 'activedirectory',
    status: 0,
    gradient: 'gradient-orange',
    category: 'IGA'
  },
  {
    id: 'ariba',
    name: 'Ariba',
    icon: 'mysql',
    type: 'mysql',
    status: 6,
    gradient: 'gradient-cyan',
    category: 'IGA'
  },
  {
    id: 'database-test2',
    name: 'Database-Test2',
    icon: 'sqlserver',
    type: 'sqlserver',
    status: 0,
    gradient: 'gradient-coral',
    category: 'IGA'
  },
  {
    id: 'epic',
    name: 'EPIC',
    icon: 'mysql',
    type: 'mysql',
    status: 0,
    gradient: 'gradient-pink',
    category: 'IGA'
  },
  {
    id: 'hcm',
    name: 'HCM',
    icon: 'oracle',
    type: 'oracle',
    status: 0,
    gradient: 'gradient-purple',
    category: 'IGA'
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    icon: 'salesforce',
    type: 'salesforce',
    status: 0,
    gradient: 'gradient-blue',
    category: 'IGA'
  },
  {
    id: 'trakk',
    name: 'Trakk',
    icon: 'sap',
    type: 'custom',
    status: 0,
    gradient: 'gradient-brown',
    category: 'IGA'
  },
  {
    id: 'workforce',
    name: 'WorkForce',
    icon: 'workforce',
    type: 'custom',
    status: 0,
    gradient: 'gradient-slate',
    category: 'IGA'
  },
  // SSO Applications
  {
    id: 'okta-sso',
    name: 'Okta',
    icon: 'custom',
    type: 'custom',
    status: 0,
    gradient: 'gradient-blue',
    category: 'SSO'
  },
  {
    id: 'azure-ad',
    name: 'Azure AD',
    icon: 'custom',
    type: 'custom',
    status: 0,
    gradient: 'gradient-cyan',
    category: 'SSO'
  },
  {
    id: 'ping-identity',
    name: 'Ping Identity',
    icon: 'custom',
    type: 'custom',
    status: 0,
    gradient: 'gradient-orange',
    category: 'SSO'
  },
  // PAM Applications
  {
    id: 'cyberark',
    name: 'CyberArk',
    icon: 'custom',
    type: 'custom',
    status: 0,
    gradient: 'gradient-purple',
    category: 'PAM'
  },
  {
    id: 'servicenow-pam',
    name: 'ServiceNow',
    icon: 'custom',
    type: 'custom',
    status: 0,
    gradient: 'gradient-green',
    category: 'PAM'
  },
  {
    id: 'beyondtrust',
    name: 'BeyondTrust',
    icon: 'custom',
    type: 'custom',
    status: 0,
    gradient: 'gradient-teal',
    category: 'PAM'
  }
];

export const onboardingStatus: OnboardingStatus = {
  identified: 5,
  informationCollectionInProgress: 1,
  informationCollectionCompleted: 0,
  onboardingCompleted: 0,
  onboardingFailed: 2,
  onboardedOffline: 1
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
