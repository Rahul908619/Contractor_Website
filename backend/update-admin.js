const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/admin.model');
require('dotenv').config();

const updateAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("Royal9028@", salt);

        await Admin.deleteMany({});
        await Admin.create({
            email: "rahul902893@gmail.com",
            password: hashedPassword
        });

        console.log("Admin successfully updated!");
        process.exit(0);
    } catch (e) {
        console.error("Error updating admin:", e);
        process.exit(1);
    }
}
updateAdmin();
