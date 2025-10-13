import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import crypto from "crypto";
import { Router } from "express";

const router = Router();

const DATA_FILE = join("data", "links.json");

const shortLinks = async () => {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
    throw error;
  }
};

const saveLinks = async (links) => {
  await writeFile(DATA_FILE, JSON.stringify(links));
};

router.get("/report", (req, res) => {
  res.render("report");
});

router.get("/", async (req, res) => {
  try {
    const file = await readFile(join("views", "index.html"));
    const links = await shortLinks();
    const content = file.toString().replaceAll(
      " {{shortened-urls}}",
      Object.entries(links)
        .map(
          ([shortCode, url]) =>
            `<li><a href="/${shortCode}" target="_blank">${req.host}/${shortCode}</a></li>`
        )
        .join("")
    );
    return res.send(content);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

router.post("/", async (req, res) => {
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
});

router.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;
    const links = await shortLinks();

    if (!links[shortCode]) return res.status(404).send("404 error occur.");
    return res.redirect(links[shortCode]);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

// default export
// export default router;

//Named export
export const urlShortenerRoutes = router;
