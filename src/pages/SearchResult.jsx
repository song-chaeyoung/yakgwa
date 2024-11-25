import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  searchDrugName,
  searchDrugEfcyQesitm,
  searchDrugEntpName,
} from "../api";
import { useQueries } from "@tanstack/react-query";
import styled from "styled-components";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faCheck,
  faSearch,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { drugData, searchKeyword } from "../atoms";
import { useRecoilState } from "recoil";
import { getSearchDrugList } from "../api";
import { AnimatePresence, motion } from "framer-motion";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import Bookmark from "./Bookmark";
import Alert from "../components/Alert";

const Container = styled.section`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 60px 1rem;
  > form {
    width: 100%;
    margin: 1.5rem 0 3rem;
    position: relative;
    > input {
      color: #333;
      width: 100%;
      padding: 0.5rem 0.25rem;
      padding-right: 2rem;
      border: none;
      border-bottom: 2px solid var(--main-color);
      font-size: 1.25rem;
    }
    > button {
      position: absolute;
      right: 0.25rem;
      top: 50%;
      transform: translateY(-50%);
      background-color: transparent;
      border: none;
      cursor: pointer;
      > svg {
        color: #666;
        font-size: 1.15rem;
      }
    }
  }
  > div {
    padding: 0 0.5rem;
    > h3 {
      color: #666;
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
    .searchResult {
      min-height: 5rem;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 1.25rem;
      border-bottom: 1px solid #999;
      padding: 0.6rem 0.25rem;
      cursor: pointer;
      > input {
        display: none;
      }
      > input:checked + label {
        background-color: var(--main-color);
        border-color: var(--main-color);
        border-radius: 0.25rem;
        > svg {
          display: block;
          color: #fff;
        }
      }
      > label {
        min-width: 1.25rem;
        height: 1.25rem;
        border: 1.5px solid #999;
        transition: all 0.3s;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        > svg {
          display: none;
        }
      }
      .searchResultInfo {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        p:nth-child(1) {
          font-size: 1.25rem;
          font-weight: 700;
          /* word-break: keep-all; */
          line-height: 1.3;
          word-break: break-word;
          overflow-wrap: break-word;
          white-space: normal;
        }
        p:nth-child(2) {
          font-size: 0.9rem;
          /* color: #666; */
        }
      }
    }
  }
  .addBookmark {
    /* height: fit-content; */
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
    font-size: 1.125rem;
    color: #555;
    white-space: nowrap;
    > span {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      > svg {
        color: var(--main-color);
        margin-bottom: 0.25rem;
      }
    }
    > div {
      /* width: 0.25rem; */
      width: 0.1rem;
      /* height: 100%; */
      height: 2.25rem;
      background-color: #ccc;
    }
  }
`;

const SearchResult = () => {
  const [keyword, setKeyword] = useRecoilState(searchKeyword);
  const [searchParams] = useSearchParams();
  const keywordParams = searchParams.get("q");
  const [input, setInput] = useState(keywordParams);
  const [drugInfo, setDrugInfo] = useRecoilState(drugData);
  const navigate = useNavigate();
  const [bookmarkBox, setBookmarkBox] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [alert, setAlert] = useState(false);

  const results = useQueries({
    queries: [
      {
        queryKey: ["drugName", keywordParams],
        queryFn: () => searchDrugName(keywordParams),
        enabled: !!keywordParams?.trim(),
        select: (data) =>
          Array.isArray(data.body.items) ? data.body.items : [],
      },
      {
        queryKey: ["drugEfcy", keywordParams],
        queryFn: () => searchDrugEfcyQesitm(keywordParams),
        enabled: !!keywordParams?.trim(),
        select: (data) =>
          Array.isArray(data.body.items) ? data.body.items : [],
      },
      {
        queryKey: ["drugEntp", keywordParams],
        queryFn: () => searchDrugEntpName(keywordParams),
        enabled: !!keywordParams?.trim(),
        select: (data) =>
          Array.isArray(data.body.items) ? data.body.items : [],
      },
    ],
  });

  const searchEvent = (e) => {
    e.preventDefault();
    setKeyword(input);
    navigate(`/result?q=${input}`);
  };

  const goDrugResult = (item) => {
    setDrugInfo(item);
    navigate(`/drugresult?q=${item.itemName}`);
  };

  // bookmarkBox 처리
  useEffect(() => {
    setCheckedItems(
      searchResult.map((item) => ({
        itemSeq: item.itemSeq,
        itemName: item.itemName,
        isChecked: false,
      }))
    );
  }, []);

  useEffect(() => {
    setBookmarkBox(checkedItems.some((item) => item.isChecked));
  }, [checkedItems]);

  const allCancel = () => {
    setCheckedItems([]);
  };

  const addBookmark = async () => {
    const checkedData = checkedItems.filter((item) => item.isChecked);

    try {
      const user = auth.currentUser;
      const userDocRef = doc(db, `bookmark`, user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          createdAt: new Date(),
          Bookmark: checkedData,
        });
      } else {
        await updateDoc(userDocRef, {
          Bookmark: [...userDoc.data().Bookmark, ...checkedData],
        });
      }
    } catch (err) {
      console.log("submit error", err);
    } finally {
      setCheckedItems([]);
      setAlert(true);
    }
  };

  // data 처리
  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  const data = results.map((result) => result.data || []);
  const searchResult = data.flat();

  if (isLoading) return <Loading />;
  if (isError) return <section>Error: {isError.message}</section>;

  return (
    <Container>
      <form onSubmit={searchEvent}>
        <input
          type="text"
          placeholder="검색 내용"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      <div>
        <h3>통합 검색결과</h3>
        {searchResult.map((item, idx) => (
          <div
            className="searchResult"
            key={idx}
            onClick={() => goDrugResult(item)}
          >
            <input
              type="checkbox"
              name={`check-${idx}`}
              id={`check-${idx}`}
              checked={checkedItems[idx]?.isChecked || false}
              onChange={() => {}}
            />
            <label
              htmlFor={`check-${idx}`}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setCheckedItems((prev) => {
                  const newItems = [...prev];
                  newItems[idx] = {
                    itemSeq: item.itemSeq,
                    itemName: item.itemName,
                    isChecked: !prev[idx]?.isChecked,
                  };
                  return newItems;
                });
              }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </label>
            <div className="searchResultInfo">
              <p>{item.itemName}</p>
              <p>{item.entpName}</p>
            </div>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {bookmarkBox && (
          <motion.div
            className="addBookmark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span onClick={allCancel}>
              <FontAwesomeIcon icon={faXmarkCircle} />
              전체취소
            </span>
            <div></div>
            <span onClick={addBookmark}>
              <FontAwesomeIcon icon={faBookmark} />
              즐겨찾기추가
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      {alert && (
        <Alert
          message="즐겨찾기가 추가되었습니다"
          message2="즐겨찾기 이동"
          setAlert={setAlert}
        />
      )}
    </Container>
  );
};

export default SearchResult;
