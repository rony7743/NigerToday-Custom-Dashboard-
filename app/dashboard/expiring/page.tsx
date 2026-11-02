'use client';

import React from 'react';
import { mockCustomers } from '../.../../../../src/data/mockCustomers';
import CustomerCard from '@/components/customers/CustomerCard';
import CustomerTable from '@/components/customers/CustomerTable';
import EmptyState from '@/components/shared/EmptyState';

export default function ExpiringPage() {
  const expiringCustomers = mockCustomers.filter(
    (c) => c.status === 'expiring' || c.status === 'expired'
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Expiring & Expired
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Customers whose subscriptions need renewal soon
        </p>
      </div>

      {expiringCustomers.length === 0 ? (
        <EmptyState
          title="All caught up!"
          description="No customers are expiring or expired right now."
        />
      ) : (
        <>
          <div className="md:hidden space-y-2.5">
            {expiringCustomers.map((customer) => (
              <CustomerCard
                key={customer.id}
                customer={customer}
                variant="dashboard"
              />
            ))}
          </div>
          <CustomerTable customers={expiringCustomers} />
        </>
      )}
    </div>
  );
}