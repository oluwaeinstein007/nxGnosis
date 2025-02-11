import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class WebService {
  async scrapeWebsite(url: string): Promise<string> {
    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      const textContent = await page.evaluate(() => document.body.innerText);
      await browser.close();
      return textContent;
    } catch (error) {
      throw new Error(`Error scraping website: ${error.message}`);
    }
  }
}