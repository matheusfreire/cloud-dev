import AWSXRay from 'aws-xray-sdk';
import bodyParser from 'body-parser';
import express from 'express';
import { router as tweetRoutes } from './routes/tweetRoutes.js';
import { router as imageRoutes } from './routes/imageRoutes.js';

(async () => {
    const app = express();
    const port = 8080;

    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: true }))
    app.use(AWSXRay.express.openSegment('tweets-app'));

    // Root URI call
    app.get("/", (req, res) => {
        res.status(200).send("Welcome to the Cloud!");
    });

    app.use(tweetRoutes);
    app.use(imageRoutes);

    // Start the Server
    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`);
        console.log(`press CTRL+C to stop server`);
    });
})();
