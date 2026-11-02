'use client';

import React from 'react';
import { Send } from 'lucide-react';
import { mockCustomers } from '../../../src/data/mockCustomers';
import StatusBadge from '@/components/customers/StatusBadge';

export default function RemindersPage() {
  const reminderList = mockCustomers.filter((c) => c.status !== 'active');

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Reminders
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Send quick payment and renewal notifications to customers
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100">
        {reminderList.map((customer) => (
          <div
            key={customer.id}
            className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 font-bold text-xs flex items-center justify-center shrink-0">
                {customer.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {customer.name}
                </p>
                <p className="text-xs text-slate-400">{customer.phone}</p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4">
              <StatusBadge status={customer.status} text={customer.daysText} />
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Send Reminder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}