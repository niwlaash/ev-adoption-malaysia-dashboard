import { parquetRead } from 'hyparquet';

export async function fetchAndParseParquet(url: string): Promise<any[]> {
  try {
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

    // hyparquet reads directly from arrayBuffer and returns data without using Arrow's buggy metadata parser
    const data: any[] = [];

    await parquetRead({
      file: arrayBuffer,
      onComplete: (rows) => {
        data.push(...rows);
      }
    });

    return data;
  } catch (err: any) {
    console.error(`Parquet processing error for ${url}:`, err);
    throw new Error(err.message || String(err));
  }
}
