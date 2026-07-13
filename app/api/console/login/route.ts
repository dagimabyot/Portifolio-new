import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Admin credentials
const ADMIN_USERNAME = 'dagidev';
const ADMIN_PASSWORD = 'Dagim123$';

function hashPassword(password: string): string {
  return crypto
    .createHash('sha256')
    .update(password)
    .digest('hex');
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validate credentials
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Generate session token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days

    // In production, store this in a database
    // For now, we'll use a simple in-memory approach with middleware validation
    
    return NextResponse.json(
      {
        token,
        expiresAt,
        message: 'Login successful',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
