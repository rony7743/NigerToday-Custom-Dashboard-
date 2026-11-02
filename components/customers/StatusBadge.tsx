import React from 'react';
import { SubscriptionStatus } from './../../src/types';

interface StatusBadgeProps {
  status: SubscriptionStatus;
  text: string;
}

export default function StatusBadge({ status, text }: StatusBadgeProps) {
  const styles = {
    expired: {
      bg: 'bg-red-50 text-red-600 border-red-100',
      dot: 'bg-red-500',
    },
    expiring: {
      bg: 'bg-amber-50 text-amber-700 border-amber-100',
      dot: 'bg-amber-500',
    },
    active: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      dot: 'bg-emerald-500',
    },
  }[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles.bg}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
      {text}
    </span>
  );
}