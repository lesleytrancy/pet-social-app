import { NextResponse } from 'next/server';
import { mockAdminStats } from '@/mocks/data';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockAdminStats,
  });
}
