'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Plus } from 'lucide-react';
import { mockCustomers } from './../../../src/data/mockCustomers';
import { SubscriptionStatus } from './../../../src/types';
import CustomerCard from '@/components/customers/CustomerCard';
import CustomerTable from '@/components/customers/CustomerTable';
import EmptyState from '@/components/shared/EmptyState';

type FilterTab = 'all' | SubscriptionStatus;

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const tabs: { label: string; value: FilterTab }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Expiring', value: 'expiring' },
    { label: 'Expired', value: 'expired' },
  ];

  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesTab = activeTab === 'all' || customer.status === activeTab;
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
          <p className="text-xs text-slate-400 mt-0.5">30 customers</p>
        </div>

        <Link
          href="/customers/add"
          className="inline-flex items-center justify-center gap-2 w-10 h-10 sm:w-auto sm:h-auto sm:px-4 sm:py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition"
        >
          <Plus className="w-5 h-5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Add Customer</span>
        </Link>
      </div>

      {/* Search & Filter Tabs Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name, phone or email"
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
          />
        </div>

        {/* Filter Pills (All, Active, Expiring, Expired) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Customer List / Empty State */}
      {filteredCustomers.length === 0 ? (
        <EmptyState
          title="No customers found"
          description="Try adjusting your search or filter, or add a new customer to get started."
          actionLabel="Add Customer"
          actionHref="/customers/add"
        />
      ) : (
        <>
          {/* Mobile Cards */}
          <div className="md:hidden space-y-2.5">
            {filteredCustomers.map((customer) => (
              <CustomerCard
                key={customer.id}
                customer={customer}
                showChatIcon={false}
              />
            ))}
          </div>

          {/* Desktop Table */}
          <CustomerTable customers={filteredCustomers} />
        </>
      )}
    </div>
  );
}