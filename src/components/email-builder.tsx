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
    <div className="grid grid-cols-12 gap-6">
      {/* Variables Sidebar */}
      <div className="col-span-3 rounded-2xl shadow-lg p-6" style={{ background: 'linear-gradient(135deg, #18314f, #0d0630)' }}>
        <h3 className="text-lg font-semibold mb-4 text-white">Available Variables</h3>
        <p className="text-sm text-gray-300 mb-4">
          Click to insert variables into your email template
        </p>
        
        <div className="space-y-2">
          {headers.map((header, index) => (
            <div key={index} className="space-y-1">
              <div className="font-medium text-white">{header}</div>
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

        <div className="mt-6 pt-6 border-t" style={{ borderColor: '#384e77' }}>
          <h4 className="font-medium text-white mb-2">Variable Format</h4>
          <p className="text-sm text-gray-300">
            Variables are inserted as <code className="px-1 rounded text-white" style={{ backgroundColor: '#384e77' }}>{`{field_name}`}</code> and will be replaced with actual data when sending emails.
          </p>
        </div>
      </div>

      {/* Email Template Editor */}
      <div className="col-span-9 rounded-2xl shadow-lg p-6" style={{ background: 'linear-gradient(135deg, #18314f, #0d0630)' }}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Email Template</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
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
          <div className="space-y-6">
            {/* Email Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Subject
              </label>
              <input
                type="text"
                value={emailTemplate.subject}
                onChange={(e) => setEmailTemplate(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Enter email subject (use variables like {name})"
                className="w-full px-4 py-3 border rounded-lg text-white placeholder-gray-400"
                style={{ 
                  borderColor: '#384e77', 
                  backgroundColor: '#0d0630'
                }}
              />
            </div>

            {/* Email Body */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Body
              </label>
              <textarea
                value={emailTemplate.body}
                onChange={(e) => setEmailTemplate(prev => ({ ...prev, body: e.target.value }))}
                placeholder="Write your email message here. Use variables like {name} to personalize the content."
                rows={12}
                className="w-full px-4 py-3 border rounded-lg text-white placeholder-gray-400"
                style={{ 
                  borderColor: '#384e77', 
                  backgroundColor: '#0d0630'
                }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-4">
              <div className="text-sm text-gray-300">
                Email will be sent with the certificate attached as PDF
              </div>
              <button
                onClick={handleComplete}
                disabled={!emailTemplate.subject.trim() || !emailTemplate.body.trim()}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
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
          <div className="space-y-6">
            <div className="rounded-xl p-6" style={{ backgroundColor: '#384e77' }}>
              <h4 className="font-medium text-white mb-4">Email Preview</h4>
              
              <div className="rounded-lg border p-4 space-y-4" style={{ backgroundColor: '#0d0630', borderColor: '#683abe' }}>
                <div>
                  <div className="text-sm font-medium text-gray-300">Subject:</div>
                  <div className="text-white">{previewEmail.subject || 'No subject'}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-300">Body:</div>
                  <div className="text-white whitespace-pre-wrap">
                    {previewEmail.body || 'No message body'}
                  </div>
                </div>
                
                <div className="border-t pt-4" style={{ borderColor: '#384e77' }}>
                  <div className="text-sm text-gray-300">
                    📎 Certificate.pdf (attachment)
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: '#683abe' }}>
                <p className="text-sm text-white">
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
