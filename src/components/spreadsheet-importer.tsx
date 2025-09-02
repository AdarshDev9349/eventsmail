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
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your spreadsheets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Spreadsheets</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchSpreadsheets}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Import Spreadsheet Data</h2>
        <p className="text-gray-600">
          Select a Google Spreadsheet containing participant data (names, emails, etc.)
        </p>
      </div>

      {spreadsheets.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.44 3H4.56A1.56 1.56 0 0 0 3 4.56v14.88A1.56 1.56 0 0 0 4.56 21h14.88A1.56 1.56 0 0 0 21 19.44V4.56A1.56 1.56 0 0 0 19.44 3zM11 17H6v-2h5v2zm0-3H6v-2h5v2zm0-3H6V9h5v2zm7 6h-5v-2h5v2zm0-3h-5v-2h5v2zm0-3h-5V9h5v2z"/>
            </svg>
          </div>
          <p className="text-gray-500 mb-2">No spreadsheets found</p>
          <p className="text-sm text-gray-400">Create a spreadsheet in Google Sheets to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid gap-4">
            {spreadsheets.map((sheet) => (
              <div
                key={sheet.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedSpreadsheet === sheet.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedSpreadsheet(sheet.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedSpreadsheet === sheet.id
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedSpreadsheet === sheet.id && (
                        <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{sheet.name}</h3>
                      <p className="text-sm text-gray-500">
                        Modified: {formatDate(sheet.modifiedTime)}
                      </p>
                    </div>
                  </div>
                  <a
                    href={sheet.webViewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-6">
            <button
              onClick={importSpreadsheet}
              disabled={!selectedSpreadsheet || importing}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                selectedSpreadsheet && !importing
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {importing ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Importing...</span>
                </div>
              ) : (
                'Import Selected Spreadsheet'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
