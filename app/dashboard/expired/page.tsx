'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, AlertCircle, RefreshCw } from 'lucide-react';
import { mockCustomers } from '../../../src/data/mockCustomers';
import { Customer } from '../../../src/types';
import CustomerCard from '@/components/customers/CustomerCard';
import CustomerTable from '@/components/customers/CustomerTable';
import EmptyState from '@/components/shared/EmptyState';
import RenewModal from '@/components/customers/modals/RenewModal';
import ReminderModal from '@/components/customers/modals/ReminderModal';

export default function ExpiredCustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [modalType, setModalType] = useState<'renew' | 'remind' | null>(null);

  // শুধুমাত্র যাদের স্ট্যাটাস 'expired' তাদের ফিল্টার করা হচ্ছে
  const expiredCustomers = mockCustomers.filter((customer) => {
    const isExpired = customer.status === 'expired';
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);

    return isExpired && matchesSearch;
  });

  const handleOpenModal = (customer: Customer, type: 'renew' | 'remind') => {
    setSelectedCustomer(customer);
    setModalType(type);
  };

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Expired Subscriptions
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-600">
              {expiredCustomers.length}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Customers whose subscriptions have already ended and need immediate renewal
          </p>
        </div>
      </div>

      {/* Red Alert Banner */}
      {expiredCustomers.length > 0 && (
        <div className="bg-red-50/90 border border-red-200/80 rounded-2xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <p className="text-xs font-semibold text-red-800">
              {expiredCustomers.length} customer(s) have expired subscriptions. Send them a reminder to renew!
            </p>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search expired customer by name or phone..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
        />
      </div>

      {/* Expired Customers List / Table */}
      {expiredCustomers.length === 0 ? (
        <EmptyState
          title="No expired customers"
          description="Great job! None of your customers have an expired subscription right now."
        />
      ) : (
        <>
          {/* Mobile View Cards */}
          <div className="md:hidden space-y-2.5">
            {expiredCustomers.map((customer) => (
              <CustomerCard
                key={customer.id}
                customer={customer}
                variant="dashboard"
                onReminderClick={(c) => handleOpenModal(c, 'remind')}
              />
            ))}
          </div>

          {/* Desktop View Table */}
          <CustomerTable
            customers={expiredCustomers}
            onRenewClick={(c) => handleOpenModal(c, 'renew')}
            onReminderClick={(c) => handleOpenModal(c, 'remind')}
          />
        </>
      )}

      {/* Modals for Quick Action from Table/Card */}
      {selectedCustomer && (
        <>
          <RenewModal
            customer={selectedCustomer}
            isOpen={modalType === 'renew'}
            onClose={() => {
              setModalType(null);
              setSelectedCustomer(null);
            }}
          />
          <ReminderModal
            customer={selectedCustomer}
            isOpen={modalType === 'remind'}
            onClose={() => {
              setModalType(null);
              setSelectedCustomer(null);
            }}
          />
        </>
      )}
    </div>
  );
}