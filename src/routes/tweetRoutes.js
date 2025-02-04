import express from 'express';
import { tweets } from '../tweets.js';

export const router = express.Router();

router.get("/tweets/:id", (req, res) => {
    let {id} = req.params;
    if (!id) { 
        return res.status(400).send("id is required");
    }
    const tweetById = tweets.find(tweet => tweet.id === parseInt(id));
    if(!tweetById) {
        return res.status(404).send("Tweet not found");
    }

    return res.status(200).send(tweetById);
});

router.get("/tweets", (req, res) => {
    let {author} = req.query;

    let tweetsList = tweets;
    if (author) {
        tweetsList = tweetsList.filter(tweet => tweet.author === author);
    }
    return res.status(200).send(tweets);
});

router.post("/tweets", (req, res) => {
    let {author, text, imgUrl} = req.body;
    if (!author || !text) {
        return res.status(400).send("author and text are required");
    }
    const newTweet = {
        id: tweets.length,
        author,
        text,
        imgUrl
    }
    tweets.push(newTweet);
    return res.status(201).send(newTweet);
});