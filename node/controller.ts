import { Request, Response } from "express";
import { getComments } from "./service";

export const getCommentsController = async (req: Request, res: Response) => {
  const { keyword } = req.query as { keyword?: string };
  try {
        // Call the service function to get the comments
    const filteredComments = await getComments(keyword);
    res.json(filteredComments);
  } catch (error) {
    console.error("Error fetching comments: ", error.message);
    res.status(500).send("Error fetching comments");
  }
};
