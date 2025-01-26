import { Request, Response } from "express";
import { getCommentsController } from "../node/controller";
import * as service from "../node/service";

jest.mock("./service");

describe("getCommentsController", () => {
  it("should return filtered comments", async () => {
    // Mock the request
    const mockReq = {
      query: { keyword: "test" },
    } as Partial<Request> as Request;

    // Mock the response
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as Partial<Response> as Response;

    const mockComments = [
      {
        postId: 3,
        id: 1,
        name: "Test comment",
        email: "test@example.com",
        body: "Test body",
      },
    ];

    // Mock the service function
    jest.spyOn(service, "getComments").mockResolvedValueOnce(mockComments);

    // Call the controller
    await getCommentsController(mockReq, mockRes);

    // Assertions
    expect(service.getComments).toHaveBeenCalledWith("test");
    expect(mockRes.json).toHaveBeenCalledWith(mockComments);
  });

  it("should handle errors and return 500", async () => {
    // Mock the request
    const mockReq = {} as Partial<Request> as Request;

    // Mock the response
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as Partial<Response> as Response;

    // Mock the service function to throw an error
    jest
      .spyOn(service, "getComments")
      .mockRejectedValueOnce(new Error("Failed to fetch comments"));

    // Call the controller
    await getCommentsController(mockReq, mockRes);

    // Assertions
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith("Error fetching comments");
  });
});
