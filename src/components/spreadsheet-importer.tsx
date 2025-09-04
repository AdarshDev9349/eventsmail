'use client';

import { useState, useEffect } from 'react';

interface SpreadsheetData {
  headers: string[];
  rows: any[][];
  fileName: string;
}

interface SpreadsheetImporterProps {
  onDataImported: (data: SpreadsheetData) => void;
}

interface Spreadsheet {
  id: string;
  name: string;
  createdTime: string;
  modifiedTime: string;
  webViewLink: string;
}

export default function SpreadsheetImporter({ onDataImported }: SpreadsheetImporterProps) {
  const [spreadsheets, setSpreadsheets] = useState<Spreadsheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpreadsheet, setSelectedSpreadsheet] = useState<string>('');
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSpreadsheets();
  }, []);

  const fetchSpreadsheets = async () => {
    try {
      const response = await fetch('/api/sheets?action=list');
      const result = await response.json();
      
      if (result.success) {
        setSpreadsheets(result.data.files || []);
      } else {
        setError(result.error || 'Failed to fetch spreadsheets');
      }
    } catch (err) {
      setError('Failed to load spreadsheets');
      console.error('Error fetching spreadsheets:', err);
    } finally {
      setLoading(false);
    }
  };

  const importSpreadsheet = async () => {
    if (!selectedSpreadsheet) return;
    
    setImporting(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/sheets?id=${selectedSpreadsheet}&range=A1:ZZ1000`);
      const result = await response.json();
      
      if (result.success && result.data.values) {
        const [headers, ...rows] = result.data.values;
        const selectedSheet = spreadsheets.find(s => s.id === selectedSpreadsheet);
        
        onDataImported({
          headers: headers || [],
          rows: rows || [],
          fileName: selectedSheet?.name || 'Unknown Sheet'
        });
      } else {
        setError('Failed to import spreadsheet data');
      }
    } catch (err) {
      setError('Error importing spreadsheet');
      console.error('Import error:', err);
    } finally {
      setImporting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="rounded-2xl shadow-lg p-8" style={{ background: 'linear-gradient(135deg, #18314f, #0d0630)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: '#b298dc' }}></div>
          <p className="mt-4 text-gray-300">Loading your spreadsheets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl shadow-lg p-8" style={{ background: 'linear-gradient(135deg, #18314f, #0d0630)' }}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#683abe' }}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Error Loading Spreadsheets</h3>
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchSpreadsheets}
            className="px-4 py-2 rounded-lg transition-colors font-semibold"
            style={{ background: 'linear-gradient(135deg, #683abe, #b298dc)', color: 'white' }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8" style={{ background: 'linear-gradient(135deg, #18314f, #0d0630)' }}>
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Import Spreadsheet Data</h2>
        <p className="text-sm sm:text-base text-gray-300">
          Select a Google Spreadsheet containing participant data (names, emails, etc.)
        </p>
      </div>

      {spreadsheets.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#384e77' }}>
            <svg className="w-8 h-8" style={{ color: '#b298dc' }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.44 3H4.56A1.56 1.56 0 0 0 3 4.56v14.88A1.56 1.56 0 0 0 4.56 21h14.88A1.56 1.56 0 0 0 21 19.44V4.56A1.56 1.56 0 0 0 19.44 3zM11 17H6v-2h5v2zm0-3H6v-2h5v2zm0-3H6V9h5v2zm7 6h-5v-2h5v2zm0-3h-5v-2h5v2zm0-3h-5V9h5v2z"/>
            </svg>
          </div>
          <p className="text-gray-300 mb-2">No spreadsheets found</p>
          <p className="text-sm text-gray-400">Create a spreadsheet in Google Sheets to get started</p>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {/* Sticky Continue Button - Fixed at top for better UX */}
          {selectedSpreadsheet && (
            <div className="sticky top-2 sm:top-4 z-10 flex justify-center mb-4 sm:mb-6">
              <button
                onClick={importSpreadsheet}
                disabled={importing}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base"
                style={{ background: 'linear-gradient(135deg, #683abe, #b298dc)', color: 'white' }}
              >
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {importing ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span className="relative">Importing Data...</span>
                  </div>
                ) : (
                  <span className="relative">Continue with Selected Sheet →</span>
                )}
              </button>
            </div>
          )}

          {/* Spreadsheet List Container with proper scrolling */}
          <div 
            className="relative rounded-xl p-3 sm:p-4 max-h-80 sm:max-h-96 overflow-y-auto"
            style={{ 
              backgroundColor: 'rgba(13, 6, 48, 0.3)',
              borderColor: '#384e77',
              border: '1px solid'
            }}
          >
            <div className="grid gap-3 sm:gap-4">
              {spreadsheets.map((sheet) => (
                <div
                  key={sheet.id}
                  className={`border rounded-lg sm:rounded-xl p-3 sm:p-4 cursor-pointer transition-all ${
                    selectedSpreadsheet === sheet.id
                      ? 'border-2 shadow-lg'
                      : 'border hover:border-opacity-70'
                  }`}
                  style={{
                    borderColor: selectedSpreadsheet === sheet.id ? '#683abe' : '#384e77',
                    backgroundColor: selectedSpreadsheet === sheet.id ? '#384e77' : '#18314f'
                  }}
                  onClick={() => setSelectedSpreadsheet(sheet.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        selectedSpreadsheet === sheet.id
                          ? 'border-2'
                          : 'border-gray-400'
                      }`}
                      style={{
                        borderColor: selectedSpreadsheet === sheet.id ? '#b298dc' : '#384e77',
                        backgroundColor: selectedSpreadsheet === sheet.id ? '#b298dc' : 'transparent'
                      }}>
                        {selectedSpreadsheet === sheet.id && (
                          <svg className="w-2 h-2 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-white text-sm sm:text-base truncate">{sheet.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-300 truncate">
                          Modified: {formatDate(sheet.modifiedTime)}
                        </p>
                      </div>
                    </div>
                    <a
                      href={sheet.webViewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-lg transition-colors flex-shrink-0 ml-2"
                      style={{ color: '#b298dc', backgroundColor: '#0d0630' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      View →
                    </a>
                  </div>
                </div>
              ))}
            </div>            {/* Scroll fade indicator */}
            {spreadsheets.length > 4 && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none rounded-b-xl"
                style={{ 
                  background: 'linear-gradient(to top, rgba(13, 6, 48, 0.8), transparent)'
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
