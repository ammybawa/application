import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageCircle,
  X,
  Volume2,
  Power,
  Send,
  Upload,
  Paperclip,
  Bot
} from 'lucide-react';
import clsx from 'clsx';
import { ChatMessage, UploadedFile } from '../types';
import { documentTypes } from '../data/applications';

interface ConversationState {
  step: number;
  applicationName: string;
  isTechnicalOwner: boolean;
  technicalOwnerInfo: string;
  complianceRequirements: string[];
  applicationPurpose: string;
  selectedIGA: string;
  selectedSSO: string;
  selectedPAM: string;
  connectionMethod: string;
  authMethod: string;
  canExtractCSV: boolean;
  databaseType: string;
  databaseHostname: string;
  databasePort: string;
  databaseServiceName: string;
  serviceAccountName: string;
  igaOperations: string[];
  reconciliationQuery: string;
  uniqueIdentifier: string;
  statusAttribute: string;
  createQuery: string;
  disableQuery: string;
  updateQuery: string;
  unlockQuery: string;
  entitlementsQuery: string;
  addEntitlementQuery: string;
  loggingMethod: string;
  userTypes: string;
  uploadedFiles: UploadedFile[];
  progress: number;
}

const initialState: ConversationState = {
  step: 0,
  applicationName: '',
  isTechnicalOwner: false,
  technicalOwnerInfo: '',
  complianceRequirements: [],
  applicationPurpose: '',
  selectedIGA: '',
  selectedSSO: '',
  selectedPAM: '',
  connectionMethod: '',
  authMethod: '',
  canExtractCSV: false,
  databaseType: '',
  databaseHostname: '',
  databasePort: '',
  databaseServiceName: '',
  serviceAccountName: '',
  igaOperations: [],
  reconciliationQuery: '',
  uniqueIdentifier: '',
  statusAttribute: '',
  createQuery: '',
  disableQuery: '',
  updateQuery: '',
  unlockQuery: '',
  entitlementsQuery: '',
  addEntitlementQuery: '',
  loggingMethod: '',
  userTypes: '',
  uploadedFiles: [],
  progress: 0
};

const complianceOptions = [
  { id: 'a', label: 'SOX (Sarbanes-Oxley Act)' },
  { id: 'b', label: 'FERPA (Family Educational Rights and Privacy Act)' },
  { id: 'c', label: 'FISMA (Federal Information Security Management Act)' },
  { id: 'd', label: 'GDPR (General Data Protection Regulation)' },
  { id: 'e', label: 'GLBA (Gramm-Leach-Bliley Act)' },
  { id: 'f', label: 'HIPAA (Health Insurance Portability and Accountability Act)' },
  { id: 'g', label: 'ISO/IEC 27001/ITIL (Information Technology Infrastructure Library)' },
  { id: 'h', label: 'NIST (National Institute of Standards and Technology) Guidelines' },
  { id: 'i', label: 'PCI DSS (Payment Card Industry Data Security Standard)' },
  { id: 'j', label: 'Others' },
  { id: 'k', label: 'None' }
];

const databaseTypes = [
  { id: 'a', label: 'IBM DB2' },
  { id: 'b', label: 'Oracle' },
  { id: 'c', label: 'MySQL' },
  { id: 'd', label: 'SQL Server' }
];

const igaOperationsList = [
  { id: 'a', label: 'Create' },
  { id: 'b', label: 'Read' },
  { id: 'c', label: 'Disable' },
  { id: 'd', label: 'Update' },
  { id: 'e', label: 'Delete' },
  { id: 'f', label: 'Other (please specify)' }
];

const igaProducts = ['SailPoint IdentityIQ', 'SailPoint IdentityNow', 'Saviynt', 'None'];
const ssoProducts = ['Okta', 'Azure AD', 'Ping Identity', 'None'];
const pamProducts = ['CyberArk', 'ServiceNow', 'BeyondTrust', 'None'];
const connectionMethods = ['Active Directory', 'Salesforce', 'Service Now', 'Proprietary API', 'WebServices', 'JDBC', 'LDAP', 'Delimited File', 'None'];
const authMethods = ['SAML', 'OIDC', 'SAML20', 'None'];

export default function Chatbot() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [conversationState, setConversationState] = useState<ConversationState>(initialState);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(
        "Hello and welcome! I'm Epiphany. I'm here to provide you support and answer any questions related to your IAM program. How may I assist you today?",
        []
      );
    }
  }, [isOpen]);

  const formatTimestamp = () => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear().toString().slice(-2);
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  const addBotMessage = (
    content: string, 
    options: { label: string; value: string }[] = [], 
    showFileUpload = false,
    autoFilledResponse?: string
  ) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'bot',
        content,
        timestamp: new Date(),
        options: options.length > 0 ? options.map((opt, idx) => ({ id: `opt-${idx}`, ...opt })) : undefined,
        fileUpload: showFileUpload ? { types: documentTypes, multiple: true } : undefined
      };
      setMessages(prev => [...prev, newMessage]);
      
      if (autoFilledResponse) {
        setInputValue(autoFilledResponse);
      }
    }, 800);
  };

  const addUserMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleOptionSelect = (value: string, label: string) => {
    addUserMessage(label);
    processConversation(value);
  };

  const updateProgress = (newProgress: number) => {
    setConversationState(prev => ({ ...prev, progress: Math.min(100, newProgress) }));
  };

  const processConversation = (userInput: string) => {
    const { step } = conversationState;

    switch (step) {
      case 0:
        if (userInput.toLowerCase().includes('ariba') || userInput.toLowerCase().includes('application') || userInput.toLowerCase().includes('onboard')) {
          const appName = userInput.toLowerCase().includes('ariba') ? 'Ariba' : 'Application';
          setConversationState(prev => ({ ...prev, step: 1, applicationName: appName }));
          updateProgress(5);
          addBotMessage(
            `It seems the name of the application you would like to onboard is ${appName}. Please confirm.`,
            [{ label: 'Yes', value: 'confirm-yes' }, { label: 'No', value: 'confirm-no' }]
          );
        } else {
          addBotMessage("I'd be happy to help you onboard an application. Please tell me which application you'd like to onboard.", []);
        }
        break;

      case 1:
        if (userInput === 'confirm-yes') {
          setConversationState(prev => ({ ...prev, step: 2 }));
          updateProgress(8);
          addBotMessage(
            `You are onboarding Application ${conversationState.applicationName} in the following Identity Governance and Administration (IGA) products, please select`,
            igaProducts.map(p => ({ label: p, value: p }))
          );
        } else {
          setConversationState(prev => ({ ...prev, step: 0, applicationName: '' }));
          addBotMessage("Please tell me which application you'd like to onboard.", []);
        }
        break;

      case 2:
        setConversationState(prev => ({ ...prev, step: 3, selectedIGA: userInput }));
        updateProgress(12);
        addBotMessage(
          "You could onboard this application also in the following Single Sign-On (SSO) products, please select",
          ssoProducts.map(p => ({ label: p, value: p }))
        );
        break;

      case 3:
        setConversationState(prev => ({ ...prev, step: 4, selectedSSO: userInput }));
        updateProgress(16);
        addBotMessage(
          "You could onboard this application also in the following Privileged Access Management (PAM) products, please select",
          pamProducts.map(p => ({ label: p, value: p }))
        );
        break;

      case 4:
        setConversationState(prev => ({ ...prev, step: 5, selectedPAM: userInput }));
        updateProgress(20);
        addBotMessage(
          "How can an IAM solution connect to your application?",
          connectionMethods.map(m => ({ label: m, value: m }))
        );
        break;

      case 5:
        setConversationState(prev => ({ ...prev, step: 6, connectionMethod: userInput }));
        updateProgress(24);
        addBotMessage(
          "What authentication methods does the application currently support?",
          authMethods.map(m => ({ label: m, value: m }))
        );
        break;

      case 6:
        setConversationState(prev => ({ ...prev, step: 7, authMethod: userInput }));
        updateProgress(28);
        addBotMessage(
          "Can you please upload any of the following type of documents associated with the relevant practices followed currently with the application being onboarded:",
          [],
          true
        );
        break;

      case 7:
        setConversationState(prev => ({ ...prev, step: 8 }));
        updateProgress(32);
        addBotMessage(
          "Are you the technical owner of the application? If not, could you please mention the name and email ID of the technical owner?",
          [
            { label: 'Yes I am the technical owner of the application.', value: 'owner-yes' },
            { label: 'No, I am not the technical owner', value: 'owner-no' }
          ]
        );
        break;

      case 8:
        setConversationState(prev => ({ ...prev, step: 9, isTechnicalOwner: userInput === 'owner-yes' }));
        updateProgress(36);
        addBotMessage(
          "Understood.\nIs the identity management application subject to any compliance requirements?\n\n" +
          complianceOptions.map(c => `${c.id}) ${c.label}`).join('\n'),
          complianceOptions.map(c => ({ label: c.label, value: c.id }))
        );
        break;

      case 9:
        setConversationState(prev => ({ ...prev, step: 10, complianceRequirements: [userInput] }));
        updateProgress(40);
        addBotMessage(
          "Thanks for sharing that.\nCould you please explain the main purpose of this application and the business function it supports?\n\nA response for this question has already been generated based on the documents you initially provided. Please review it and update it if required.",
          [],
          false,
          "The main purpose of the application is to manage user account creation and provisioning, including verification, account setup, and access management. It supports business functions related to user management, account control, and compliance through identity verification and role assignment."
        );
        break;

      case 10:
        setConversationState(prev => ({ ...prev, step: 11, applicationPurpose: userInput }));
        updateProgress(44);
        addBotMessage(
          "Just to confirm, the answer is Yes.\nCan a file be extracted in a generic file format (like CSV)?",
          [{ label: 'Yes', value: 'csv-yes' }, { label: 'No', value: 'csv-no' }]
        );
        break;

      case 11:
        setConversationState(prev => ({ ...prev, step: 12, canExtractCSV: userInput === 'csv-yes' }));
        updateProgress(48);
        addBotMessage(
          "Just to confirm, the answer is Yes.\nCould you please specify the type of database used?\n\n" +
          databaseTypes.map(d => `${d.id}) ${d.label}`).join('\n') +
          "\n\nA response for this question has already been generated based on the documents you initially provided. Please review it and update it if required.",
          databaseTypes.map(d => ({ label: d.label, value: d.label })),
          false,
          "MySQL"
        );
        break;

      case 12:
        setConversationState(prev => ({ ...prev, step: 13, databaseType: userInput }));
        updateProgress(52);
        addBotMessage(
          "Thanks for sharing that.\nCan you please provide the database hostname?\n\nA response for this question has already been generated based on the documents you initially provided. Please review it and update it if required.",
          [],
          false,
          "mysql-targetapp1.c0druaxqetmo.us-east-1.rds.amazonaws.com"
        );
        break;

      case 13:
        setConversationState(prev => ({ ...prev, step: 14, databaseHostname: userInput }));
        updateProgress(56);
        addBotMessage(
          "Thanks for sharing that.\nCan you please provide the database port number?\n\nA response for this question has already been generated based on the documents you initially provided. Please review it and update it if required.",
          [],
          false,
          "3306"
        );
        break;

      case 14:
        setConversationState(prev => ({ ...prev, step: 15, databasePort: userInput }));
        updateProgress(60);
        addBotMessage(
          "Understood.\nCan you please provide the database/service name?\n\nA response for this question has already been generated based on the documents you initially provided. Please review it and update it if required.",
          [],
          false,
          "trakk"
        );
        break;

      case 15:
        setConversationState(prev => ({ ...prev, step: 16, databaseServiceName: userInput }));
        updateProgress(64);
        addBotMessage(
          "Thanks for sharing that.\nCan you please provide the service account name that can access this database?\n\nA response for this question has already been generated based on the documents you initially provided. Please review it and update it if required.",
          [],
          false,
          "admin"
        );
        break;

      case 16:
        setConversationState(prev => ({ ...prev, step: 17, serviceAccountName: userInput }));
        updateProgress(68);
        addBotMessage(
          "Thanks for sharing that.\nWhat operations must the Identity Governance and Administration (IGA) system support for database user accounts?\n\n" +
          igaOperationsList.map(o => `${o.id}) ${o.label}`).join('\n') +
          "\n\nA response for this question has already been generated based on the documents you initially provided. Please review it and update it if required.",
          igaOperationsList.map(o => ({ label: o.label, value: o.label })),
          false,
          "Create, Read, Update, Delete, Disable."
        );
        break;

      case 17:
        setConversationState(prev => ({ ...prev, step: 18, igaOperations: userInput.split(', ') }));
        updateProgress(72);
        addBotMessage(
          "Understood.\nPlease provide the database query or table to reconcile all user accounts?\n\nA response for this question has already been generated based on the documents you initially provided. Please review it and update it if required.",
          [],
          false,
          "select * from users left outer join userscapabilities on users.id = userscapabilities.id order by users.id"
        );
        break;

      case 18:
        setConversationState(prev => ({ ...prev, step: 19, reconciliationQuery: userInput }));
        updateProgress(75);
        addBotMessage(
          "Thanks for sharing that.\nWhich attribute uniquely identifies the user account?\n\nA response for this question has already been generated based on the documents you initially provided. Please review it and update it if required.",
          [],
          false,
          "username, id, email, IIQDisabled"
        );
        break;

      case 19:
        setConversationState(prev => ({ ...prev, step: 20, uniqueIdentifier: userInput }));
        updateProgress(78);
        addBotMessage(
          "Thanks for sharing that.\nCould you please provide database queries or details for creating a user account?\n\nA response for this question has already been generated based on the documents you initially provided. Please review it and update it if required.",
          [],
          false,
          "insert into users (id,firstname,lastname,email) values (?,?,?,?)"
        );
        break;

      case 20:
        setConversationState(prev => ({ ...prev, step: 21, createQuery: userInput }));
        updateProgress(81);
        addBotMessage(
          "Understood.\nCould you please provide database queries or details for disabling an account?\n\nA response for this question has already been generated based on the documents you initially provided. Please review it and update it if required.",
          [],
          false,
          "update users set IIQDisabled=true where id=?"
        );
        break;

      case 21:
        setConversationState(prev => ({ ...prev, step: 22, disableQuery: userInput }));
        updateProgress(84);
        addBotMessage(
          "Thanks for sharing that.\nCould you please provide database queries or details for updating user account?\n\nA response for this question has already been generated based on the documents you initially provided. Please review it and update it if required.",
          [],
          false,
          "update users set lastname=?,email=? where id=?"
        );
        break;

      case 22:
        setConversationState(prev => ({ ...prev, step: 23, updateQuery: userInput }));
        updateProgress(87);
        addBotMessage(
          "Understood.\nCould you please provide database queries or details for unlocking an account?\n\nA response for this question has already been generated based on the documents you initially provided. Please review it and update it if required.",
          [],
          false,
          "update users set IIQDisabled=false where id=?"
        );
        break;

      case 23:
        setConversationState(prev => ({ ...prev, step: 24, unlockQuery: userInput }));
        updateProgress(90);
        addBotMessage(
          "Thanks for sharing that.\nCould you please provide database queries or details for reconciling user groups/roles or entitlements?\n\nA response for this question has already been generated based on the documents you initially provided. Please review it and update it if required.",
          [],
          false,
          "select * from capabilities"
        );
        break;

      case 24:
        setConversationState(prev => ({ ...prev, step: 25, entitlementsQuery: userInput }));
        updateProgress(93);
        addBotMessage(
          "Understood.\nCould you please provide database queries or details for adding a new entitlement to a user?\n\nA response for this question has already been generated based on the documents you initially provided. Please review it and update it if required.",
          [{ label: 'Not required.', value: 'not-required' }],
          false,
          "insert into userscapabilities (id,capability) values (?,?)"
        );
        break;

      case 25:
        setConversationState(prev => ({ ...prev, step: 26, addEntitlementQuery: userInput }));
        updateProgress(96);
        addBotMessage(
          "Alright.\nHow does the application manage logging and reviewing user access activities?",
          [],
          false,
          "They are maintained in the log monitoring tool"
        );
        break;

      case 26:
        setConversationState(prev => ({ ...prev, step: 27, loggingMethod: userInput }));
        updateProgress(98);
        addBotMessage(
          "There are two different types of users, employees and contractors. There should be absolute process and approvals in place when these two types of users are requesting for access. Copy access should be slowly decommissioned.",
          [],
          false
        );
        setTimeout(() => {
          setConversationState(prev => ({ ...prev, step: 28 }));
          updateProgress(100);
          addBotMessage(
            "You have answered most of the questions about requirements for onboarding this application. You will be now redirected to a set of forms for finishing the onboarding activity. Please click the ⏻ icon on the top of this chatbot interface to end this chat.",
            [{ label: 'Go to Questionnaire', value: 'goto-questionnaire' }]
          );
        }, 2000);
        break;

      case 28:
        if (userInput === 'goto-questionnaire') {
          navigate('/questionnaire');
          setIsOpen(false);
        }
        break;

      default:
        addBotMessage("I'm here to help! Please tell me what you'd like to do.", []);
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    addUserMessage(inputValue);
    processConversation(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileNames = Array.from(files).map(f => f.name).join(', ');
      addUserMessage(`Uploaded: ${fileNames}`);
      setConversationState(prev => ({
        ...prev,
        uploadedFiles: [
          ...prev.uploadedFiles,
          ...Array.from(files).map(f => ({
            id: Date.now().toString(),
            name: f.name,
            type: f.type,
            category: 'document'
          }))
        ]
      }));
      processConversation('files-uploaded');
    }
  };

  const handleEndChat = () => {
    if (conversationState.progress >= 100) {
      navigate('/questionnaire');
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all chat-trigger z-50"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Overlay to close chat when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-6 right-6 w-[420px] h-[650px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-slate-200"
          onClick={(e) => e.stopPropagation()}>
        
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot size={20} />
              </div>
              <div>
                <div className="font-semibold">IdentityXpress Epiphany</div>
                <div className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Online
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Sound">
                <Volume2 size={18} />
              </button>
              <button 
                onClick={handleEndChat}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="End chat and go to questionnaire"
              >
                <Power size={18} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="p-2 hover:bg-red-500/30 rounded-lg transition-colors ml-1"
                title="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Application Context & Progress */}
          {conversationState.applicationName && (
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm">
                  <span className="text-slate-500">Application - </span>
                  <span className="text-cyan-600 font-medium">{conversationState.applicationName}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">Status</span>
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${conversationState.progress}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-green-600">{conversationState.progress}%</span>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={clsx(
                  'chat-message flex',
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div className={clsx('max-w-[85%]', message.type === 'user' ? 'order-2' : 'order-1')}>
                  <div className={clsx(
                    'flex items-start gap-2',
                    message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                  )}>
                    <div className={clsx(
                      'w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0',
                      message.type === 'user'
                        ? 'bg-gradient-to-br from-blue-400 to-cyan-400 text-white'
                        : 'bg-slate-200 text-slate-600'
                    )}>
                      {message.type === 'user' ? 'JS' : <Bot size={16} />}
                    </div>
                    <div className="flex-1">
                      <div className={clsx(
                        'text-xs text-slate-400 mb-1',
                        message.type === 'user' ? 'text-right' : 'text-left'
                      )}>
                        {formatTimestamp()}
                      </div>
                      <div className={clsx(
                        'rounded-2xl px-4 py-3 text-sm whitespace-pre-line',
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-tr-sm'
                          : 'bg-slate-100 text-slate-700 rounded-tl-sm'
                      )}>
                        {message.content}
                      </div>
                    </div>
                  </div>

                  {message.options && message.options.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2 ml-10">
                      {message.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleOptionSelect(option.value, option.label)}
                          className="px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-full hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors text-left"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {message.fileUpload && (
                    <div className="mt-3 space-y-2 ml-10">
                      {message.fileUpload.types.map((type) => (
                        <div
                          key={type.id}
                          className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
                        >
                          <span className="text-sm text-slate-600">{type.label}</span>
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors"
                          >
                            <Upload size={12} />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => processConversation('skip-upload')}
                        className="w-full py-2 text-sm text-slate-500 hover:text-slate-700"
                      >
                        None
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                  <Bot size={16} className="text-slate-600" />
                </div>
                <div className="bg-slate-100 rounded-2xl px-4 py-3">
                  <div className="flex gap-1 items-center">
                    <span className="w-2 h-2 rounded-full bg-slate-400 loading-dot"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-400 loading-dot"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-400 loading-dot"></span>
                    <span className="text-xs text-slate-500 ml-2">Epiphany analyzing your response...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <Paperclip size={20} />
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="flex-1 px-4 py-2 border border-slate-200 rounded-full text-sm focus:outline-none focus:border-blue-400"
              />
              <button
                onClick={handleSend}
                className="p-2 text-blue-500 hover:text-blue-600 transition-colors"
              >
                <Send size={20} />
              </button>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <Upload size={20} />
              </button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileUpload}
            accept=".pdf,.doc,.docx,.xlsx,.csv,.xml"
          />
        </div>
      )}
    </>
  );
}
