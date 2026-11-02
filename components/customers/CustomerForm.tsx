'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { User, Phone, Mail, Calendar, Check } from 'lucide-react';
import { Customer } from '../../src/types';

interface CustomerFormProps {
  initialData?: Customer;
  onSuccess?: () => void;
  isModal?: boolean;
}

export default function CustomerForm({
  initialData,
  onSuccess,
  isModal = false,
}: CustomerFormProps) {
  const router = useRouter();

  const [fullName, setFullName] = useState(initialData?.name || 'Sarah Khan');
  const [phone, setPhone] = useState(initialData?.phone || '+1 555 019 2210');
  const [email, setEmail] = useState(initialData?.email || 'sarah@email.com');
  const [startDate, setStartDate] = useState('2026-10-05');
  const [duration, setDuration] = useState<3 | 6 | 12>(
    initialData?.durationMonths || 3
  );

  // Helper function to parse 'YYYY-MM-DD' safely without timezone shift
  const parseDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, (month || 1) - 1, day || 1);
  };

  const getExpiryDateObj = (baseDateStr: string, monthsToAdd: number) => {
    if (!baseDateStr) return null;
    const date = parseDate(baseDateStr);
    if (isNaN(date.getTime())) return null;
    date.setMonth(date.getMonth() + monthsToAdd);
    return date;
  };

  const formatShortDate = (date: Date | null) => {
    if (!date) return '—';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Start Date (Formatted as "Oct 5, 2026" for right summary card)
  const formattedStartShort = useMemo(() => {
    if (!startDate) return '—';
    return formatShortDate(parseDate(startDate));
  }, [startDate]);

  // Expiration Date ("Jan 5, 2027")
  const calculatedExpiry = useMemo(() => {
    return formatShortDate(getExpiryDateObj(startDate, duration));
  }, [startDate, duration]);

  // Days Difference ("92 days left")
  const daysLeft = useMemo(() => {
    if (!startDate) return 0;
    const start = parseDate(startDate);
    const end = getExpiryDateObj(startDate, duration);
    if (!end) return 0;
    const diff = Math.round(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff > 0 ? diff : 0;
  }, [startDate, duration]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSuccess) {
      onSuccess();
    } else {
      router.push('/customers');
    }
  };

  return (
    <div
      className={
        isModal
          ? ''
          : 'grid grid-cols-1 lg:grid-cols-3 gap-6 items-start'
      }
    >
      {/* Left Column: Form Card */}
      <form
        onSubmit={handleSubmit}
        className={`${
          isModal
            ? 'space-y-4'
            : 'lg:col-span-2 bg-white sm:p-7 sm:rounded-2xl sm:border sm:border-slate-200/80 sm:shadow-2xs'
        } space-y-5`}
      >
        {/* Desktop Section Heading */}
        <h2 className="hidden sm:block text-sm font-bold text-slate-900">
          Customer information
        </h2>

        {/* Full Name & Phone Number (2 cols on Desktop, 1 col on Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700">
              Full name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Sarah Khan"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-700">
              Phone number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555 019 2210"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition"
                required
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-700">Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sarah@email.com"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition"
              required
            />
          </div>
        </div>

        {/* Divider (Desktop Only) */}
        <hr className="hidden sm:block border-slate-100 my-6" />

        {/* Desktop Section Heading */}
        <h2 className="hidden sm:block text-sm font-bold text-slate-900">
          Subscription
        </h2>

        {/* Subscription Start Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-700">
            Subscription start date
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition"
              required
            />
          </div>
        </div>

        {/* Subscription Duration */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-700">
            Subscription duration
          </label>
          <div className="grid grid-cols-3 gap-3">
            {([3, 6, 12] as const).map((months) => {
              const isSelected = duration === months;
              const optionExpiry = formatShortDate(
                getExpiryDateObj(startDate, months)
              );

              return (
                <button
                  key={months}
                  type="button"
                  onClick={() => setDuration(months)}
                  className={`py-2.5 px-3 sm:p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-center sm:justify-start gap-2.5 ${
                    isSelected
                      ? 'bg-[#EEF2FF]/70 border-[#4F46E5] text-[#4F46E5]'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {/* Mobile Label: "3 mo" */}
                  <span className="sm:hidden text-xs font-semibold">
                    {months} mo
                  </span>

                  {/* Desktop Radio + Label + End Date */}
                  <div className="hidden sm:flex items-center gap-2.5 text-left">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center border shrink-0 ${
                        isSelected
                          ? 'border-[#4F46E5] bg-[#EEF2FF]'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-[#4F46E5]" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        {months} months
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Ends {optionExpiry}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile-Only Auto-calculated Expiration Box */}
        <div className="lg:hidden bg-[#EEF2FF]/80 rounded-xl p-3.5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-[#4F46E5]">
              Expiration date
            </p>
            <p className="text-base font-bold text-[#3730A3] mt-0.5">
              {calculatedExpiry}
            </p>
          </div>
          <span className="text-[11px] text-slate-400">Auto-calculated</span>
        </div>

        {/* Submit / Cancel Buttons */}
        <div className="pt-3 sm:pt-2 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={() => router.push('/customers')}
            className="hidden sm:inline-flex px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-semibold rounded-xl text-xs sm:text-xs flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
          >
            <Check className="w-4 h-4" />
            {initialData ? 'Save Changes' : 'Add Customer'}
          </button>
        </div>
      </form>

      {/* Right Column: Desktop Subscription Summary Card */}
      {!isModal && (
        <div className="hidden lg:block bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            Subscription summary
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Start date</span>
              <span className="font-semibold text-slate-800">
                {formattedStartShort}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Duration</span>
              <span className="font-semibold text-slate-800">
                {duration} months
              </span>
            </div>
          </div>

          <div className="bg-[#EEF2FF]/80 rounded-xl p-4 space-y-1">
            <p className="text-[11px] font-medium text-[#4F46E5]">
              Expiration date
            </p>
            <p className="text-xl font-bold text-[#3730A3]">
              {calculatedExpiry}
            </p>
            <p className="text-[11px] text-slate-400 pt-0.5">
              Calculated automatically
            </p>
          </div>

          <div className="pt-1 flex items-center justify-between text-xs">
            <span className="text-slate-400">Status after saving</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#DCFCE7] text-[#15803D]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
              Active · {daysLeft} days left
            </span>
          </div>
        </div>
      )}
    </div>
  );
}