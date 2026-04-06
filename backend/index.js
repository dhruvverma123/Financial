require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");

const PORT = process.env.PORT || 3002;

app.use(cookieParser());

const userVerification = require("./jwt/userVerification");

const checkAccessabilityForAnalyst = require("./accessibilty/accessForAnalyist");
const checkAccessability = require("./accessibilty/checkAccessability");

const wrapAsync = require("./wrapAsync/wrapAsync");
const user = require("./controller/user");
const record = require("./controller/record");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);
app.use(methodOverride("_method"));
app.use(userVerification);

const main = async () => {
  await mongoose.connect(process.env.MONGO_URL);
};

//creating a new user here
app.post("/user", checkAccessability, wrapAsync(user.createUser));

//login api endpoint
app.post("/user-login", wrapAsync(user.login));

// creating a new record here
app.post("/record", checkAccessability, wrapAsync(record.createRecord));

//getting all records from here
app.get("/record", checkAccessabilityForAnalyst, wrapAsync(record.getRecords));

app.get("/record/:id", checkAccessability, wrapAsync(record.getARecord));

//updating a record here
app.put("/record/:id", checkAccessability, wrapAsync(record.updateRecord));

//deleting a reocrd here
app.delete("/record/:id", checkAccessability, wrapAsync(record.deleteRecord));

//2 days ago records
app.get("/recent-activities", wrapAsync(record.getSomeData));

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
  main()
    .then(() => console.log("DB connected"))
    .catch(() => console.log("DB not connected"));
});
