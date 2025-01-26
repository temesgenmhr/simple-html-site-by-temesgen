import NodeCache from "node-cache";
import { Comment } from "../comment";

// Create a cache instance for 5 minutes
const cache = new NodeCache({ stdTTL: 300 });

export const getComments = async (keyword?: string): Promise<Comment[]> => {
  try {
    //try to get retrieve the cached comments
    let comments: Comment[] | undefined = cache.get("comments");

    // If the comments are not found in the cache, fetch it from the api
    if (!comments) {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments?postId=3"
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      comments = await response.json();
      cache.set("comments", comments);
    }

    //Filter comments by the `keyword` query parameter if provided
    let filteredComments: Comment[] = comments || [];
    if (keyword) {
      filteredComments = filteredComments.filter((comment: Comment) =>
        comment.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
      );
    }
    return filteredComments;
  } catch (error) {
    console.error("Error in getComments:", error);
    throw new Error("Failed to fetch comments");
  }
};
