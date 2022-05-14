const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/photo-booking");

mongoose.set("debug", true);

module.exports = mongoose.connection;
