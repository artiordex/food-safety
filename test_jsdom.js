const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('c:/식약처/index.html', 'utf8');
const scriptContent = fs.readFileSync('c:/식약처/out.js', 'utf8');

const dom = new JSDOM(html, { runScripts: "dangerously" });

// Polyfill offsetWidth/offsetHeight (often accessed in DOM manipulations)
Object.defineProperty(dom.window.HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 100 });
Object.defineProperty(dom.window.HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 100 });

dom.window.onerror = function (message, source, lineno, colno, error) {
  console.log("RUNTIME ERROR: " + message);
};

try {
  dom.window.eval(scriptContent);
  console.log("Script executed without throwing errors.");
  
  const tabContent = dom.window.document.getElementById('tab-content');
  if (tabContent) {
    console.log("Tab Content Length: " + tabContent.innerHTML.length);
  } else {
    console.log("No tab-content element found.");
  }
} catch (e) {
  console.log("EXECUTION FAILED:");
  console.log(e);
}
