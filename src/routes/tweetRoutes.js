import express from "express";
import tweetService from "../services/tweetService.js";
export const router = express.Router();

router.get("/tweets/:id", async (req, res) => {
    let { id } = req.params;

    if (!id) {
        return res.status(400).send(`Tweet id is required`);
    }

    const tweetById = await tweetService.findTweetById(id)

    if (!tweetById) {
        return res.status(404).send(`Tweet not found`)
    }

    return res.status(200).send(tweetById);
});

router.get("/tweets/", async (req, res) => {
    let { author } = req.query;

    let tweetList;

    if (author) {
        tweetList = await tweetService.findTweetsByAuthor(author)
    } else {
        tweetList = await tweetService.findAll();
    }

    res.status(200).send(tweetList);
});

router.post("/tweets/", async (req, res) => {
    let { author, text, imgUrl } = req.body;

    if (!author || !text) {
        return res.status(400).send("Missing required tweet information")
    }

    const newTweet = await tweetService.createTweet(author, text, imgUrl)

    res.status(201).send(newTweet);
});