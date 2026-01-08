import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
      'text/xml',
      'application/xml'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

// In-memory data stores
const applications = [
  { id: 'active-directory', name: 'Active Directory', type: 'activedirectory', status: 0, category: 'IGA' },
  { id: 'ariba', name: 'Ariba', type: 'mysql', status: 6, category: 'IGA' },
  { id: 'database-test2', name: 'Database-Test2', type: 'sqlserver', status: 0, category: 'IGA' },
  { id: 'epic', name: 'EPIC', type: 'mysql', status: 0, category: 'IGA' },
  { id: 'hcm', name: 'HCM', type: 'oracle', status: 0, category: 'IGA' },
  { id: 'salesforce', name: 'Salesforce', type: 'salesforce', status: 0, category: 'IGA' },
  { id: 'trakk', name: 'Trakk', type: 'custom', status: 0, category: 'IGA' },
  { id: 'workforce', name: 'WorkForce', type: 'custom', status: 0, category: 'IGA' }
];

const onboardingSessions = [];

// Routes

// Get all applications
app.get('/api/applications', (req, res) => {
  const { category, search } = req.query;
  let filtered = [...applications];
  
  if (category && category !== 'all') {
    filtered = filtered.filter(app => app.category === category);
  }
  
  if (search) {
    filtered = filtered.filter(app => 
      app.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  res.json(filtered);
});

// Get application by ID
app.get('/api/applications/:id', (req, res) => {
  const app = applications.find(a => a.id === req.params.id);
  if (!app) {
    return res.status(404).json({ error: 'Application not found' });
  }
  res.json(app);
});

// Create new application
app.post('/api/applications', (req, res) => {
  const { name, type, category } = req.body;
  const id = name.toLowerCase().replace(/\s+/g, '-');
  
  const newApp = {
    id,
    name,
    type,
    status: 0,
    category: category || 'IGA'
  };
  
  applications.push(newApp);
  res.status(201).json(newApp);
});

// Update application
app.put('/api/applications/:id', (req, res) => {
  const index = applications.findIndex(a => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Application not found' });
  }
  
  applications[index] = { ...applications[index], ...req.body };
  res.json(applications[index]);
});

// Get onboarding status summary
app.get('/api/onboarding/status', (req, res) => {
  const status = {
    identified: 5,
    informationCollectionInProgress: 1,
    informationCollectionCompleted: 0,
    onboardingCompleted: 0,
    onboardingFailed: 2,
    onboardedOffline: 1,
    total: 9
  };
  res.json(status);
});

// Create onboarding session
app.post('/api/onboarding/sessions', (req, res) => {
  const session = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date(),
    status: 'in_progress'
  };
  
  onboardingSessions.push(session);
  res.status(201).json(session);
});

// Get onboarding sessions
app.get('/api/onboarding/sessions', (req, res) => {
  res.json(onboardingSessions);
});

// Update onboarding session
app.put('/api/onboarding/sessions/:id', (req, res) => {
  const index = onboardingSessions.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Session not found' });
  }
  
  onboardingSessions[index] = { ...onboardingSessions[index], ...req.body };
  res.json(onboardingSessions[index]);
});

// File upload endpoint
app.post('/api/upload', upload.array('documents', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }
  
  const uploadedFiles = req.files.map(file => ({
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    name: file.originalname,
    size: file.size,
    type: file.mimetype,
    path: file.path
  }));
  
  res.json({ files: uploadedFiles });
});

// Chatbot endpoint (simulated AI responses)
app.post('/api/chat', async (req, res) => {
  const { message, context } = req.body;
  
  // Simulated AI responses based on context
  let response = '';
  
  if (!context || context.step === 0) {
    if (message.toLowerCase().includes('onboard')) {
      response = "I'd be happy to help you onboard an application. Please tell me which application you'd like to onboard.";
    } else {
      response = "Hello! I'm Epiphany, your IAM assistant. How may I assist you today?";
    }
  } else {
    response = "Thank you for that information. Let me process your request.";
  }
  
  // If OpenAI API key is available, use it
  if (process.env.OPENAI_API_KEY) {
    try {
      const { OpenAI } = await import('openai');
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are Epiphany, an AI assistant for IAM (Identity Access Management) application onboarding. 
            You help application owners identify starting points for onboarding applications in IAM products like:
            - IGA (Identity Governance and Administration): SailPoint IdentityIQ, Saviynt
            - SSO (Single Sign-On): Okta, Azure AD, Ping Identity
            - PAM (Privileged Access Management): CyberArk, ServiceNow
            
            Guide users through the onboarding process by asking about:
            1. Application name
            2. IGA product selection
            3. SSO product selection  
            4. PAM product selection
            5. Connection methods (JDBC, LDAP, WebServices, API, etc.)
            6. Authentication methods (SAML, OIDC, etc.)
            7. Required documentation
            
            Be professional, helpful, and concise.`
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 200
      });
      
      response = completion.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API error:', error);
      // Fall back to simulated response
    }
  }
  
  res.json({ response });
});

// Product options
app.get('/api/products/iga', (req, res) => {
  res.json(['SailPoint IdentityIQ', 'SailPoint IdentityNow', 'Saviynt', 'None']);
});

app.get('/api/products/sso', (req, res) => {
  res.json(['Okta', 'Azure AD', 'Ping Identity', 'None']);
});

app.get('/api/products/pam', (req, res) => {
  res.json(['CyberArk', 'ServiceNow', 'BeyondTrust', 'None']);
});

app.get('/api/connection-methods', (req, res) => {
  res.json([
    'Active Directory',
    'Salesforce',
    'Service Now',
    'Proprietary API',
    'WebServices',
    'JDBC',
    'LDAP',
    'Delimited File',
    'None'
  ]);
});

app.get('/api/auth-methods', (req, res) => {
  res.json(['SAML', 'OIDC', 'SAML20', 'None']);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Create uploads directory
import { mkdir } from 'fs/promises';
try {
  await mkdir(join(__dirname, 'uploads'), { recursive: true });
} catch (err) {
  // Directory might already exist
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

