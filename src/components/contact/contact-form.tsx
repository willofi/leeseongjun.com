'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { contactFormSchema } from '@/lib/contact-schema';
import { FormEvent, useState } from 'react';

type Status =
  | { type: 'idle'; message: string }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string };

type ContactPayload = {
  subject: string;
  message: string;
  company: string;
};

const initialStatus: Status = {
  type: 'idle',
  message: '문의 내용을 남겨주시면 메일로 바로 전달됩니다.',
};

const statusTextColorClassName: Record<Status['type'], string> = {
  idle: 'text-sm text-stone-500 dark:text-stone-400',
  success: 'text-sm text-emerald-600 dark:text-emerald-400',
  error: 'text-sm text-red-600 dark:text-red-400',
};

function getPayloadFromForm(form: HTMLFormElement): ContactPayload {
  const formData = new FormData(form);

  return {
    subject: String(formData.get('subject') || '').trim(),
    message: String(formData.get('message') || '').trim(),
    company: String(formData.get('company') || '').trim(),
  };
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>(initialStatus);
  const [fieldError, setFieldError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const payload = getPayloadFromForm(form);

    const parsed = contactFormSchema.safeParse(payload);

    if (!parsed.success) {
      setFieldError(
        parsed.error.issues[0]?.message || '입력값을 확인해 주세요.',
      );
      return;
    }

    setIsSubmitting(true);
    setStatus(initialStatus);
    setFieldError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || '문의 전송에 실패했습니다.');
      }

      form.reset();
      setStatus({
        type: 'success',
        message: result.message || '문의가 정상적으로 전송되었습니다.',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : '문의 전송 중 오류가 발생했습니다.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
      <div className="hidden">
        <Label htmlFor="company">Company</Label>
        <Input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">제목</Label>
        <Input
          id="subject"
          name="subject"
          required
          placeholder="문의 제목을 입력해 주세요"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">문의 내용</Label>
        <Textarea
          id="message"
          name="message"
          required
          className="min-h-36"
          placeholder="문의 내용을 자세히 남겨주세요"
        />
      </div>

      {fieldError ? (
        <p className="text-sm text-red-600 dark:text-red-400">{fieldError}</p>
      ) : null}

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className={statusTextColorClassName[status.type]}>
          {status.message}
        </p>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '보내는 중...' : '문의 보내기'}
        </Button>
      </div>
    </form>
  );
}
