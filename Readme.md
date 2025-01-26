# Simple Search Suggestion App

This project implements a Google-like search suggestion feature using **HTML**, **CSS**, **TypeScript**, and **Node.js**. The application demonstrates clean code principles, understanding of project setup, and efficient API integration.

# Requirement

1. Figure out how to run the project
2. In ./script.ts write your code to make your AJAX request to the Node endpoint
3. In ./node/index.ts write your logic to make request to https://jsonplaceholder.typicode.com/comments?postId=3 and filter by the keywords the user has input (use the `name` property from the API response to compare)
4. In ./script.ts take the response and display it
5. In ./style.scss modify the css to give it some form of presentable UI. We need to see you can use semantics CSS & HTML to make things presentable

Bonus: write some unit tests!

# Solution Feature

1. **Search Suggestion Flow**:

   - User types in the input field.
   - The app sends AJAX requests to a **Node.js API**.
   - The API fetches data from `https://jsonplaceholder.typicode.com/comments?postId=3`, filters results based on user input, and sends them back to the frontend.
   - Relevant results are displayed in real-time.

2. **Node.js API**:

   - Uses **Express.js** for routing.
   - Includes middleware for CORS.
   - Implements caching with `node-cache` for efficiency (cache duration: 5 minutes).

3. **Frontend**:

   - Built with semantic **HTML**, **SCSS**, and **TypeScript**.
   - AJAX integration using `fetch` for API communication.
   - Dynamic result rendering.

4. **Unit Tests**:
   - The solution includes unit tests for controller and service logic using jest.

---

# Project Structure

```plaintext
├── build/
├── node/
│   ├── controller.ts         // API controller to fetch and filter comments
│   ├── index.ts              // Main server setup
│   ├── middleware.ts         // CORS middleware configuration
│   ├── service.ts            // Handles API logic and caching
├── test/
│   ├── controller.test.ts    // Unit tests for the controller
│   ├── service.test.ts       // Unit tests for the service
├── index.html                // HTML structure for the search UI
├── script.ts                 // Handles frontend logic and API communication
├── style.scss                // Custom SCSS for presentable UI
├── package.json              // Project dependencies and scripts
├── tsconfig.json             // TypeScript configuration
└── jest.config.ts            // Configuration for Jest testing
```
