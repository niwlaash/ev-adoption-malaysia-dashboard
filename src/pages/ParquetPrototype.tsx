import { useState } from 'react';
import { fetchAndParseParquet } from '../lib/parquetReader';
import { Search, Database, Table as TableIcon, AlertCircle, Loader2 } from 'lucide-react';

export default function ParquetPrototype() {
    const [url, setUrl] = useState('/transportation/cars_2025.parquet');
    const [data, setData] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetch = async () => {
        setLoading(true);
        setError(null);

        let targetUrl = url.trim();

        // CORS Safety: Automatically sanitize DOSM URLs to use the local proxy
        if (targetUrl.startsWith('https://storage.data.gov.my/transportation/')) {
            targetUrl = targetUrl.replace('https://storage.data.gov.my/transportation/', '/transportation/');
            console.log('CORS Safety: Rewrote URL to local proxy path:', targetUrl);
        }

        try {
            const table = await fetchAndParseParquet(targetUrl);
            setData(table);
        } catch (err: any) {
            let errorMsg = err.message || 'Failed to fetch data';

            // Helpful error for users attempting direct CORS requests
            if (errorMsg.includes('Failed to fetch') || errorMsg.includes('NetworkError')) {
                errorMsg = "CORS Error: The browser blocked the direct request to DOSM. Please use official paths starting with '/transportation/'";
            }

            setError(errorMsg);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    const renderTablePreview = () => {
        if (!data || data.length === 0) return null;

        const columns = Object.keys(data[0]);
        const rows = data.slice(0, 15); // Preview first 15 rows

        return (
            <div className="mt-8 overflow-x-auto border border-neutral-800 rounded-xl bg-neutral-950">
                <table className="w-full text-left text-sm text-neutral-400">
                    <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-200">
                        <tr>
                            {columns.map(col => (
                                <th key={col} className="px-4 py-3 font-semibold uppercase tracking-wider">{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                        {rows.map((row, i) => (
                            <tr key={i} className="hover:bg-neutral-900/50 transition-colors">
                                {columns.map(col => (
                                    <td key={col} className="px-4 py-3 font-mono text-xs whitespace-nowrap">
                                        {String(row[col])}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {data.length > 15 && (
                    <div className="p-4 text-center border-t border-neutral-800 bg-neutral-900/30">
                        <p className="text-xs text-neutral-500 italic">Showing 15 of {data.length.toLocaleString()} rows</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold tracking-tight text-white flex items-center gap-3">
                    <Database className="w-8 h-8 text-blue-500" />
                    Parquet Data Inspector
                </h1>
                <p className="text-neutral-400">Prototype tool to verify official DOSM dataset integrity and Arrow parsing accuracy.</p>
            </div>

            <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter Parquet URL..."
                            className="w-full bg-black border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-sm text-neutral-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>
                    <button
                        onClick={handleFetch}
                        disabled={loading}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <TableIcon className="w-5 h-5" />}
                        {loading ? 'Processing...' : 'Run Inspector'}
                    </button>
                </div>

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 animate-in fade-in slide-in-from-top-2">
                        <AlertCircle className="w-5 h-5" />
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                {data && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4">
                        <div className="bg-black/40 border border-neutral-800 p-4 rounded-xl">
                            <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Total Rows</p>
                            <p className="text-2xl font-bold text-white">{data.length.toLocaleString()}</p>
                        </div>
                        <div className="bg-black/40 border border-neutral-800 p-4 rounded-xl">
                            <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Columns</p>
                            <p className="text-2xl font-bold text-white">{Object.keys(data[0] || {}).length}</p>
                        </div>
                        <div className="bg-black/40 border border-neutral-800 p-4 rounded-xl">
                            <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Memory Mode</p>
                            <p className="text-2xl font-bold text-green-400">Pure JS Array</p>
                        </div>
                    </div>
                )}
            </div>

            {renderTablePreview()}
        </div>
    );
}
