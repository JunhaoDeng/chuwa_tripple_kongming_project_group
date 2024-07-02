const bcrypt = require("bcrypt");

async function testBcrypt() {
  try {
    const plainPassword = "12";

    // Hashing the password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    console.log("Hashed Password:", hashedPassword);

    // Comparing the password
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    console.log("Password Match:", isMatch);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the test function
testBcrypt();
