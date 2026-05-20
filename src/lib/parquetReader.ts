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

    // Safety check on the returned binary data
    if (!arrowWasmData || (arrowWasmData.byteLength === 0 && !arrowWasmData.numRows)) {
      throw new Error("Parquet reader returned empty binary data");
    }

    // Parse Arrow IPC into an Apache Arrow Table
    try {
      // RecordBatchReader is often more resilient to metadata inconsistencies 
      // than the high-level tableFromIPC function.
      const reader = RecordBatchReader.from(arrowWasmData);
      const table = new Table(reader.schema, [...reader]);
      if (!table) throw new Error("Failed to initialize Arrow reader");
      return table;
    } catch (arrowErr: any) {
      console.error("Arrow parsing failed:", arrowErr);
      // Fallback or more descriptive error
      throw new Error(`Data Engine Error: Your browser or the dataset has an incompatibility with the data engine. (${arrowErr.message})`);
    }
  } catch (err: any) {
    console.error(`Parquet processing error for ${url}:`, err);
    throw new Error(err.message || String(err));
  }
}
