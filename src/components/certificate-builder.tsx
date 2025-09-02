'use client';

import { useState, useCallback } from 'react';
import SpreadsheetImporter from './spreadsheet-importer';
import TemplateDesigner from './template-designer';
import EmailBuilder from './email-builder';
import PreviewGenerator from './preview-generator';

interface SpreadsheetData {
  headers: string[];
  rows: any[][];
  fileName: string;
}

interface TemplateElement {
  id: string;
  type: 'text' | 'image';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  isVariable?: boolean;
  variableName?: string;
}

interface Template {
  backgroundImage: string;
  elements: TemplateElement[];
}

interface EmailTemplate {
  subject: string;
  body: string;
}

type Step = 'import' | 'design' | 'email' | 'preview';

export default function CertificateBuilder() {
  const [currentStep, setCurrentStep] = useState<Step>('import');
  const [spreadsheetData, setSpreadsheetData] = useState<SpreadsheetData | null>(null);
  const [template, setTemplate] = useState<Template>({ backgroundImage: '', elements: [] });
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplate>({ subject: '', body: '' });

  const handleSpreadsheetImport = useCallback((data: SpreadsheetData) => {
    setSpreadsheetData(data);
    setCurrentStep('design');
  }, []);

  const handleTemplateComplete = useCallback((templateData: Template) => {
    setTemplate(templateData);
    setCurrentStep('email');
  }, []);

  const handleEmailComplete = useCallback((emailData: EmailTemplate) => {
    setEmailTemplate(emailData);
    setCurrentStep('preview');
  }, []);

  const steps = [
    { id: 'import', name: 'Import Data', completed: !!spreadsheetData },
    { id: 'design', name: 'Design Template', completed: !!template.backgroundImage },
    { id: 'email', name: 'Email Template', completed: !!emailTemplate.subject },
    { id: 'preview', name: 'Preview & Send', completed: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Certificate Builder</h1>
          
          {/* Progress Steps */}
          <div className="mt-4">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                      currentStep === step.id
                        ? 'bg-blue-600 text-white'
                        : step.completed
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {step.completed ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep === step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div className="mx-4 h-px w-8 bg-gray-300" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {currentStep === 'import' && (
          <SpreadsheetImporter onDataImported={handleSpreadsheetImport} />
        )}
        
        {currentStep === 'design' && spreadsheetData && (
          <TemplateDesigner
            headers={spreadsheetData.headers}
            onTemplateComplete={handleTemplateComplete}
            initialTemplate={template}
          />
        )}
        
        {currentStep === 'email' && (
          <EmailBuilder
            headers={spreadsheetData?.headers || []}
            onEmailComplete={handleEmailComplete}
            initialEmail={emailTemplate}
          />
        )}
        
        {currentStep === 'preview' && spreadsheetData && (
          <PreviewGenerator
            spreadsheetData={spreadsheetData}
            template={template}
            emailTemplate={emailTemplate}
          />
        )}
      </div>
    </div>
  );
}
