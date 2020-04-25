const express = require("express");
const mongoose = require("mongoose");
const graphqlHttp = require("express-graphql");
const bodyParser = require("body-parser");

const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolver");

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,POST,PUT,PATCH,DELETE"
  );
  next();
});

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);

mongoose
  .connect(
    "mongodb+srv://prabinstha:@cluster0-irkbi.mongodb.net/graphqlapi?retryWrites=true"
  )
  .then(
    app.listen(4444, () => {
      console.log("Listening at port 4444");
    })
  )
  .catch((e) => {
    console.log(e);
  });
