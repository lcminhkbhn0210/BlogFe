import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NewBlog from "./pages/NewBlog";
import EditBlog from "./pages/EditBlog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {path: "/home", element: <Home/>},
      {path: "/blogdetail/:blogId", element: <BlogDetail/>},
      {path: "/home/blogdetail/:blogId", element: <BlogDetail/>},
      {path: "/about", element: <About/>},
      {path: "/contact", element: <Contact/>},
      {path: "/admin", element: <Admin/>},
      {path: "/newblog", element: <NewBlog/>},
      {path: "/editblog/:blogId", element: <EditBlog/>}
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router}></RouterProvider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
