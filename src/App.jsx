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
import DrugResult from "./pages/DrugResult";
import { signInAnonymously } from "firebase/auth";
import { auth } from "./firebase";
import StartLoading from "./pages/StartLoading";
import { AnimatePresence } from "framer-motion";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2초로 설정 (1초 로딩 + 0.5초 페이드아웃)

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    signInAnonymously(auth)
      .then((userCredential) => {
        const user = userCredential.user;
        setUid(user.uid);
      })
      .catch((error) => {
        console.error("Anonymous login failed:", error);
      });
  }, []);

  return (
    <>
      <GlobalStyle />
      <AnimatePresence mode="wait">
        {isLoading && <StartLoading />}
      </AnimatePresence>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
