const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
});

mongoose.connection.on('connected', () => console.log('Database connected'));