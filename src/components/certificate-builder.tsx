'use client';

import { useState, useCallback } from 'react';
import SpreadsheetImporter from './spreadsheet-importer';
import TemplateDesigner from './template-designer';
import EmailBuilder from './email-builder';
import PreviewGenerator from './preview-generator';

interface SpreadsheetData {
  headers: string[];
  rows: string[][];
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
    <div className="min-h-screen" style={{ 
      background: 'linear-gradient(135deg, #0d0630, #18314f)',
      minHeight: '100vh',
      position: 'relative'
    }}>
      {/* Full-screen background overlay to prevent white overflow */}
      <div 
        className="fixed inset-0 -z-10"
        style={{ 
          background: 'linear-gradient(135deg, #0d0630 0%, #18314f 50%, #384e77 100%)',
          minHeight: '100vh',
          width: '100vw'
        }}
      />
      
      {/* Header */}
      <div className="border-b relative z-10" style={{ backgroundColor: '#18314f', borderColor: '#384e77' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-white">Certificate Builder</h1>
          
          {/* Progress Steps */}
          <div className="mt-4">
            <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto pb-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <div
                    className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-medium ${
                      currentStep === step.id
                        ? 'text-white'
                        : step.completed
                        ? 'text-white'
                        : 'text-gray-400'
                    }`}
                    style={{
                      backgroundColor: currentStep === step.id
                        ? '#683abe'
                        : step.completed
                        ? '#b298dc'
                        : '#384e77'
                    }}
                  >
                    {step.completed ? (
                      <svg className="w-3 h-3 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className={`ml-1 sm:ml-2 text-xs sm:text-sm font-medium whitespace-nowrap ${
                    currentStep === step.id ? 'text-white' : 'text-gray-300'
                  }`}>
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div className="mx-2 sm:mx-4 h-px w-4 sm:w-8 flex-shrink-0" style={{ backgroundColor: '#384e77' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 relative z-10">
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
