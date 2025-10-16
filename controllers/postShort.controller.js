import crypto from "crypto";
import { saveLinks, shortLinks } from "../models/shortener.model.js";

export const getShortLinks = async (req, res) => {
  try {
    const links = await shortLinks();
    return res.render("index", { links, host: req.host });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export const postShortLinks = async (req, res) => {
  try {
    const { url, shortCode } = req.body;
    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");
    const links = await shortLinks();
    if (links[finalShortCode]) {
      return res
        .status(400)
        .send("Short code already exits. Please choose another");
    }
    links[finalShortCode] = url;
    await saveLinks(links);
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return res.send(400).send(`error.message`);
  }
};

export const redirectToLink = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const links = await shortLinks();

    if (!links[shortCode]) return res.status(404).send("404 error occur.");
    return res.redirect(links[shortCode]);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};
