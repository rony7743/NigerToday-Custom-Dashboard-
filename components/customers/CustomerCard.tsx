import React from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { Customer } from '../../src/types';
import StatusBadge from './StatusBadge';

interface CustomerCardProps {
  customer: Customer;
  showChatIcon?: boolean;
}

export default function CustomerCard({
  customer,
  showChatIcon = false,
}: CustomerCardProps) {
  return (
    <Link
      href={`/customers/${customer.id}`}
      className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-slate-100 shadow-xs hover:border-indigo-200 transition"
    >
      <div className="flex items-center gap-3">
        {/* Initials Avatar */}
        <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 font-bold text-xs flex items-center justify-center shrink-0">
          {customer.initials}
        </div>

        {/* Name & Info */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900 leading-tight">
            {customer.name}
          </h4>
          <div className="mt-1 flex items-center gap-2">
            {showChatIcon ? (
              <StatusBadge status={customer.status} text={customer.daysText} />
            ) : (
              <span className="text-xs text-slate-400">
                Expires {customer.expiresDate}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right Side Status or Chat Button */}
      <div>
        {showChatIcon ? (
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition">
            <MessageCircle className="w-4 h-4" />
          </div>
        ) : (
          <StatusBadge status={customer.status} text={customer.daysText} />
        )}
      </div>
    </Link>
  );
}