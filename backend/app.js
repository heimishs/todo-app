const express = require("express");
const { sequelize } = require("./models");
const app = express();
const port = 8080;
const indexRouter = require("./routes");
const serverPerfix = "/api-server";
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// /api-server 접두사
app.use(serverPerfix, indexRouter);

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      console.log(`http://127.0.0.1:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("데이터베이스 sync 오류");
  });
