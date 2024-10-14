const fs = require('fs');
const path = require('path');
const { AxePuppeteer } = require('axe-puppeteer');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // run program on local development server
  await page.goto(process.argv[2]); // Replace with your local development URL

  const results = await new AxePuppeteer(page).analyze();
  await browser.close();

  const searchSelectorsInFiles = async (dir, selector) => {
    const logFilePath = path.resolve(__dirname, 'violations-log.json');

    const logToFile = (message) => {
      fs.appendFileSync(logFilePath, message + '\n', 'utf-8');
    };

    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        searchSelectorsInFiles(filePath, selector);
      } else if (
        filePath.endsWith('.js') ||
        filePath.endsWith('.jsx') ||
        filePath.endsWith('.ts') ||
        filePath.endsWith('.tsx') ||
        filePath.endsWith('.html')
      ) {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');

        lines.forEach((line, index) => {
          if (line.includes(selector)) {
            const logMessage = `Selector \x1b[36m"${selector}"\x1b[0m \nfound in file: \x1b[32m${filePath} \x1b[36mat line ${index + 1}\x1b[0m`;
            console.log(
              logMessage
            );
            console.log(' ');
            console.log('=======================================');
            logToFile(logMessage);
          }
        });
      }
    });
  };

  const logData = (violation, node) => {
    console.log('\x1b[31mViolation: \x1b[0m', violation.id);
    console.log('\x1b[33mDescription: \x1b[0m', violation.description);
    console.log('\x1b[32mHelp: \x1b[0m', violation.help);
    console.log('\x1b[36mHelp URL: \x1b[0m', violation.helpUrl);
    console.log('\x1b[33mTarget: \x1b[0m', node.target.join(', '));
    console.log('\x1b[33mElement: \x1b[36m', node.html, '\x1b[0m');
    console.log('');
    console.log(node.failureSummary);
    console.log('');
    const logEntry = {
      violation: {
        id: violation.id,
        impact: violation.impact,
        description: violation.description,
        help: violation.help,
        helpUrl: violation.helpUrl,
      },
      node: {
        target: node.target,
        html: node.html,
        failureSummary: node.failureSummary,
      },
    };

    const logEntryString = JSON.stringify(logEntry, null, 2);

    // Append the log entry to the log file
    fs.appendFileSync(path.resolve(__dirname, 'violations-log.json'), logEntryString + ',\n', 'utf-8');
  };

  if (results.violations.length > 0) {
    console.log('results.violations: ', results.violations);
    console.error('Accessibility violations found:');

    const selectors = {};

    results.violations.forEach((violation, index) => {
      violation.nodes.forEach(async (node) => {
        console.log('node: ', node);
        const selector = node.target[0].split('>').reverse()[0].trim();
        const regex = /^[.#]/;
        if (regex.test(selector)) {
          if (!selectors[selector]) {
            console.log(' ');
            selectors[selector] = selector;
            logData(violation, node);
            await searchSelectorsInFiles(
              path.resolve(__dirname, '..'),
              selector.replace(/^[.#]/, ''),
            );
          }
        } else {
          console.log(' ');
          logData(violation, node);
          console.log(' ');
          console.log('=======================================');
        }
      });
    });

    process.exit(1);
  } else {
    console.log('No accessibility violations found.');
  }
})();
