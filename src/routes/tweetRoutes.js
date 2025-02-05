import express from "express";
import tweetService from "../services/tweetService.js";
export const router = express.Router();

router.get("/tweets/:id", async (req, res) => {
    let { id } = req.params;
    console.log(`Get tweet by id = ${id}`);

    if (!id) {
        console.log("Id param is missing");
        return res.status(400).send(`Tweet id is required`);
    }

    const tweetById = await tweetService.findTweetById(id)

    if (!tweetById) {
        console.log(`Tweet with id ${id} not found`);
        return res.status(404).send(`Tweet not found`)
    }

    console.log(`Found tweet with id ${id}`);
    return res.status(200).send(tweetById);
});

router.get("/tweets/", async (req, res) => {
    console.log("Get list of tweets");
    let { author } = req.query;

    let tweetList;

    if (author) {
        console.log(`Filtering tweets by author ${author}`);
        tweetList = await tweetService.findTweetsByAuthor(author)
    } else {
        console.log("Getting all tweets");
        tweetList = await tweetService.findAll();
    }

    res.status(200).send(tweetList);
});

router.post("/tweets/", async (req, res) => {
    console.log("Create a new tweet");
    let { author, text, imgUrl } = req.body;

    if (!author || !text) {
        console.log("Missing author or text");
        return res.status(400).send("Missing required tweet information")
    }

    const newTweet = await tweetService.createTweet(author, text, imgUrl)
    console.log("New tweet created");
    res.status(201).send(newTweet);
});