import express from "express";
import passwordService from "../services/passwordService.js";
import tokenService from "../services/tokenService.js";
import userService from "../services/userService.js";

export const router = express.Router();

router.post("/token", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userService.findByEmail(email);
        if (!user) {
            console.log("User not find");
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!await passwordService.verifyPassword(password, user.hashedPassword, user.salt)) {
            console.log("Unauthorized user by password");
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { accessToken, refreshToken } = tokenService.generateTokens(user);
        console.log("User find and token generated");
        return res.json({ access_token: accessToken, refresh_token: refreshToken, token_type: "bearer" });
    } catch (error) {
        console.error("Get token error", error)
        return res.status(500).send("Error occured")
    }
});

router.post("/refresh", async (req, res) => {
    try {
        const { refreshToken } = req.body
        const jwtPayload = tokenService.decodeToken(refreshToken)
        const user = await userService.findByEmail(jwtPayload.email)
        if (!user) {
            console.log("User not find");
            return res.status(401).json({ message: "Unauthorized" });
        }
        console.log("User find and token refreshed");
        const { accessToken, refreshToken: newRefreshToken } = tokenService.generateTokens(user);
        return res.json({ access_token: accessToken, refresh_token: newRefreshToken, token_type: "bearer" });
    } catch (error) {
        console.error("Refresh token error", error)
        return res.status(500).send("Error occured")
    }
});