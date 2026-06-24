import { NextResponse } from 'next/server';
import { mockAdminPets } from '@/mocks/data';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockAdminPets,
  });
}
