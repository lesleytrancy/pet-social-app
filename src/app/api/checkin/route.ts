import { NextResponse } from 'next/server';
import { mockAppState } from '@/mocks/data';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockAppState.checkIn,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    success: true,
    data: {
      ...mockAppState.checkIn,
      streak: mockAppState.checkIn.streak + 1,
      totalDays: mockAppState.checkIn.totalDays + 1,
      lastCheckIn: new Date().toISOString(),
      history: [
        {
          id: `ci-${Date.now()}`,
          day: `第${mockAppState.checkIn.streak + 1}天`,
          emoji: body.emoji || '😺',
          note: body.note || '今日打卡',
          date: new Date().toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' }),
          petId: mockAppState.pet.id,
        },
        ...mockAppState.checkIn.history,
      ],
    },
    message: '打卡成功',
  });
}
