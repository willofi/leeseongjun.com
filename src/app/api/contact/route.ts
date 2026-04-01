import { siteConfig } from '@/lib/constants';
import { contactFormSchema } from '@/lib/contact-schema';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return NextResponse.json(
      { message: '메일 전송 설정이 아직 완료되지 않았습니다.' },
      { status: 500 },
    );
  }

  const body = await request.json();
  const parsed = contactFormSchema.safeParse(body);

  if (parsed.success && parsed.data.company) {
    return NextResponse.json({ message: 'ok' }, { status: 200 });
  }

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message || '입력값을 확인해 주세요.' },
      { status: 400 },
    );
  }

  const { subject, message } = parsed.data;
  const resend = new Resend(resendApiKey);
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';
  const toEmail = process.env.CONTACT_TO_EMAIL || siteConfig.author.email;

  try {
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `[Blog Contact] ${subject}`,
      text: ['블로그 문의가 도착했습니다.', '', message].join('\n'),
    });

    return NextResponse.json({
      message: '문의가 정상적으로 전송되었습니다.',
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: '메일 전송 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
