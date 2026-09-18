/**
 * export-pdf.mjs — Xuất presentation thành PDF bằng Puppeteer.
 *
 * Cách dùng:
 *   node presentation/export-pdf.mjs
 *
 * Kết quả: presentation/StoryboardAI-Presentation.pdf
 */

import puppeteer from 'puppeteer';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT = path.join(__dirname, 'index.html');
const OUTPUT = path.join(__dirname, 'StoryboardAI-Presentation.pdf');

async function exportPDF() {
  console.log('🚀  Đang mở trình duyệt...');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Viewport rộng giống khi trình chiếu
  await page.setViewport({ width: 1600, height: 900 });

  // Mở file HTML local
  const fileUrl = `file:///${INPUT.replace(/\\/g, '/')}`;
  console.log(`📄  Đang tải: ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });

  // Đợi fonts load xong
  await page.evaluate(() => document.fonts.ready);

  // Chờ thêm chút để ổn định render
  await new Promise(r => setTimeout(r, 1500));

  console.log('🖨️  Đang xuất PDF...');

  // Sử dụng page.pdf() — tận dụng luôn @media print CSS đã có
  await page.pdf({
    path: OUTPUT,
    // 16:9 landscape — khớp với slide deck
    width: '297mm',
    height: '167.0625mm',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  console.log(`✅  Đã xuất PDF: ${OUTPUT}`);
}

exportPDF().catch(err => {
  console.error('❌  Lỗi:', err);
  process.exit(1);
});
