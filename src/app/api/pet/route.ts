import { NextResponse } from 'next/server';
import { mockAppState } from '@/mocks/data';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockAppState.pet,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    success: true,
    data: { ...mockAppState.pet, ...body },
    message: '宠物信息更新成功',
  });
}
