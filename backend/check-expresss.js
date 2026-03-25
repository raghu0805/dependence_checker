const fetch = require('node-fetch');

async function check() {
  console.log('Checking NPM for expresss...');
  const npmRes = await fetch('https://registry.npmjs.org/expresss');
  console.log('NPM Status:', npmRes.status);

  console.log('\nChecking OSV for expresss...');
  const osvRes = await fetch('https://api.osv.dev/v1/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      package: { name: 'expresss', ecosystem: 'npm' }
    })
  });
  console.log('OSV Status:', osvRes.status);
  const data = await osvRes.json();
  console.log('OSV Data:', JSON.stringify(data, null, 2));
}

check();
