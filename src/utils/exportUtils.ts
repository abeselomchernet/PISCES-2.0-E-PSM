/**
 * Utilities for downloading data as CSV or JSON files.
 */

function escapeCsvValue(val: unknown): string {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportToCsv(
  filename: string,
  headers: string[],
  rows: (string | number | boolean | null | undefined)[][]
) {
  const headerLine = headers.map(escapeCsvValue).join(',');
  const rowLines = rows.map((row) => row.map(escapeCsvValue).join(','));
  // \uFEFF is UTF-8 Byte Order Mark for Excel compatibility
  const csvContent = '\uFEFF' + [headerLine, ...rowLines].join('\r\n');
  const safeFilename = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  downloadFile(csvContent, safeFilename, 'text/csv;charset=utf-8;');
}

export function exportToJson(filename: string, data: unknown) {
  const jsonContent = JSON.stringify(data, null, 2);
  const safeFilename = filename.endsWith('.json') ? filename : `${filename}.json`;
  downloadFile(jsonContent, safeFilename, 'application/json;charset=utf-8;');
}
