const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        await mongoose.connect("mongodb+srv://pallavij20:Mumbai20@cluster0.n4u8h.mongodb.net/?retryWrites=true&w=majority")

        console.log("Mongodb connected...");

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;