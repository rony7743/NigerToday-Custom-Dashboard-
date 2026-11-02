import React from 'react';
import Link from 'next/link';
import { Customer } from '../../src/types';
import StatusBadge from './StatusBadge';

interface CustomerTableProps {
  customers: Customer[];
}

export default function CustomerTable({ customers }: CustomerTableProps) {
  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="py-3.5 px-6">Customer</th>
              <th className="py-3.5 px-4">Phone</th>
              <th className="py-3.5 px-4">Start Date</th>
              <th className="py-3.5 px-4">Duration</th>
              <th className="py-3.5 px-4">Expires</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {customers.map((customer) => {
              const isExpired =
                customer.status === 'expired' ||
                customer.daysText?.toLowerCase().includes('ago');

              return (
                <tr
                  key={customer.id}
                  className="hover:bg-slate-50/80 transition group"
                >
                  <td className="py-4 px-6">
                    <Link
                      href={`/dashboard/customers/${customer.id}`}
                      className="flex items-center gap-3.5"
                    >
                      <div className="w-9 h-9 rounded-full bg-[#EEF2FF] text-[#4F46E5] font-semibold text-xs flex items-center justify-center shrink-0">
                        {customer.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 group-hover:text-[#4F46E5] transition text-sm">
                          {customer.name}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {customer.email}
                        </p>
                      </div>
                    </Link>
                  </td>
                  <td className="py-4 px-4 text-slate-700 text-xs font-medium">
                    {customer.phone}
                  </td>
                  <td className="py-4 px-4 text-slate-700 text-xs">
                    {customer.startDate}
                  </td>
                  <td className="py-4 px-4 text-slate-700 text-xs">
                    {customer.durationMonths} mo
                  </td>
                  <td className="py-4 px-4 text-slate-700 text-xs">
                    {customer.expiresDate}
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge
                      status={customer.status}
                      text={customer.daysText}
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {isExpired ? (
                        <>
                          <Link
                            href={`/dashboard/customers/${customer.id}?action=renew`}
                            className="px-3.5 py-1.5 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold transition"
                          >
                            Renew
                          </Link>
                          <Link
                            href={`/dashboard/customers/${customer.id}?action=remind`}
                            className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
                          >
                            Message
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            href={`/dashboard/customers/${customer.id}?action=remind`}
                            className="px-3.5 py-1.5 rounded-lg bg-[#EEF2FF] hover:bg-indigo-100 text-[#4F46E5] text-xs font-semibold transition"
                          >
                            Message
                          </Link>
                          <Link
                            href={`/dashboard/customers/${customer.id}?action=renew`}
                            className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
                          >
                            Renew
                          </Link>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View (Matches 2nd Image) */}
      <div className="md:hidden space-y-2.5">
        {customers.map((customer) => {
          const isExpired =
            customer.status === 'expired' ||
            customer.daysText?.toLowerCase().includes('ago');

          return (
            <Link
              key={customer.id}
              href={`/dashboard/customers/${customer.id}`}
              className="flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-2xl shadow-2xs active:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#EEF2FF] text-[#4F46E5] font-semibold text-xs flex items-center justify-center shrink-0">
                  {customer.initials}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">
                    {customer.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {isExpired ? 'Expired' : 'Expires'} {customer.expiresDate}
                  </p>
                </div>
              </div>
              <StatusBadge status={customer.status} text={customer.daysText} />
            </Link>
          );
        })}
      </div>
    </>
  );
}