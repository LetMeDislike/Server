const express = require("express");
const cors = require('cors');
const axios = require('axios').default;
const crypto = require("crypto");
const rateLimit = require("express-rate-limit");

const app = express();

const git = require("git");

app.use(cors());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);

app.get("/dislikes", (req, res, next) => {
    const id = req.query.id;

    const url = `https://raw.githubusercontent.com/LetMeDislike/PublicData/main/data/${id}.txt`;
    res.send(
        {
            status: 200,
            url: url
        }
    )
});

app.listen(process.env.PORT || 3000, () => {
    console.log("online!");
});