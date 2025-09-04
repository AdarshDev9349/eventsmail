'use client';

import { useState } from 'react';

interface EmailTemplate {
  subject: string;
  body: string;
}

interface EmailBuilderProps {
  headers: string[];
  onEmailComplete: (email: EmailTemplate) => void;
  initialEmail: EmailTemplate;
}

export default function EmailBuilder({ headers, onEmailComplete, initialEmail }: EmailBuilderProps) {
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplate>(initialEmail);
  const [showPreview, setShowPreview] = useState(false);

  const insertVariable = (field: string, target: 'subject' | 'body') => {
    const variable = `{${field}}`;
    if (target === 'subject') {
      setEmailTemplate(prev => ({
        ...prev,
        subject: prev.subject + variable
      }));
    } else {
      setEmailTemplate(prev => ({
        ...prev,
        body: prev.body + variable
      }));
    }
  };

  const handleComplete = () => {
    onEmailComplete(emailTemplate);
  };

  const previewEmail = {
    subject: emailTemplate.subject.replace(/{([^}]+)}/g, (match, field) => {
      return `[${field.toUpperCase()}]`;
    }),
    body: emailTemplate.body.replace(/{([^}]+)}/g, (match, field) => {
      return `[${field.toUpperCase()}]`;
    })
  };

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-6 p-2 sm:p-4">
      {/* Variables Sidebar */}
      <div className="lg:col-span-3 rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6 order-2 lg:order-1" style={{ background: 'linear-gradient(135deg, #18314f, #0d0630)' }}>
        <h3 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4 text-white">Available Variables</h3>
        <p className="text-xs lg:text-sm text-gray-300 mb-3 lg:mb-4">
          Click to insert variables into your email template
        </p>
        
        <div className="space-y-2 max-h-40 lg:max-h-none overflow-y-auto">
          {headers.map((header, index) => (
            <div key={index} className="space-y-1">
              <div className="font-medium text-white text-sm lg:text-base">{header}</div>
              <div className="flex space-x-1">
                <button
                  onClick={() => insertVariable(header, 'subject')}
                  className="px-2 py-1 text-xs rounded transition-colors text-white"
                  style={{ backgroundColor: '#683abe' }}
                >
                  + Subject
                </button>
                <button
                  onClick={() => insertVariable(header, 'body')}
                  className="px-2 py-1 text-xs rounded transition-colors text-white"
                  style={{ backgroundColor: '#384e77' }}
                >
                  + Body
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 lg:mt-6 pt-4 lg:pt-6 border-t" style={{ borderColor: '#384e77' }}>
          <h4 className="font-medium text-white mb-2 text-sm lg:text-base">Variable Format</h4>
          <p className="text-xs lg:text-sm text-gray-300">
            Variables are inserted as <code className="px-1 rounded text-white text-xs" style={{ backgroundColor: '#384e77' }}>{`{field_name}`}</code> and will be replaced with actual data when sending emails.
          </p>
        </div>
      </div>

      {/* Email Template Editor */}
      <div className="lg:col-span-9 rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6 order-1 lg:order-2" style={{ background: 'linear-gradient(135deg, #18314f, #0d0630)' }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 lg:mb-6 gap-3">
          <h3 className="text-base lg:text-lg font-semibold text-white">Email Template</h3>
          <div className="flex space-x-2 w-full sm:w-auto">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`flex-1 sm:flex-none px-3 lg:px-4 py-2 rounded-lg font-medium transition-colors text-sm lg:text-base ${
                showPreview
                  ? 'text-white'
                  : 'text-white'
              }`}
              style={{ 
                backgroundColor: showPreview ? '#683abe' : '#384e77'
              }}
            >
              {showPreview ? 'Edit Mode' : 'Preview'}
            </button>
          </div>
        </div>

        {!showPreview ? (
          <div className="space-y-4 lg:space-y-6">
            {/* Email Subject */}
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-300 mb-2">
                Email Subject
              </label>
              <input
                type="text"
                value={emailTemplate.subject}
                onChange={(e) => setEmailTemplate(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Enter email subject (use variables like {name})"
                className="w-full px-3 lg:px-4 py-2 lg:py-3 border rounded-lg text-white placeholder-gray-400 text-sm lg:text-base"
                style={{ 
                  borderColor: '#384e77', 
                  backgroundColor: '#0d0630'
                }}
              />
            </div>

            {/* Email Body */}
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-300 mb-2">
                Email Body
              </label>
              <textarea
                value={emailTemplate.body}
                onChange={(e) => setEmailTemplate(prev => ({ ...prev, body: e.target.value }))}
                placeholder="Write your email message here. Use variables like {name} to personalize the content."
                rows={window.innerWidth < 1024 ? 8 : 12}
                className="w-full px-3 lg:px-4 py-2 lg:py-3 border rounded-lg text-white placeholder-gray-400 text-sm lg:text-base"
                style={{ 
                  borderColor: '#384e77', 
                  backgroundColor: '#0d0630'
                }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 gap-3">
              <div className="text-xs lg:text-sm text-gray-300">
                Email will be sent with the certificate attached as PDF
              </div>
              <button
                onClick={handleComplete}
                disabled={!emailTemplate.subject.trim() || !emailTemplate.body.trim()}
                className={`w-full sm:w-auto px-4 lg:px-6 py-2 lg:py-3 rounded-lg lg:rounded-xl font-semibold transition-all text-sm lg:text-base ${
                  emailTemplate.subject.trim() && emailTemplate.body.trim()
                    ? 'text-white hover:scale-105'
                    : 'text-gray-500 cursor-not-allowed'
                }`}
                style={{ 
                  background: emailTemplate.subject.trim() && emailTemplate.body.trim()
                    ? 'linear-gradient(135deg, #683abe, #b298dc)'
                    : '#384e77'
                }}
              >
                Continue to Preview & Send
              </button>
            </div>
          </div>
        ) : (
          /* Preview Mode */
          <div className="space-y-4 lg:space-y-6">
            <div className="rounded-xl p-4 lg:p-6" style={{ backgroundColor: '#384e77' }}>
              <h4 className="font-medium text-white mb-3 lg:mb-4 text-sm lg:text-base">Email Preview</h4>
              
              <div className="rounded-lg border p-3 lg:p-4 space-y-3 lg:space-y-4" style={{ backgroundColor: '#0d0630', borderColor: '#683abe' }}>
                <div>
                  <div className="text-xs lg:text-sm font-medium text-gray-300">Subject:</div>
                  <div className="text-white text-sm lg:text-base">{previewEmail.subject || 'No subject'}</div>
                </div>
                
                <div>
                  <div className="text-xs lg:text-sm font-medium text-gray-300">Body:</div>
                  <div className="text-white whitespace-pre-wrap text-sm lg:text-base">
                    {previewEmail.body || 'No message body'}
                  </div>
                </div>
                
                <div className="border-t pt-3 lg:pt-4" style={{ borderColor: '#384e77' }}>
                  <div className="text-xs lg:text-sm text-gray-300">
                    📎 Certificate.pdf (attachment)
                  </div>
                </div>
              </div>
              
              <div className="mt-3 lg:mt-4 p-3 rounded-lg" style={{ backgroundColor: '#683abe' }}>
                <p className="text-xs lg:text-sm text-white">
                  <strong>Note:</strong> Variables shown as [FIELD_NAME] will be replaced with actual data from your spreadsheet when sending.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
