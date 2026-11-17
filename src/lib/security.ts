/**
 * Security & Sanitization Utilities
 * Implements defenses against:
 * - CWE-1236: Improper Neutralization of Formula Elements in a CSV File (CSV Formula Injection)
 * - Safe string formatting for exports
 */

/**
 * Sanitizes a single cell value for CSV export to prevent formula injection in Microsoft Excel, LibreOffice, and Google Sheets.
 * If a string begins with dangerous formula triggers (=, +, -, @, tab, CR), it is prepended with a single quote (').
 */
export function sanitizeCsvCell(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) {
    return '""';
  }

  const str = String(value);

  // Check if string begins with characters that trigger formula execution
  const formulaTriggers = ['=', '+', '-', '@', '\t', '\r'];
  const startsWithTrigger = formulaTriggers.some((trigger) => str.startsWith(trigger));

  let safeStr = str;
  if (startsWithTrigger) {
    // Prepend single quote to force spreadsheet programs to treat as plain text
    safeStr = `'${str}`;
  }

  // Escape internal double quotes by doubling them
  const escaped = safeStr.replace(/"/g, '""');
  return `"${escaped}"`;
}

/**
 * Formats an array of values into a safe, injection-proof CSV row.
 */
export function formatSafeCsvRow(cells: (string | number | boolean | null | undefined)[]): string {
  return cells.map(sanitizeCsvCell).join(',');
}

/**
 * Generates and triggers a safe CSV download in the browser.
 */
export function downloadSafeCsv(filename: string, headers: string[], rows: (string | number | boolean | null | undefined)[][]): void {
  const headerRow = headers.map(sanitizeCsvCell).join(',');
  const dataRows = rows.map(formatSafeCsvRow);
  const csvContent = [headerRow, ...dataRows].join('\r\n');

  // Prepend UTF-8 BOM so Excel opens Malaysian special characters correctly
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
