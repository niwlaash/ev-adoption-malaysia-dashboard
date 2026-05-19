import init, { readParquet } from 'parquet-wasm';
import { Table, tableFromIPC } from 'apache-arrow';

let wasmPromise: Promise<unknown> | null = null;

// Ensure the WASM module is initialized properly before using
export async function initParquetWasm() {
  if (!wasmPromise) {
    wasmPromise = init();
  }
  return wasmPromise;
}

export async function fetchAndParseParquet(url: string): Promise<Table> {
  try {
    await initParquetWasm();
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    
    // Safety check: ensure we didn't get an HTML error page from the proxy
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
        throw new Error("Received HTML instead of Parquet data. Check proxy/CORS settings.");
    }

    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Read parquet into Arrow IPC format
    const arrowWasmData = readParquet(uint8Array) as any;
    
    if (!arrowWasmData || (arrowWasmData.length === 0 && !arrowWasmData.numRows)) {
       throw new Error("Parquet reader returned empty Arrow data");
    }

    // Parse Arrow IPC into an Apache Arrow Table
    const table = tableFromIPC(arrowWasmData);
    
    return table;
  } catch (err: any) {
    console.error(`Parquet processing error for ${url}:`, err);
    throw new Error(err.message || String(err));
  }
}
