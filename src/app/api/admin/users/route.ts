import { NextResponse } from 'next/server';
import { mockAdminUsers } from '@/mocks/data';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockAdminUsers,
  });
}
