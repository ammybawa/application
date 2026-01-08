import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface OnboardingData {
  applicationName: string;
  description: string;
  ownerEmail: string;
  connectionMethod: string;
  complianceObjective: string;
  databaseType: string;
  hostname: string;
  port: string;
  serviceName: string;
  serviceAccount: string;
  chatHistory: { question: string; answer: string }[];
  queries: {
    reconciliation: string;
    create: string;
    disable: string;
    update: string;
    unlock: string;
    entitlements: string;
  };
}

export function generateOnboardingPDF(data: OnboardingData): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;

  // Helper function to add page if needed
  const checkPageBreak = (height: number) => {
    if (yPos + height > 270) {
      doc.addPage();
      yPos = 20;
    }
  };

  // Title
  doc.setFontSize(20);
  doc.setTextColor(0, 102, 153);
  doc.text('IdentityXpress Epiphany', pageWidth / 2, yPos, { align: 'center' });
  yPos += 10;

  doc.setFontSize(14);
  doc.setTextColor(100, 100, 100);
  doc.text('IAM Onboarding Requirements Document', pageWidth / 2, yPos, { align: 'center' });
  yPos += 20;

  // Application Name Header
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text(`Application: ${data.applicationName}`, 14, yPos);
  yPos += 15;

  // General Information Section
  doc.setFontSize(14);
  doc.setTextColor(0, 102, 153);
  doc.text('General Information', 14, yPos);
  yPos += 5;

  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  const generalText = `This section outlines the application's general information, including the business or technical lead responsible for overseeing the application's management, ensuring compliance, and addressing any issues that arise. It also highlights the application's compliance objectives, such as regulatory standards it adheres to, which may impact how user access is governed and audited.

It also specifies the connection method used to integrate the application with the IGA system. This could include details about the technical interface, such as API, JDBC, or flat-file integrations, that allows secure and efficient data transfer between the application and the IGA platform, ensuring proper identity lifecycle management and access governance.`;

  const splitText = doc.splitTextToSize(generalText, pageWidth - 28);
  doc.text(splitText, 14, yPos + 5);
  yPos += splitText.length * 5 + 15;

  // General Information Table
  checkPageBreak(60);
  doc.setFontSize(11);
  doc.text("Application's General Information gathered is as follows:", 14, yPos);
  yPos += 5;

  autoTable(doc, {
    startY: yPos,
    head: [],
    body: [
      ["Application's Display Name", data.applicationName],
      ["Application's Description", data.description],
      ["Application Owner's Email", data.ownerEmail],
      ["Connection Method", data.connectionMethod],
      ["Compliance Objective", data.complianceObjective],
    ],
    theme: 'grid',
    styles: { fontSize: 10, cellPadding: 3 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 60 },
      1: { cellWidth: 'auto' }
    }
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;

  // Connector Details Section
  checkPageBreak(80);
  doc.setFontSize(14);
  doc.setTextColor(0, 102, 153);
  doc.text('Connector Details', 14, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  const connectorText = `The ${data.applicationName} application can be seamlessly integrated with the Identity Governance and Administration (IGA) system using a ${data.connectionMethod} connector. This integration allows for efficient data transfer between the application and the IGA platform.`;
  const connectorSplit = doc.splitTextToSize(connectorText, pageWidth - 28);
  doc.text(connectorSplit, 14, yPos);
  yPos += connectorSplit.length * 5 + 10;

  // Connection Details Table
  checkPageBreak(80);
  autoTable(doc, {
    startY: yPos,
    head: [['Property', 'Value']],
    body: [
      ['Database Type', data.databaseType],
      ['Hostname', data.hostname],
      ['Port', data.port],
      ['Database/Service Name', data.serviceName],
      ['Service Account', data.serviceAccount],
    ],
    theme: 'striped',
    headStyles: { fillColor: [0, 102, 153] },
    styles: { fontSize: 10, cellPadding: 3 }
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;

  // SQL Queries Section
  checkPageBreak(100);
  doc.addPage();
  yPos = 20;

  doc.setFontSize(14);
  doc.setTextColor(0, 102, 153);
  doc.text('Database Queries & Operations', 14, yPos);
  yPos += 10;

  autoTable(doc, {
    startY: yPos,
    head: [['Operation', 'Query/Procedure']],
    body: [
      ['Accounts Reconciliation', data.queries.reconciliation],
      ['Account Creation', data.queries.create],
      ['Account Disablement', data.queries.disable],
      ['Account Update', data.queries.update],
      ['Account Unlock', data.queries.unlock],
      ['Entitlements Reconciliation', data.queries.entitlements],
    ],
    theme: 'striped',
    headStyles: { fillColor: [0, 102, 153] },
    styles: { fontSize: 9, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: 'auto' }
    }
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;

  // Chatbot Q&A Section
  if (data.chatHistory.length > 0) {
    checkPageBreak(50);
    doc.addPage();
    yPos = 20;

    doc.setFontSize(14);
    doc.setTextColor(0, 102, 153);
    doc.text('Requirements Gathering - Q&A Summary', 14, yPos);
    yPos += 5;

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('The following information was gathered through the Epiphany AI assistant:', 14, yPos + 5);
    yPos += 15;

    autoTable(doc, {
      startY: yPos,
      head: [['Question', 'Answer']],
      body: data.chatHistory.map(item => [item.question, item.answer]),
      theme: 'striped',
      headStyles: { fillColor: [0, 102, 153] },
      styles: { fontSize: 9, cellPadding: 4 },
      columnStyles: {
        0: { cellWidth: 90 },
        1: { cellWidth: 'auto' }
      }
    });
  }

  // Footer on all pages
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Generated by IdentityXpress Epiphany | Page ${i} of ${pageCount}`,
      pageWidth / 2,
      290,
      { align: 'center' }
    );
    doc.text(
      `Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      pageWidth - 14,
      290,
      { align: 'right' }
    );
  }

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '').slice(0, 14);
  doc.save(`${data.applicationName}_Document_${timestamp}.pdf`);
}

// Sample data for testing
export const sampleOnboardingData: OnboardingData = {
  applicationName: 'Ariba',
  description: 'Ariba SAP Application',
  ownerEmail: 'jsmith@cybersolve.com',
  connectionMethod: 'JDBC',
  complianceObjective: 'SOX (Sarbanes-Oxley Act)',
  databaseType: 'MySQL',
  hostname: 'mysql-targetapp1.c0druaxqetmo.us-east-1.rds.amazonaws.com',
  port: '3306',
  serviceName: 'trakk',
  serviceAccount: 'admin',
  chatHistory: [
    {
      question: 'What details in the system indicate that a user is no longer with the company?',
      answer: 'User status changed from "Active" to "Inactive" in database; accounts disabled; account deleted after 60 days.'
    },
    {
      question: 'How long does it typically take to remove access for a departing employee?',
      answer: '24hours'
    },
    {
      question: 'Which tasks do you want to set up in your identity management system for employees who leave?',
      answer: '- Change user status from "Active" to "Inactive"\n- Disable Target Accounts\n- Delete account after 60 days'
    },
    {
      question: 'Which applications and systems do you typically revoke access to when someone leaves?',
      answer: 'Disable Target Accounts.'
    },
    {
      question: 'Is there a standardized process for removing access across all applications?',
      answer: 'Yes, we do have a standard process per application for removing access.'
    },
    {
      question: 'Are accounts deleted or just disabled when someone leaves?',
      answer: 'Accounts are disabled but not deleted for Audit purpose.'
    },
    {
      question: 'How do you make sure that all access rights are revoked for someone who has left the company?',
      answer: 'Run a script to disable the account, change the password, move to the Disabled OU.'
    }
  ],
  queries: {
    reconciliation: 'select * from users left outer join userscapabilities on users.id = userscapabilities.id order by users.id',
    create: 'insert into users (id,firstname,lastname,email) values (?,?,?,?)',
    disable: 'update users set IIQDisabled=true where id=?',
    update: 'update users set lastname=?,email=? where id=?',
    unlock: 'update users set IIQDisabled=false where id=?',
    entitlements: 'select * from capabilities'
  }
};

