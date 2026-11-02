'use client';

import React, { useState } from 'react';
import { X, RefreshCw } from 'lucide-react';
import { Customer } from './../../../src/types';

interface RenewModalProps {
  customer: Customer;
  isOpen: boolean;
  onClose: () => void;
}

export default function RenewModal({
  customer,
  isOpen,
  onClose,
}: RenewModalProps) {
  const [duration, setDuration] = useState<3 | 6 | 12>(3);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xl w-full max-w-md p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Renew Subscription
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Extend subscription for {customer.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Duration Selector */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-600">
            Select renewal duration
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {([3, 6, 12] as const).map((months) => (
              <button
                key={months}
                type="button"
                onClick={() => setDuration(months)}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                  duration === months
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {months} mo
              </button>
            ))}
          </div>
        </div>

        {/* New Expiry Preview */}
        <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3.5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-indigo-500">
              New expiration date
            </p>
            <p className="text-sm font-bold text-indigo-700 mt-0.5">
              {duration === 3
                ? 'Jan 8, 2027'
                : duration === 6
                ? 'Apr 8, 2027'
                : 'Oct 8, 2027'}
            </p>
          </div>
          <span className="text-[11px] font-medium text-indigo-400 bg-white px-2.5 py-1 rounded-md">
            +{duration} months
          </span>
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
            <RefreshCw className="w-3.5 h-3.5" />
            Confirm Renewal
          </button>
        </div>
      </div>
    </div>
  );
}