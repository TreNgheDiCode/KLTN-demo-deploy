/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/en", "/vi"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/en/auth/login",
  "/en/auth/register",
  "/vi/auth/login",
  "/vi/auth/register",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/student";

/**
 * The prefix for API upload files with edgestore routes
 * Routes that start with this prefix are used for API upload files purposes
 * @type {string}
 */
export const apiEdgestorePrefix = "/api/edgestore";