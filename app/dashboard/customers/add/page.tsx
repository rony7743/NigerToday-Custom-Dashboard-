import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CustomerForm from '@/components/customers/CustomerForm';

export default function AddCustomerPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* Back Link */}
      <Link
        href="/customers"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4F46E5] hover:underline"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Customers
      </Link>

      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Add Customer
        </h1>
        <p className="text-xs text-slate-400 mt-1 hidden sm:block">
          Save a customer and their subscription. The expiry date is worked out for you.
        </p>
      </div>

      {/* Form & Desktop Summary Panel */}
      <CustomerForm />
    </div>
  );
}