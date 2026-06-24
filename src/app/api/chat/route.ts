import { NextResponse } from 'next/server';
import { mockAIReplies } from '@/mocks/data';

export async function POST(request: Request) {
  const body = await request.json();
  const { message, petName } = body;

  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Generate mock AI reply
  const template = mockAIReplies[Math.floor(Math.random() * mockAIReplies.length)];
  const reply = template.replace('{name}', petName || '宠物');

  return NextResponse.json({
    success: true,
    data: {
      reply,
      emotion: ['happy', 'excited', 'curious'][Math.floor(Math.random() * 3)],
      timestamp: new Date().toISOString(),
    },
    message: 'AI回复生成成功',
  });
}
