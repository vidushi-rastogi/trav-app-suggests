const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8800

//routes
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

dotenv.config();

mongoose
    .connect(process.env.MONGODB_CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("MongoDB connected!");
    })
    .catch(err => console.log(err));


app.use(cors());
app.use(express.json());

//checking if project is running on Heroku server
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

app.listen(PORT, () => {
    console.log("Backend running on port ", PORT);
})