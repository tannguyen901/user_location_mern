const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());
app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred!" });
});

const connectUrl =
  "mongodb+srv://tannguyen:dbpassword123@cluster0.j4p5kyv.mongodb.net/places?retryWrites=true&w=majority";
// const connectConfig = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// };

mongoose
  .connect(connectUrl)
  .then(() => {
    console.log("+++ Database connected! +++");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
