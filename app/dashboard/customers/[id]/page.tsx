'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  RefreshCw,
  MessageCircle,
  Pencil,
  Trash2,
  X,
  Phone,
  Mail,
  Copy,
  CheckCircle2,
} from 'lucide-react';
import { mockCustomers } from '../../../../src/data/mockCustomers';
import StatusBadge from '@/components/customers/StatusBadge';
import CustomerForm from '@/components/customers/CustomerForm';
import RenewModal from '@/components/customers/modals/RenewModal';
import ReminderModal from '@/components/customers/modals/ReminderModal';
import DeleteModal from '@/components/customers/modals/DeleteModal';

export default function CustomerDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const customerId = params?.id as string;

  const customer =
    mockCustomers.find((c) => c.id === customerId) || mockCustomers[1];

  const [modalType, setModalType] = useState<
    'renew' | 'remind' | 'edit' | 'delete' | null
  >(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const progressPercent =
    customer.status === 'expired'
      ? 100
      : customer.status === 'expiring'
      ? 82
      : 35;

  const progressColor =
    customer.status === 'expired'
      ? 'bg-red-500'
      : customer.status === 'expiring'
      ? 'bg-amber-500'
      : 'bg-emerald-500';

  const textColor =
    customer.status === 'expired'
      ? 'text-red-600'
      : customer.status === 'expiring'
      ? 'text-amber-600'
      : 'text-emerald-600';

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Back Link */}
      <div>
        <Link
          href="/dashboard/customers"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4B44F6] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Customers
        </Link>
      </div>

      {/* Customer Profile Header & Top Action Buttons (Matches Screenshot) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-[#EEF2FF] text-[#4B44F6] font-bold text-sm flex items-center justify-center shrink-0">
            {customer.initials}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                {customer.name}
              </h1>
              <StatusBadge
                status={customer.status}
                text={customer.daysText}
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Customer since {customer.startDate}
            </p>
          </div>
        </div>

        {/* Action Buttons Top Right */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setModalType('edit')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 text-xs font-semibold shadow-2xs transition cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5 text-slate-500" />
            Edit
          </button>

          <button
            type="button"
            onClick={() => setModalType('remind')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EEF2FF] hover:bg-indigo-100 text-[#4B44F6] text-xs font-semibold transition cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Send Reminder
          </button>

          <button
            type="button"
            onClick={() => setModalType('renew')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4B44F6] hover:bg-[#3f38e0] text-white text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Renew Subscription
          </button>
        </div>
      </div>

      {/* Main Content Grid: Left (Subscription & History) & Right (Contact & Delete) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-5">
          {/* Time Remaining Progress Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-400">
                  Subscription
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Current plan details
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-700">
                Expires {customer.expiresDate}
              </span>
            </div>

            <div>
              <p className={`text-2xl sm:text-3xl font-extrabold ${textColor}`}>
                {customer.daysText}
              </p>
            </div>

            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
              <span>{customer.startDate}</span>
              <span>{customer.expiresDate}</span>
            </div>
          </div>

          {/* Info Rows */}
          <div className="bg-white px-6 py-1 rounded-2xl border border-slate-200/80 shadow-2xs divide-y divide-slate-100 text-xs sm:text-sm">
            <div className="py-3.5 flex items-center justify-between">
              <span className="text-slate-400">Start date</span>
              <span className="font-semibold text-slate-900">
                {customer.startDate}
              </span>
            </div>
            <div className="py-3.5 flex items-center justify-between">
              <span className="text-slate-400">Duration</span>
              <span className="font-semibold text-slate-900">
                {customer.durationMonths} months
              </span>
            </div>
            <div className="py-3.5 flex items-center justify-between">
              <span className="text-slate-400">Expiration date</span>
              <span className="font-semibold text-slate-900">
                {customer.expiresDate}
              </span>
            </div>
          </div>

          {/* Renewal History Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Renewal history
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Every time this subscription was renewed
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              <div className="py-3.5 flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    Renewed for 3 months
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Jul 8, 2026 → Oct 8, 2026
                  </p>
                </div>
              </div>

              <div className="py-3.5 flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    First subscription · 3 months
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Apr 8, 2026 → Jul 8, 2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Column (Contact & Delete Cards) */}
        <div className="space-y-5">
          {/* Contact Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Contact</h3>

            <div className="space-y-3.5 text-xs">
              {/* Phone */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">
                      Phone
                    </p>
                    <p className="font-semibold text-slate-800 mt-0.5">
                      {customer.phone}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(customer.phone, 'phone')}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition"
                  title="Copy phone"
                >
                  {copiedField === 'phone' ? (
                    <span className="text-[10px] text-emerald-600 font-bold">
                      Copied!
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">
                      Email
                    </p>
                    <p className="font-semibold text-slate-800 mt-0.5">
                      {customer.email}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(customer.email, 'email')}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition"
                  title="Copy email"
                >
                  {copiedField === 'email' ? (
                    <span className="text-[10px] text-emerald-600 font-bold">
                      Copied!
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Delete Customer Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Delete customer
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Removes this customer and their subscription records. This cannot
                be undone.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setModalType('delete')}
              className="w-full py-2.5 px-4 bg-white hover:bg-red-50 text-red-600 border border-slate-200 hover:border-red-200 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Delete customer
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <RenewModal
        customer={customer}
        isOpen={modalType === 'renew'}
        onClose={() => setModalType(null)}
      />

      <ReminderModal
        customer={customer}
        isOpen={modalType === 'remind'}
        onClose={() => setModalType(null)}
      />

      <DeleteModal
        customer={customer}
        isOpen={modalType === 'delete'}
        onClose={() => setModalType(null)}
        onConfirm={() => {
          setModalType(null);
          router.push('/dashboard/customers');
        }}
      />

      {/* Edit Customer Modal */}
      {modalType === 'edit' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl w-full max-w-md p-6 space-y-4 my-8">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                Edit Customer
              </h3>
              <button
                onClick={() => setModalType(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <CustomerForm
              initialData={customer}
              onSuccess={() => setModalType(null)}
              isModal
            />
          </div>
        </div>
      )}
    </div>
  );
}