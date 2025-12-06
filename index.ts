
import express from "express";
import userRouter from "./routes/user.routes";
import urlRouter from "./routes/url.routes";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use("/user", userRouter);
app.use(urlRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
