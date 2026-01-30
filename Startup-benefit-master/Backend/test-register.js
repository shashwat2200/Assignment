const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const User = require("./src/models/User");

async function testRegistration() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        // Try to create a user
        const testEmail = `test${Date.now()}@example.com`;
        const testPassword = "testpassword123";

        console.log(`Creating user with email: ${testEmail}`);

        const user = new User({
            email: testEmail,
            password: testPassword
        });

        await user.save();
        console.log("User created successfully!");
        console.log("User ID:", user._id);
        console.log("Email:", user.email);
        console.log("Password hashed:", user.password.substring(0, 20) + "...");

    } catch (error) {
        console.error("Error during registration test:");
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
    } finally {
        await mongoose.connection.close();
        console.log("MongoDB connection closed");
    }
}

testRegistration();
