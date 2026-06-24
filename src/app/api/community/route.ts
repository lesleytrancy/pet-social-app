import { NextResponse } from 'next/server';
import { mockAppState } from '@/mocks/data';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockAppState.community,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (body.action === 'like') {
    return NextResponse.json({
      success: true,
      data: { liked: true },
      message: '点赞成功',
    });
  }

  if (body.action === 'comment') {
    return NextResponse.json({
      success: true,
      data: { commentId: `c-${Date.now()}` },
      message: '评论成功',
    });
  }

  return NextResponse.json({
    success: true,
    data: body,
    message: '操作成功',
  });
}
