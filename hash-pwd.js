const bcrypt = require('bcrypt');

async function testHash() {
  const plainPassword = 'supersecret'; // Exact pw you use in login
  const testHash = '$2b$10$9hTA/dG4/1mkrShA3TeMyeEO0Dn6IxoHeBfqltA6mnBjfxaRoUZSy'; // Paste your DB hash from Studio

  // Re-generate hash for verification
  const newHash = await bcrypt.hash(plainPassword, 10);
  console.log('Newly generated hash:', newHash);

  // Test compare
  const matches = await bcrypt.compare(plainPassword, testHash);
  console.log('Does DB hash match plain pw?', matches); // Should be true
  

  if (!matches) {
    console.log('\nMISMATCH! Re-generate & update DB:');
    console.log(`UPDATE "User" SET password = '${newHash}' WHERE email = 'admin@myapp.com';`);
  } else {
    console.log('\nMATCH! Hash is good—issue elsewhere.');
  }
}

testHash();