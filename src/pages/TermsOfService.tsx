import LegalLayout from '../layouts/LegalLayout';
import { Scale, Share2, Code2, AlertTriangle, FileCheck } from 'lucide-react';

export default function TermsOfService() {
  return (
    <LegalLayout title="Terms of Service & Licensing">
      
      {/* Intro Box */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-xl p-5 sm:p-6 shadow-xs leading-relaxed text-sm">
        <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          Open Access Terms
        </h2>
        <p className="text-neutral-600 dark:text-neutral-300">
          The <strong>Malaysia EV Open Data Portal</strong> is committed to open public knowledge. By accessing this dashboard or downloading its datasets, you agree to these open terms and acknowledge the relevant open-data licenses.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-4 pt-2">
        
        {/* 1. Creative Commons */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-xl p-5 shadow-xs">
          <div className="flex items-center gap-2.5 mb-2">
            <Share2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              1. Data Licensing: Creative Commons (CC BY 4.0)
            </h3>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            All compiled datasets, aggregated metrics, and visualizations published on this portal are licensed under the{' '}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-emerald-700 dark:text-emerald-400 font-medium"
            >
              Creative Commons Attribution 4.0 International (CC BY 4.0)
            </a>{' '}
            license.
          </p>
          <div className="mt-3 p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-lg text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5">
            <p className="font-semibold text-neutral-900 dark:text-neutral-200">Under this license, you are free to:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Share:</strong> Copy and redistribute the material in any medium or format.</li>
              <li><strong>Adapt:</strong> Remix, transform, and build upon the material for any purpose, even commercially.</li>
            </ul>
            <p className="pt-1 text-[11px] text-neutral-500">
              <strong>Requirement:</strong> You must give appropriate credit to <em>Malaysia EV Open Data Portal</em> and indicate if changes were made.
            </p>
          </div>
        </div>

        {/* 2. MIT License for Source Code */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-xl p-5 shadow-xs">
          <div className="flex items-center gap-2.5 mb-2">
            <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              2. Source Code License: MIT License
            </h3>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            The software source code for this portal is open source and licensed under the <strong>MIT License</strong>. You are permitted to inspect, fork, modify, and host your own instances in accordance with the MIT license terms located in the project&apos;s GitHub repository.
          </p>
        </div>

        {/* 3. Data Disclaimers */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-xl p-5 shadow-xs">
          <div className="flex items-center gap-2.5 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              3. Independent Project & Data Disclaimer
            </h3>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-2">
            This dashboard is an <strong>independent civic open-data initiative</strong> and is not officially operated by, endorsed by, or affiliated with the Road Transport Department (JPJ), the Department of Statistics Malaysia (DOSM), or the Ministry of Transport.
          </p>
          <p className="text-xs text-neutral-500 leading-relaxed">
            All data is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis for informational, educational, and public policy purposes. While automated verification scripts clean and aggregate the feeds monthly, the project makes no warranties regarding the absolute completeness or real-time precision of underlying government records.
          </p>
        </div>

        {/* 4. Acceptable Conduct */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-xl p-5 shadow-xs">
          <div className="flex items-center gap-2.5 mb-2">
            <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              4. Fair Use & Civic Integrity
            </h3>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Visitors, researchers, and automated API callers agree not to attempt any denial-of-service attacks or tamper with public data feeds. You agree not to misquote or manipulate figures to publish misleading or fraudulent statistical claims under the portal&apos;s name.
          </p>
        </div>

        {/* 5. Jurisdiction */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-xl p-5 shadow-xs">
          <div className="flex items-center gap-2.5 mb-2">
            <Scale className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              5. Governing Law
            </h3>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            These terms are governed by and construed in accordance with the laws of Malaysia.
          </p>
        </div>

      </div>

    </LegalLayout>
  );
}
