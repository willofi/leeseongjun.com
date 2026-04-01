'use client';

import { toast } from 'sonner';

export default function ContactEmailCopy({ email }: { email: string }) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      toast.success('이메일이 복사되었습니다.');
    } catch {
      toast.error('이메일 복사에 실패했습니다.');
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="mt-1 inline-flex text-sm font-medium text-stone-950 underline underline-offset-4 dark:text-stone-50"
    >
      {email}
    </button>
  );
}
