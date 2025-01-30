import bodyParser from 'body-parser';
import express from 'express';

(async () => {
    //Create an express application
    const app = express();
    //default port to listen
    const port = 8080;

    //use middleware so post bodies 
    //are accessable as req.body.{{variable}}
    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: true })) //for requests from forms-like data

    // Root URI call
    app.get("/", (req, res) => {
        res.status(200).send("Welcome to the Cloud AWS!");
    });

    // Start the Server
    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`);
        console.log(`press CTRL+C to stop server`);
    });
})();
