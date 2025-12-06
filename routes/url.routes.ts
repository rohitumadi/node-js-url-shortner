import express from "express";
import { shortenUrlRequestValidation } from "../validations/request.validations";
import { treeifyError } from "zod";
import db from "../db/index";
import { urlsTable } from "../models/url.model";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import { authenticationMiddleware } from "../middlewares/auth.middleware";

const urlRouter = express.Router();

urlRouter.post("/shorten", authenticationMiddleware, async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized, please login first" });
    }
    const shortenUrlRequestValidationResult = shortenUrlRequestValidation.safeParse(req.body);
    if (!shortenUrlRequestValidationResult.success) {
        return res.status(400).json({ message: treeifyError(shortenUrlRequestValidationResult.error) });
    }
    const { originalUrl } = shortenUrlRequestValidationResult.data;

    const shortCode = nanoid(8);

    const [url] = await db.insert(urlsTable).values({
        originalUrl,
        shortCode,
        userId,
    }).returning({
        id: urlsTable.id,
        shortCode: urlsTable.shortCode,
        originalUrl: urlsTable.originalUrl,

    });

    res.status(201).json({ message: "URL shortened successfully", data: url });
});

urlRouter.get("/:shortCode", async (req, res) => {
    const { shortCode } = req.params;
    const [url] = await db.select({
        originalUrl: urlsTable.originalUrl,
    }).from(urlsTable).where(eq(urlsTable.shortCode, shortCode));

    if (!url) {
        return res.status(404).json({ message: "URL not found" });
    }
    res.redirect(url.originalUrl);
});

export default urlRouter;