'use client';

import { useState, useRef } from 'react';

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

interface PreviewGeneratorProps {
  spreadsheetData: SpreadsheetData;
  template: Template;
  emailTemplate: EmailTemplate;
}

export default function PreviewGenerator({ 
  spreadsheetData, 
  template, 
  emailTemplate 
}: PreviewGeneratorProps) {
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<'preview' | 'sending' | 'complete'>('preview');
  const [sendResults, setSendResults] = useState<{
    successful: string[];
    failed: Array<{email: string, error: string}>;
  }>({ successful: [], failed: [] });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const selectedRow = spreadsheetData.rows[selectedRowIndex] || [];
  const rowData: Record<string, string> = {};
  
  spreadsheetData.headers.forEach((header, index) => {
    rowData[header] = selectedRow[index] || '';
  });

  // Function to replace variables in text
  const replaceVariables = (text: string, data: Record<string, string>) => {
    return text.replace(/{([^}]+)}/g, (match, fieldName) => {
      return data[fieldName] || match;
    });
  };

  // Generate preview email
  const previewEmail = {
    subject: replaceVariables(emailTemplate.subject, rowData),
    body: replaceVariables(emailTemplate.body, rowData),
    to: rowData['email'] || rowData['Email'] || 'No email found'
  };

  // Generate certificate for current row
  const generateCertificate = async (rowData: Record<string, string>) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return null;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return null;
    }

    canvas.width = 800;
    canvas.height = 600;

    return new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          // Clear canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Draw background image
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Calculate scaling factors
          // Template designer uses 600px height with 4:3 aspect ratio (800px width)
          const scaleX = canvas.width / 800;  // Designer canvas width
          const scaleY = canvas.height / 600; // Designer canvas height

          // Draw template elements with proper scaling
          template.elements.forEach((element) => {
            if (element.type === 'text') {
              ctx.font = `${(element.fontSize || 16) * scaleY}px ${element.fontFamily || 'Arial'}`;
              ctx.fillStyle = element.color || '#000000';
              
              const text = element.isVariable && element.variableName
                ? rowData[element.variableName] || element.content
                : element.content;
              
              // Scale positions to match canvas size
              const scaledX = element.x * scaleX;
              const scaledY = (element.y + (element.fontSize || 16)) * scaleY;
              
              ctx.fillText(text, scaledX, scaledY);
            }
          });

          // Convert to base64
          const dataUrl = canvas.toDataURL('image/png');
          resolve(dataUrl);
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = (error) => {
        reject(new Error('Failed to load background image'));
      };
      
      img.src = template.backgroundImage;
    });
  };

  const sendCertificates = async () => {
    setSending(true);
    setCurrentStep('sending');
    setSendStatus('Preparing to send certificates...');
    setSendResults({ successful: [], failed: [] });

    try {
      const emailColumn = spreadsheetData.headers.findIndex(h => 
        h.toLowerCase().includes('email') || h.toLowerCase().includes('mail')
      );

      if (emailColumn === -1) {
        throw new Error('No email column found in spreadsheet');
      }

      const totalRows = spreadsheetData.rows.length;
      let successCount = 0;
      let errorCount = 0;
      const successful: string[] = [];
      const failed: Array<{email: string, error: string}> = [];

      for (let i = 0; i < totalRows; i++) {
        const row = spreadsheetData.rows[i];
        const currentRowData: Record<string, string> = {};
        
        spreadsheetData.headers.forEach((header, index) => {
          currentRowData[header] = row[index] || '';
        });

        const email = row[emailColumn];
        if (!email || !email.includes('@')) {
          errorCount++;
          failed.push({ email: email || 'No email', error: 'Invalid email address' });
          continue;
        }

        setSendStatus(`Generating certificate ${i + 1} of ${totalRows}...`);

        try {
          // Generate certificate
          setSendStatus(`Generating certificate ${i + 1} of ${totalRows}...`);
          const certificateDataUrl = await generateCertificate(currentRowData);
          
          if (!certificateDataUrl) {
            failed.push({ email, error: 'Failed to generate certificate - no data returned' });
            errorCount++;
            continue;
          }
          
          // Prepare email data
          const subject = replaceVariables(emailTemplate.subject, currentRowData);
          const body = replaceVariables(emailTemplate.body, currentRowData);
          
          // Validate email content
          if (!subject || !subject.trim()) {
            failed.push({ email, error: 'Email subject is empty' });
            errorCount++;
            continue;
          }
          
          if (!body || !body.trim()) {
            failed.push({ email, error: 'Email body is empty' });
            errorCount++;
            continue;
          }
          
          const emailData = {
            to: email,
            subject: subject,
            body: body,
            certificateDataUrl: certificateDataUrl
          };

          setSendStatus(`Sending email to ${email}...`);

          // Send email
          const response = await fetch('/api/send-certificate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
          });

          if (response.ok) {
            successCount++;
            successful.push(email);
          } else {
            errorCount++;
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            failed.push({ 
              email, 
              error: errorData.error || `HTTP ${response.status}: ${response.statusText}` 
            });
          }
          
          // Small delay to avoid overwhelming the API
          await new Promise(resolve => setTimeout(resolve, 500));
          
        } catch (error) {
          errorCount++;
          
          if (error instanceof Error) {
            failed.push({ 
              email, 
              error: error.message 
            });
          } else {
            failed.push({ 
              email, 
              error: 'Unknown error during certificate generation or sending'
            });
          }
        }
      }

      setSendResults({ successful, failed });
      setSendStatus(`Complete! Sent ${successCount} certificates, ${errorCount} failed.`);
      setCurrentStep('complete');
      
    } catch (error) {
      setSendStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setSending(false);
    }
  };

  if (currentStep === 'sending') {
    return (
      <div className="rounded-2xl shadow-lg p-8" style={{ background: 'linear-gradient(135deg, #18314f, #0d0630)' }}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#384e77' }}>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#b298dc' }}></div>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Sending Certificates</h3>
          <p className="text-gray-300">{sendStatus}</p>
        </div>
        {/* Hidden canvas for certificate generation */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    );
  }

  if (currentStep === 'complete') {
    return (
      <div className="rounded-2xl shadow-lg p-8" style={{ background: 'linear-gradient(135deg, #18314f, #0d0630)' }}>
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#683abe' }}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Certificates Sent!</h3>
          <p className="text-gray-300">{sendStatus}</p>
        </div>

        {/* Detailed Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Successful Sends */}
          {sendResults.successful.length > 0 && (
            <div className="border rounded-lg p-4" style={{ backgroundColor: '#683abe', borderColor: '#b298dc' }}>
              <h4 className="text-lg font-semibold text-white mb-2">
                ✅ Successfully Sent ({sendResults.successful.length})
              </h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {sendResults.successful.map((email, index) => (
                  <div key={index} className="text-sm text-gray-200">{email}</div>
                ))}
              </div>
            </div>
          )}

          {/* Failed Sends */}
          {sendResults.failed.length > 0 && (
            <div className="border rounded-lg p-4" style={{ backgroundColor: '#384e77', borderColor: '#683abe' }}>
              <h4 className="text-lg font-semibold text-white mb-2">
                ❌ Failed to Send ({sendResults.failed.length})
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {sendResults.failed.map((item, index) => (
                  <div key={index} className="text-sm">
                    <div className="text-red-200 font-medium">{item.email}</div>
                    <div className="text-red-300 text-xs">{item.error}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 text-white rounded-xl font-semibold transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #683abe, #b298dc)' }}
          >
            Start New Project
          </button>
        </div>
        {/* Hidden canvas for certificate generation */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Participants List */}
      <div className="col-span-4 rounded-2xl shadow-lg p-6" style={{ background: 'linear-gradient(135deg, #18314f, #0d0630)' }}>
        <h3 className="text-lg font-semibold mb-4 text-white">Participants Preview</h3>
        <p className="text-sm text-gray-300 mb-4">
          Click on any participant to preview their certificate and email
        </p>
        
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {spreadsheetData.rows.map((row, index) => {
            const name = row[0] || `Participant ${index + 1}`;
            const email = row.find(cell => 
              typeof cell === 'string' && cell.includes('@')
            ) || 'No email';
            
            return (
              <div
                key={index}
                className={`p-3 border rounded-xl cursor-pointer transition-all ${
                  selectedRowIndex === index
                    ? 'border-2 shadow-lg'
                    : 'border hover:border-opacity-70'
                }`}
                style={{
                  borderColor: selectedRowIndex === index ? '#683abe' : '#384e77',
                  backgroundColor: selectedRowIndex === index ? '#384e77' : '#0d0630'
                }}
                onClick={() => setSelectedRowIndex(index)}
              >
                <div className="font-medium text-white">{name}</div>
                <div className="text-sm text-gray-300">{email}</div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-6 border-t" style={{ borderColor: '#384e77' }}>
          <div className="text-sm text-gray-300 space-y-1">
            <div>Total Participants: {spreadsheetData.rows.length}</div>
            <div>Template Elements: {template.elements.length}</div>
          </div>
        </div>
      </div>

      {/* Certificate & Email Preview */}
      <div className="col-span-8 space-y-6">
        {/* Certificate Preview */}
        <div className="rounded-2xl shadow-lg p-6" style={{ background: 'linear-gradient(135deg, #18314f, #0d0630)' }}>
          <h3 className="text-lg font-semibold mb-4 text-white">Certificate Preview</h3>
          
          <div className="relative rounded-lg overflow-hidden" style={{ backgroundColor: '#384e77' }}>
            <div
              className="relative"
              style={{ aspectRatio: '4/3', height: '600px' }}
            >
              {/* Background Image */}
              <img
                src={template.backgroundImage}
                alt="Certificate background"
                className="absolute inset-0 w-full h-full object-contain"
              />
              
              {/* Template Elements */}
              {template.elements.map((element) => (
                <div
                  key={element.id}
                  className="absolute"
                  style={{
                    left: element.x,
                    top: element.y,
                    width: element.width,
                    height: element.height,
                    fontSize: element.fontSize,
                    fontFamily: element.fontFamily,
                    color: element.color,
                  }}
                >
                  {element.isVariable && element.variableName
                    ? rowData[element.variableName] || element.content
                    : element.content}
                </div>
              ))}
            </div>
          </div>
          
          {/* Hidden canvas for certificate generation */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Email Preview */}
        <div className="rounded-2xl shadow-lg p-6" style={{ background: 'linear-gradient(135deg, #18314f, #0d0630)' }}>
          <h3 className="text-lg font-semibold mb-4 text-white">Email Preview</h3>
          
          <div className="rounded-lg p-4 space-y-4" style={{ backgroundColor: '#384e77' }}>
            <div>
              <div className="text-sm font-medium text-gray-300">To:</div>
              <div className="text-white">{previewEmail.to}</div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-gray-300">Subject:</div>
              <div className="text-white">{previewEmail.subject}</div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-gray-300">Message:</div>
              <div className="text-white whitespace-pre-wrap">{previewEmail.body}</div>
            </div>
            
            <div className="border-t pt-4" style={{ borderColor: '#0d0630' }}>
              <div className="text-sm text-gray-300">
                📎 Certificate.pdf (will be attached)
              </div>
            </div>
          </div>
        </div>

        {/* Send Certificates */}
        <div className="rounded-2xl shadow-lg p-6" style={{ background: 'linear-gradient(135deg, #18314f, #0d0630)' }}>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">Ready to Send?</h3>
              <p className="text-gray-300">
                This will send personalized certificates to all {spreadsheetData.rows.length} participants
              </p>
            </div>
            <button
              onClick={sendCertificates}
              disabled={sending}
              className="px-6 py-3 rounded-xl font-semibold transition-all text-white hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                background: sending ? '#384e77' : 'linear-gradient(135deg, #683abe, #b298dc)'
              }}
            >
              Send All Certificates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
