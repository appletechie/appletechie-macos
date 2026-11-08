import { chromium } from 'playwright'
import { writeFile } from 'node:fs/promises'
const browser = await chromium.launch({headless:true,executablePath:"/Users/andrewpeltekci/Library/Caches/ms-playwright/chromium-1254/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"})
const results=[]
for (const [label,url] of [['before','https://appletechie.dev'],['after','http://localhost:4173']]) {
 for (const width of [1440,390]) {
  const page=await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1})
  await page.goto(url,{waitUntil:'networkidle'})
  await page.screenshot({path:`docs/redesign-2026-11/evidence/${label}-${width}.png`,fullPage:true})
  results.push({label,width,...await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth}))})
  await page.close()
 }
}
await writeFile('docs/redesign-2026-11/evidence/viewport.json',JSON.stringify(results,null,2))
await browser.close()
