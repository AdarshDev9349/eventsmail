import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { sheetsApi } from '@/lib/google-api';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.accessToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const spreadsheetId = searchParams.get('id');
    const range = searchParams.get('range') || 'A1:Z1000';

    if (action === 'list') {
      const data = await sheetsApi.listSpreadsheets();
      return NextResponse.json({
        success: true,
        data,
      });
    }

    if (!spreadsheetId) {
      return NextResponse.json(
        { error: 'Missing spreadsheet ID' },
        { status: 400 }
      );
    }

    // Get spreadsheet data
    const data = await sheetsApi.getSpreadsheet(spreadsheetId, range);
    
    return NextResponse.json({
      success: true,
      data,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch spreadsheet data' },
      { status: 500 }
    );
  }
}
