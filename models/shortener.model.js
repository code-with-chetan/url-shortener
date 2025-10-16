import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const DATA_FILE = join("data", "links.json");

export const shortLinks = async () => {
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

export const saveLinks = async (links) => {
  await writeFile(DATA_FILE, JSON.stringify(links));
};
