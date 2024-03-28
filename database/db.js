const mongoose = require('mongoose');


exports.connection = async () => {
    try {
        mongoose.set("strictQuery", false)

        await mongoose.connect("mongodb+srv://aakash:gautam@cluster0.j8hlbne.mongodb.net/");
        console.log('________________________________________\n<- ✅ Database Connection Established ->\n________________________________________\n');

        mongoose.set('debug', true);
    } catch (err) {
        console.log('_________________________________________\n<- ⚠️ Database Connection Unsuccessful  ->\n_________________________________________\n');
        throw err;
    }
}