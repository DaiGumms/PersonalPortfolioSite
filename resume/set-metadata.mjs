// Replaces the browser's PDF metadata (Creator is the Edge user agent) with the CV's own.
// Usage: node resume/set-metadata.mjs <pdf>
import { readFile, writeFile } from 'node:fs/promises';
import { PDFDocument } from 'pdf-lib';

const path = process.argv[2];
const pdf = await PDFDocument.load(await readFile(path), { updateMetadata: false });

pdf.setTitle('David Morgan-Gumm CV');
pdf.setAuthor('David Morgan-Gumm');
pdf.setSubject('CV');
pdf.setCreator('David Morgan-Gumm');
pdf.setProducer('David Morgan-Gumm');

await writeFile(path, await pdf.save({ useObjectStreams: false }));
