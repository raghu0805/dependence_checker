const fetch = require('node-fetch');

async function testFetch() {
  const NPM_REGISTRY = 'https://registry.npmjs.org';
  const packageName = 'axios';
  const version = '^1.6.0';
  const cleanVersion = version.replace(/[\^~>=<]/g, '').split(' ')[0];
  const url = `${NPM_REGISTRY}/${encodeURIComponent(packageName)}/${cleanVersion}`;
  console.log('Fetching', url);
  try {
    const res = await fetch(url);
    console.log('Res OK:', res.ok, res.status);
    if (!res.ok) {
       const fallbackRes = await fetch(`${NPM_REGISTRY}/${encodeURIComponent(packageName)}/latest`);
       console.log('Fallback OK:', fallbackRes.ok, fallbackRes.status);
    }
  } catch (e) {
    console.error('Error:', e);
  }
}

testFetch();
