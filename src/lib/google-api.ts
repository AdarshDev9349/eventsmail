import { auth } from "@/auth";

/**
 * Get the user's access token for Google API calls
 */
export async function getGoogleAccessToken(): Promise<string | null> {
  const session = await auth();
  return session?.accessToken || null;
}

/**
 * Make authenticated requests to Google APIs
 */
export async function googleApiRequest(url: string, options: RequestInit = {}) {
  const accessToken = await getGoogleAccessToken();
  
  if (!accessToken) {
    throw new Error('No access token available. User must be authenticated.');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Gmail API helpers
 */
export const gmailApi = {
  // Send an email
  async sendEmail(to: string, subject: string, body: string) {
    const email = [
      'Content-Type: text/plain; charset="UTF-8"',
      'MIME-Version: 1.0',
      `To: ${to}`,
      `Subject: ${subject}`,
      '',
      body,
    ].join('\n');

    const encodedEmail = btoa(email).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    return googleApiRequest('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      body: JSON.stringify({
        raw: encodedEmail,
      }),
    });
  },

  // Get user's email messages
  async getMessages(maxResults: number = 10) {
    return googleApiRequest(`https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}`);
  },

  // Get a specific message
  async getMessage(messageId: string) {
    return googleApiRequest(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`);
  },
};

/**
 * Google Sheets API helpers
 */
export const sheetsApi = {
  // List all spreadsheets from Google Drive (requires Drive API)
  async listSpreadsheets() {
    return googleApiRequest("https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.spreadsheet'&fields=files(id,name,createdTime,modifiedTime,webViewLink)");
  },

  // Alternative: List spreadsheets using a different approach (fallback)
  async listSpreadsheetsAlternative() {
    // This is a fallback that creates a demo spreadsheet list
    // In a real scenario, you'd need to maintain your own list of spreadsheet IDs
    // or use the Google Drive API (which requires enabling it in Google Console)
    throw new Error("Google Drive API not enabled. Please enable it in Google Cloud Console or use the manual spreadsheet management approach.");
  },

  // Create a new spreadsheet
  async createSpreadsheet(title: string) {
    return googleApiRequest('https://sheets.googleapis.com/v4/spreadsheets', {
      method: 'POST',
      body: JSON.stringify({
        properties: {
          title,
        },
      }),
    });
  },

  // Get spreadsheet data
  async getSpreadsheet(spreadsheetId: string, range: string = 'A1:Z1000') {
    return googleApiRequest(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`);
  },

  // Update spreadsheet data
  async updateSpreadsheet(spreadsheetId: string, range: string, values: any[][]) {
    return googleApiRequest(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`, {
      method: 'PUT',
      body: JSON.stringify({
        values,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  // Append data to spreadsheet
  async appendToSpreadsheet(spreadsheetId: string, range: string, values: any[][]) {
    return googleApiRequest(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=RAW`, {
      method: 'POST',
      body: JSON.stringify({
        values,
      }),
    });
  },
};
