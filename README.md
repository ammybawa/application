# IdentityXpress Epiphany

An IAM (Identity Access Management) Business Analyst application that helps application owners identify starting points for onboarding applications in IAM products.

![IdentityXpress Epiphany](https://via.placeholder.com/800x400?text=IdentityXpress+Epiphany)

## Features

- **Dashboard**: Visual overview of application onboarding status with charts and filters
- **Application Management**: View and manage applications for IGA, SSO, and PAM onboarding
- **AI-Powered Chatbot (Epiphany)**: Interactive assistant that guides users through the onboarding process
- **Multi-Product Support**: 
  - IGA (Identity Governance and Administration): SailPoint IdentityIQ, Saviynt
  - SSO (Single Sign-On): Okta, Azure AD, Ping Identity
  - PAM (Privileged Access Management): CyberArk, ServiceNow
- **Document Upload**: Upload ITSM access request forms, provisioning runbooks, SSO metadata, and CSV files

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Backend**: Express.js
- **AI Integration**: OpenAI API (optional)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd identity-xpress-epiphany
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. (Optional) Add your OpenAI API key to `.env` for AI chatbot functionality:
```
OPENAI_API_KEY=your_api_key_here
```

### Running the Application

**Development mode (Frontend only):**
```bash
npm run dev
```

**Start the backend server:**
```bash
npm run server
```

**Full stack (run both in separate terminals):**
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
identity-xpress-epiphany/
├── public/
│   └── favicon.svg
├── server/
│   └── index.js          # Express backend server
├── src/
│   ├── components/
│   │   ├── Chatbot.tsx   # AI chatbot component
│   │   ├── Layout.tsx    # Main layout wrapper
│   │   └── Sidebar.tsx   # Navigation sidebar
│   ├── data/
│   │   └── applications.ts # Sample data
│   ├── pages/
│   │   ├── ApplicationOnboarding.tsx
│   │   ├── Applications.tsx
│   │   ├── Dashboard.tsx
│   │   └── Profile.tsx
│   ├── types/
│   │   └── index.ts      # TypeScript types
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .env.example
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/applications` | GET | Get all applications |
| `/api/applications/:id` | GET | Get application by ID |
| `/api/applications` | POST | Create new application |
| `/api/onboarding/status` | GET | Get onboarding status summary |
| `/api/onboarding/sessions` | POST | Create onboarding session |
| `/api/upload` | POST | Upload documents |
| `/api/chat` | POST | Chatbot interaction |
| `/api/products/iga` | GET | Get IGA product options |
| `/api/products/sso` | GET | Get SSO product options |
| `/api/products/pam` | GET | Get PAM product options |

## Chatbot Conversation Flow

1. **Greeting**: Epiphany welcomes the user
2. **Application Selection**: User specifies which application to onboard
3. **IGA Product Selection**: Choose SailPoint, Saviynt, or None
4. **SSO Product Selection**: Choose Okta, Azure AD, Ping Identity, or None
5. **PAM Product Selection**: Choose CyberArk, ServiceNow, or None
6. **Connection Method**: Select how IAM connects to the application
7. **Authentication Method**: Select authentication protocol (SAML, OIDC, etc.)
8. **Document Upload**: Upload relevant documentation

## Customization

### Adding New Applications

Edit `src/data/applications.ts` to add new applications:

```typescript
{
  id: 'new-app',
  name: 'New Application',
  icon: 'custom',
  type: 'custom',
  status: 0,
  gradient: 'gradient-blue',
  category: 'IGA'
}
```

### Adding New Product Options

Edit the data files or update the backend API endpoints to add new IAM products.

## License

MIT License - feel free to use this project for your own purposes.

## Acknowledgments

Inspired by CyberSolve Innovation Labs' IdentityXpress platform.

