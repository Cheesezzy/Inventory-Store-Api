const express = require('express');
const env = require('./config');
const DB = require('./config/DB');
const {signInRoute} = require('./routes/signInRoute');
const {signUpRoute} = require('./routes/signUpRoute');
const {productRoute} = require('./routes/productRoute');
const {stockRoute} = require('./routes/stockRoute');
const auth = require("./middleware/auth");


const port = env.PORT;

const StartServer = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({extended: false}));

  DB.sync()
  .then(() => {
    console.log("Connected to Data base");
}). catch((error) => {
    console.log(error);
});

 app.use("/signIn", signInRoute);
 app.use("/signUp", signUpRoute);
 app.use("/product", auth, productRoute);
 app.use("/stock", auth , stockRoute);


app.get("/test", (req, res) => {
    res.status(200).send("ping");
})

app.use(( err, req, res, next)=> {
    err = err || {};
    res.status(err.status || 500).json({
        message: err.message || "An error occured"
    });
})

    app.listen(port,() => console.log(`Api started on port: ${port}`))
}
// note : we created a server and connected to DB postgress and created a a test route and the server is listening on that port

StartServer();