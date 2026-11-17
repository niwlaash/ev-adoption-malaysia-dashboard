import LegalLayout from '../layouts/LegalLayout';
import { ShieldCheck, EyeOff, Lock, FileSpreadsheet, ServerOff } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy">
      
      {/* Intro Guarantee */}
      <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800 rounded-xl p-5 sm:p-6 text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed">
        <div className="flex items-center gap-2 font-bold text-base mb-2">
          <ShieldCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
          <span>Our Privacy Commitment: Zero Personal Data Collection</span>
        </div>
        <p>
          The <strong>Malaysia EV Open Data Portal</strong> is a completely static, open civic resource. We believe in privacy by design: <strong>we do not collect, store, sell, or track any personal information from our visitors.</strong>
        </p>
      </div>

      {/* 4 Core Privacy Guarantees */}
      <div className="space-y-4 pt-2">
        
        {/* 1. Zero Tracking */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-xl p-5 shadow-xs">
          <div className="flex items-center gap-2.5 mb-2">
            <EyeOff className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              1. No Tracking Cookies or User Profiling
            </h3>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            This website does not use tracking cookies, advertising pixels, session recording tools, or third-party behavioral analytics. Your browsing activity stays entirely private on your own device.
          </p>
        </div>

        {/* 2. No Accounts or Logins */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-xl p-5 shadow-xs">
          <div className="flex items-center gap-2.5 mb-2">
            <ServerOff className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              2. No Accounts, Passwords, or Databases
            </h3>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            There are no user accounts, signup forms, or member areas on this portal. We have no access to your identity, email address, or contact information.
          </p>
        </div>

        {/* 3. Zero PII in Vehicle Records */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-xl p-5 shadow-xs">
          <div className="flex items-center gap-2.5 mb-2">
            <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              3. Strictly Anonymized Government Records
            </h3>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            All registration statistics displayed on this portal originate from official datasets published by the Road Transport Department (JPJ) and DOSM. These public datasets contain <strong>zero Personally Identifiable Information (PII)</strong>.
          </p>
          <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1 list-disc list-inside mt-2">
            <li>No owner names or identity card (MyKad) numbers.</li>
            <li>No vehicle license plate numbers.</li>
            <li>No residential or street addresses.</li>
          </ul>
          <p className="text-xs text-neutral-500 mt-2">
            The data consists solely of technical vehicle attributes: registration date, vehicle make, model name, powertrain type, color, and state of registration. This portal fully aligns with Malaysia&apos;s Personal Data Protection Act 2010 (PDPA).
          </p>
        </div>

        {/* 4. Safe Downloads */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-xl p-5 shadow-xs">
          <div className="flex items-center gap-2.5 mb-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              4. Safe File Downloads (Formula Injection Protection)
            </h3>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            When you export data to CSV from this portal, all cells are sanitized against spreadsheet formula injection vulnerabilities (CWE-1236). Any cell beginning with formula triggers (such as <code>=</code>, <code>+</code>, <code>-</code>, or <code>@</code>) is neutralized with safe quoting so files open securely in Microsoft Excel, Google Sheets, or Apple Numbers.
          </p>
        </div>

      </div>

      {/* External Links */}
      <div className="pt-2 text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
        <h4 className="font-bold text-neutral-800 dark:text-neutral-200 mb-1">
          External Websites
        </h4>
        <p>
          This portal provides outbound links to external open-data portals such as <a href="https://data.gov.my" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-700 dark:hover:text-neutral-300">data.gov.my</a> and <a href="https://openchargemap.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-700 dark:hover:text-neutral-300">Open Charge Map</a>. We encourage visitors to review the independent privacy statements of those third-party services.
        </p>
      </div>

    </LegalLayout>
  );
}
