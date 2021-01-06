const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
// convert country name to currency code
const cc = require("currency-codes");

// config dotenv
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const api_key = process.env.API_KEY;

const app = express();
const port = process.env.PORT || 5000;

// parse the body into json format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// fetch names of countries from api
app.get("/getCountry", (req, res) => {
  axios({
    method: "get",
    url: "https://dev-apply.educationplannerbc.ca/api/v1/lists/countries",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((response) => {
    const countryList = response.data
      .map((nation) => {
        if (cc.country(nation.description).length > 0) {
          return {
            country: nation.description,
            currencycode: cc.country(nation.description)[0].code,
          };
        }
      })
      .filter((n) => n != null);
    res.send(countryList);
  });
});

// fetch the specified amount of converted money
app.get("/getAmount", (req, res) => {
  const { from, to, amount } = req.query;
  console.log(from, to, amount);
  axios({
    method: "get",
    url: `http://apilayer.net/api/convert?access_key=${api_key}&from=${from.toUpperCase()}&to=${to.toUpperCase()}&amount=${amount}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((response) => {
    const money = response.data.result.toString()
    res.send(money);
  });
});

app.listen(port, (error) => {
  if (error) throw error;
  console.log("server running on port " + port);
});
