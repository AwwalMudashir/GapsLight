const bcryptjs = require('bcryptjs')

async function hashPassword() {
  const hashedPassword = await bcryptjs.hash("gaps@12345", 10); // Hash the password with 10 salt rounds
  console.log(hashedPassword); // Copy this hash and store it in the database
}

hashPassword();