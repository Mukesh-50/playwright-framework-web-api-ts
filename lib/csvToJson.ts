import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

const CSV_DIR = path.join(__dirname, '..', 'testdata', 'csv');
const JSON_DIR = path.join(__dirname, '..', 'testdata', 'generated');

// One CSV row becomes one object, e.g. { id: '1', username: 'admin@email.com', ... }
type CsvRow = Record<string, string>;

// jsonFilePath has a "?" so it is optional: without it, the rows are only returned, not saved.
function csvToJson(csvFilePath: string, jsonFilePath?: string): CsvRow[] {
  const csv = fs.readFileSync(csvFilePath, 'utf-8');
  const { data, errors } = Papa.parse<CsvRow>(csv, {
    header: true,
    skipEmptyLines: true,
  });
  if (errors.length) {
    throw new Error(`CSV parse errors in ${csvFilePath}: ${JSON.stringify(errors)}`);
  }
  if (jsonFilePath) {
    fs.mkdirSync(path.dirname(jsonFilePath), { recursive: true });
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));
  }
  return data;
}

// Converts every testdata/csv/*.csv into testdata/generated/<name>.json
function convertAll(): string[] {
  fs.mkdirSync(JSON_DIR, { recursive: true });
  return fs
    .readdirSync(CSV_DIR)
    .filter((f) => f.endsWith('.csv'))
    .map((f) => {
      const out = path.join(JSON_DIR, f.replace(/\.csv$/, '.json'));
      csvToJson(path.join(CSV_DIR, f), out);
      return out;
    });
}

export { csvToJson, convertAll };

if (require.main === module) {
  convertAll().forEach((f) => console.log(`Generated ${path.relative(process.cwd(), f)}`));
}
