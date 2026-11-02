import React from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  Plus,
  Users,
  Clock,
  Check,
  ArrowRight,
  Search,
  MessageCircle,
} from 'lucide-react';
import { mockCustomers, dashboardStats } from '../../src/data/mockCustomers';

export default function DashboardPage() {
  // Expiring এবং Expired কাস্টমারদের আলাদা ফিল্টার করা হচ্ছে
  const expiringCustomers = mockCustomers.filter(
    (c) => c.status === 'expiring'
  );
  const expiredCustomers = mockCustomers.filter(
    (c) => c.status === 'expired'
  );

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center justify-between">
          <div>
            {/* Mobile Date */}
            <p className="sm:hidden text-xs font-medium text-slate-400">
              Mon, Oct 5
            </p>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Dashboard
            </h1>
            {/* Desktop Subtitle */}
            <p className="hidden sm:block text-xs text-slate-400 mt-1">
              Monday, October 5, 2026 · Here is who needs your attention today
            </p>
          </div>

          {/* Mobile Profile Avatar */}
          <div className="sm:hidden w-9 h-9 rounded-full bg-[#E0E7FF] text-[#4B44F6] flex items-center justify-center text-xs font-bold">
            AO
          </div>
        </div>

        {/* Desktop Search & Add Customer Button */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search name, phone or email"
              className="w-64 pl-9 pr-4 py-2 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4B44F6] transition"
            />
          </div>

          <Link
            href="/dashboard/customers/add"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#4B44F6] hover:bg-[#3f38e0] text-white text-xs font-semibold rounded-xl shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            Add Customer
          </Link>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-[#FEF3C7]/85 border border-[#FDE68A] text-[#B45309]">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0" />
          <p className="text-xs font-medium">
            <span className="font-semibold">
              {dashboardStats.needsAttention || 6} customers need your attention
            </span>
            <span className="hidden sm:inline">
              {' '}
              — {dashboardStats.expiring || 4} expire within 10 days and{' '}
              {dashboardStats.expired || 2} have already expired.
            </span>
          </p>
        </div>

        <Link
          href="/dashboard/expiring"
          className="px-3 py-1.5 rounded-lg bg-white border border-amber-200/80 text-slate-800 text-xs font-semibold hover:bg-slate-50 transition shrink-0 shadow-2xs"
        >
          Review now
        </Link>
      </div>

      {/* Desktop Stat Cards (Matches Screenshot 4 White Cards) */}
      <div className="hidden md:grid md:grid-cols-4 gap-4">
        {/* 1. Total customers */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-slate-500">
              Total customers
            </span>
          </div>
          <p className="text-3xl font-bold text-slate-900">30</p>
          <p className="text-[11px] text-slate-400">All saved customers</p>
        </div>

        {/* 2. Active */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-slate-500">Active</span>
          </div>
          <p className="text-3xl font-bold text-[#16A34A]">
            {dashboardStats.active || 24}
          </p>
          <p className="text-[11px] text-slate-400">More than 10 days left</p>
        </div>

        {/* 3. Expiring soon */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-slate-500">
              Expiring soon
            </span>
          </div>
          <p className="text-3xl font-bold text-[#D97706]">
            {dashboardStats.expiring || 4}
          </p>
          <p className="text-[11px] text-slate-400">Within the next 10 days</p>
        </div>

        {/* 4. Expired */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-slate-500">Expired</span>
          </div>
          <p className="text-3xl font-bold text-[#DC2626]">
            {dashboardStats.expired || 2}
          </p>
          <p className="text-[11px] text-slate-400">Follow up to renew</p>
        </div>
      </div>

      {/* Mobile Stat Cards (3 Columns Compact) */}
      <div className="grid grid-cols-3 gap-3 md:hidden">
        <div className="p-4 rounded-2xl bg-red-50/90 border border-red-100 flex flex-col justify-between">
          <span className="text-2xl font-bold text-red-600">
            {dashboardStats.expired || 2}
          </span>
          <span className="text-xs font-medium text-red-600/80 mt-1">
            Expired
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-100 flex flex-col justify-between">
          <span className="text-2xl font-bold text-amber-600">
            {dashboardStats.expiring || 4}
          </span>
          <span className="text-xs font-medium text-amber-700/80 mt-1">
            Expiring
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-100 flex flex-col justify-between">
          <span className="text-2xl font-bold text-emerald-600">
            {dashboardStats.active || 24}
          </span>
          <span className="text-xs font-medium text-emerald-700/80 mt-1">
            Active
          </span>
        </div>
      </div>

      {/* Bottom Grid: Expiring Soon (Left 2/3) & Recently Expired (Right 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        {/* Left Card: Expiring Soon Table */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
          <div className="p-5 pb-4">
            <h2 className="text-base font-bold text-slate-900">
              Expiring Soon
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Sorted by days left</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-y border-slate-100 bg-[#F8FAFC] text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-2.5 px-5">Customer</th>
                  <th className="py-2.5 px-4">Expires</th>
                  <th className="py-2.5 px-4">Remaining</th>
                  <th className="py-2.5 px-5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {expiringCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-slate-50/70 transition"
                  >
                    <td className="py-3.5 px-5">
                      <Link
                        href={`/dashboard/customers/${customer.id}`}
                        className="flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#EEF2FF] text-[#4B44F6] font-semibold text-xs flex items-center justify-center shrink-0">
                          {customer.initials}
                        </div>
                        <span className="font-semibold text-slate-900 hover:text-[#4B44F6] transition">
                          {customer.name}
                        </span>
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {customer.expiresDate}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#FEF3C7] text-[#B45309]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                        {customer.daysText}
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <Link
                        href={`/dashboard/customers/${customer.id}?action=remind`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EEF2FF] hover:bg-indigo-100 text-[#4B44F6] text-xs font-semibold transition"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Send Reminder
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Card: Recently Expired */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Recently Expired
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Renew or follow up</p>
          </div>

          <div className="divide-y divide-slate-100 mt-3">
            {expiredCustomers.map((customer) => (
              <div
                key={customer.id}
                className="py-3.5 flex items-center justify-between gap-3"
              >
                <Link
                  href={`/dashboard/customers/${customer.id}`}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-[#EEF2FF] text-[#4B44F6] font-semibold text-xs flex items-center justify-center shrink-0">
                    {customer.initials}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      {customer.name}
                    </p>
                    <p className="text-[11px] text-[#DC2626] mt-0.5">
                      Expired {customer.daysText}
                    </p>
                  </div>
                </Link>

                <Link
                  href={`/dashboard/customers/${customer.id}?action=remind`}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition shrink-0"
                >
                  Message
                </Link>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 mt-1">
            <Link
              href="/dashboard/expired"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#4B44F6] hover:underline"
            >
              View all expired <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}