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
      // List all spreadsheets
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
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch spreadsheet data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.accessToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { title, spreadsheetId, range, values, action = 'create' } = await request.json();

    let result;

    switch (action) {
      case 'create':
        if (!title) {
          return NextResponse.json(
            { error: 'Missing title for new spreadsheet' },
            { status: 400 }
          );
        }
        result = await sheetsApi.createSpreadsheet(title);
        break;

      case 'update':
        if (!spreadsheetId || !range || !values) {
          return NextResponse.json(
            { error: 'Missing required fields for update: spreadsheetId, range, values' },
            { status: 400 }
          );
        }
        result = await sheetsApi.updateSpreadsheet(spreadsheetId, range, values);
        break;

      case 'append':
        if (!spreadsheetId || !range || !values) {
          return NextResponse.json(
            { error: 'Missing required fields for append: spreadsheetId, range, values' },
            { status: 400 }
          );
        }
        result = await sheetsApi.appendToSpreadsheet(spreadsheetId, range, values);
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: create, update, or append' },
          { status: 400 }
        );
    }
    
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to perform sheets operation' },
      { status: 500 }
    );
  }
}
