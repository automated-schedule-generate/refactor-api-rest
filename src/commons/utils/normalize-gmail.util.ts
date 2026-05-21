export function normalizeGmail(email: string): {
  is_gmail: boolean;
  normalized_email: string;
} {
  const lower = email.trim().toLowerCase();
  const [local, domain] = lower.split('@');

  if (!domain || !local) {
    throw new Error('Invalid email address');
  }

  if (!domain.includes('gmail')) {
    return { is_gmail: false, normalized_email: lower };
  }

  const cleanLocal = local.replace(/\./g, '');

  return {
    is_gmail: true,
    normalized_email: `${cleanLocal}@${domain}`,
  };
}
