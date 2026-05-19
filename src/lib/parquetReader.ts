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
  await initParquetWasm();
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch dataset from ${url}: ${response.status}`);
  }
  
  const arrayBuffer = await response.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  
  // Read parquet into Arrow IPC format using parquet-wasm
  const arrowWasmData = readParquet(uint8Array);
  
  // Parse Arrow IPC into an Apache Arrow Table
  const table = tableFromIPC(arrowWasmData);
  
  return table;
}
