```javascript
const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const artifacts = [
    'test-results/',
    'playwright-report/',
    'junit.xml',
  ];

  for (const artifact of artifacts) {
    const absPath = path.join(__dirname, '..', artifact);
    try {
      if (fs.existsSync(absPath)) {
        await fs.promises.rm(absPath, { recursive: true, force: true });
      }
    } catch {
      // Ignore errors — cleanup is best-effort
    }
  }
};
```
