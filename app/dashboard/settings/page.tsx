'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Save, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const [autoRemind, setAutoRemind] = useState(true);
  const [smsNotify, setSmsNotify] = useState(true);
  const [emailNotify, setEmailNotify] = useState(false);

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Settings
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Manage your business profile and reminder preferences
        </p>
      </div>

      {/* Business Info Card */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900">Business Profile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600">
              Company Name
            </label>
            <input
              type="text"
              defaultValue="GTV Nigertoday"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600">
              Admin Email
            </label>
            <input
              type="email"
              defaultValue="owner@email.com"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Notification Toggles (Matches 2nd image Settings screen) */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900">
          Notification Preferences
        </h2>

        <div className="divide-y divide-slate-100 text-xs sm:text-sm">
          {[
            {
              label: 'Auto-flag expiring subscriptions (7 days prior)',
              state: autoRemind,
              setter: setAutoRemind,
            },
            {
              label: 'Enable WhatsApp & SMS reminder templates',
              state: smsNotify,
              setter: setSmsNotify,
            },
            {
              label: 'Receive daily summary report via email',
              state: emailNotify,
              setter: setEmailNotify,
            },
          ].map((item, idx) => (
            <div key={idx} className="py-3.5 flex items-center justify-between">
              <span className="text-slate-700 font-medium">{item.label}</span>
              <button
                type="button"
                onClick={() => item.setter(!item.state)}
                className={`w-10 h-5.5 rounded-full transition-colors p-0.5 cursor-pointer ${
                  item.state ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
              >
                <div
                  className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                    item.state ? 'translate-x-4.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Logout Button */}
      <div className="md:hidden pt-2">
        <Link
          href="/login"
          className="w-full py-3 bg-red-50 text-red-600 font-semibold rounded-xl text-xs flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Log out
        </Link>
      </div>
    </div>
  );
}