## README.md

# Post Explorer Application

An application to explore posts from the public JSONPlaceholder API. It allows users to view a list of posts, see details of each post, and add new posts to the app state.

## Technologies
- **React** (with functional components and hooks)
- **TypeScript**
- **Tailwind CSS** (for styling)
- **TanStack Query** – for managing API state (fetching posts and users).
- **TanStack React Table** – for displaying posts in a table.
- **JSONPlaceholder API** (posts and users data)

## Features
1. **Post List** – Display posts fetched from the API using **TanStack Query**.
2. **Author Details** – Display basic author information (username, email) fetched using **TanStack Query**.
3. **Post Details** – Show full details of a single post when clicked.
4. **Add Posts** – Allows adding a new post to the app (changes are not saved to the server).
5. **TanStack React Table** – Use this library to display posts in a table.
6. **Form Validation** – Basic validation for the new post form.
7. **Loading Indicators** – Show loading states while fetching data from the API.

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone <repo-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app in development mode:
   ```bash
   npm run dev
   ```
4. Open your browser and go to `http://localhost:3000`.

## Additional Information
This project uses **Vite** as the bundler, **Tailwind CSS** for styling, and **TypeScript** for static typing. **TanStack Query** and **TanStack React Table** are used for managing data state and displaying the posts in a table.
