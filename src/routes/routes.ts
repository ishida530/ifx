import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import PostDetails from "../features/post/PostDetails";
import PostsPage from "../pages/PostsPage";
import NotFound from "../components/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Home,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "posts",
                Component: PostsPage,
            },
            {
                path: "posts/:id",
                Component: PostDetails,
            },
            {
                path: "*",
                Component: NotFound,
            }
        ],
    },
]);

