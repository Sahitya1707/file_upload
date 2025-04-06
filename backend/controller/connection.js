import mongoose from "mongoose";

const DBConnection = () => {
  mongoose
    .connect(`${process.env.DB_CONNECTION}`, {})
    .then((res) => {
      console.log("connected to db");
    })
    .catch((err) => {
      console.log("DB connection failed", err);
    });
};

export default DBConnection;
