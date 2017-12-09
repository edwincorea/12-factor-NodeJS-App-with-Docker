require("dotenv").config();

const path = require("path");
const express = require("express");
//express proxy middleware for simple proxy requests such as CDN
const proxy = require("express-http-proxy");
const baseImageUrl = process.env.BASE_IMAGE_URL;
const proxyBaseImageUrl = baseImageUrl
    ? proxy(baseImageUrl, {
        //function for defining a custom path for image request
        proxyReqPathResolver: function(req) {            
            const newPath = baseImageUrl + req.path;
            console.log(newPath);
            return newPath;
        }
    })
    : express.static(path.join(__dirname, "public/images")); //fallback in the event env-var doesn't exist;

const app = express();

app.use("/images", proxyBaseImageUrl);

app.listen(8080);

