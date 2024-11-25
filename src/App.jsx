import React, { useEffect, useState } from "react";
import { GlobalStyle } from "./styles/GlobalStyles.styles";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Question from "./pages/Question";
import Search from "./pages/Search";
import SearchResult from "./pages/SearchResult";
import Bookmark from "./pages/Bookmark";
import AlAnswer from "./pages/AlAnswer";
import DrugResult from "./pages/drugResult";
import { signInAnonymously } from "firebase/auth";
import { auth } from "./firebase";
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
        path: "alanswer",
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
        path: "drugresult",
        element: <DrugResult />,
      },
      {
        path: "bookmark",
        element: <Bookmark />,
      },
    ],
  },
]);

const App = () => {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    signInAnonymously(auth)
      .then((userCredential) => {
        const user = userCredential.user;
        setUid(user.uid); // UID 저장
        console.log("Logged in with UID:", user.uid);
      })
      .catch((error) => {
        console.error("Anonymous login failed:", error);
      });
  }, []);

  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
