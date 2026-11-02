'use client';

import React, { useState } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { Customer } from './../../../src/types';

interface ReminderModalProps {
  customer: Customer;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReminderModal({
  customer,
  isOpen,
  onClose,
}: ReminderModalProps) {
  const defaultMessage = `Hi ${customer.name}, your GTV subscription is expiring on ${customer.expiresDate}. Please reply to renew your plan without interruption!`;
  const [message, setMessage] = useState(defaultMessage);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl w-full max-w-md p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Send Reminder
              </h3>
              <p className="text-xs text-slate-400">{customer.phone}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Preview Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-600">
            Reminder message
          </label>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white shadow-xs transition cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            Send Reminder
          </button>
        </div>
      </div>
    </div>
  );
}