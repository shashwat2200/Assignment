const bcrypt = require("bcrypt");

async function testBcrypt() {
    try {
        console.log("Testing bcrypt...");
        console.log("bcrypt version:", require('bcrypt/package.json').version);

        const password = "testpassword123";
        console.log("Original password:", password);

        console.log("Generating salt...");
        const salt = await bcrypt.genSalt(10);
        console.log("Salt generated:", salt);

        console.log("Hashing password...");
        const hash = await bcrypt.hash(password, salt);
        console.log("Hash generated:", hash);

        console.log("Comparing password...");
        const isMatch = await bcrypt.compare(password, hash);
        console.log("Password match:", isMatch);

        console.log("\nBcrypt test PASSED!");
    } catch (error) {
        console.error("\n❌ Bcrypt test FAILED!");
        console.error("Error:", error.message);
        console.error("Stack:", error.stack);
    }
}

testBcrypt();
