import React from "react";
import { GlobalStyle } from "./styles/GlobalStyles.styles";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Question from "./pages/Question";
import Search from "./pages/Search";
import SearchResult from "./pages/SearchResult";
import Bookmark from "./pages/Bookmark";
import AlAnswer from "./pages/AlAnswer";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        {
          path: "question",
          element: <Question />,
          children: [],
        },
        {
          path: "question/:question",
          element: <AlAnswer />,
        },
        {
          path: "search",
          element: <Search />,
        },
        {
          path: "result",
          element: <SearchResult />,
        },
        {
          path: "bookmark",
          element: <Bookmark />,
        },
      ],
    },
  ]);

  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
