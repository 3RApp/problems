import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Problem } from "./business";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: ":chapterNumber",
        element: <Problem />
    }
]);