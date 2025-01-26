import NodeCache from "node-cache";
import { getComments } from "../node/service";
import { Comment } from "../comment";

jest.mock("node-cache");

describe("getComments", () => {
  let mockCache: jest.Mocked<NodeCache>;

  beforeEach(() => {
    mockCache = new NodeCache() as jest.Mocked<NodeCache>;
  });

  it("should fetch comments and filter by keyword", async () => {
    const mockComments: Comment[] = [
      {
        postId: 3,
        id: 1,
        name: "Test comment",
        email: "test@example.com",
        body: "Test body",
      },
      {
        postId: 3,
        id: 2,
        name: "Another comment",
        email: "test2@example.com",
        body: "Another body",
      },
    ];

    // Mock cache behavior
    mockCache.get.mockReturnValueOnce(undefined);
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockComments,
    } as Response);

    const result = await getComments("test");

    expect(fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/comments?postId=3"
    );
    expect(mockCache.set).toHaveBeenCalledWith("comments", mockComments);
    expect(result).toEqual([mockComments[0]]);
  });

  it("should return cached comments when available", async () => {
    const mockComments: Comment[] = [
      {
        postId: 3,
        id: 1,
        name: "Test comment",
        email: "test@example.com",
        body: "Test body",
      },
    ];

    mockCache.get.mockReturnValueOnce(mockComments);

    const result = await getComments();
    expect(fetch).not.toHaveBeenCalled();
    expect(result).toEqual(mockComments);
  });

  it("should throw an error when the fetch fails", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      statusText: "Internal Server Error",
    } as Response);

    await expect(getComments()).rejects.toThrow("Failed to fetch comments");
  });
});
