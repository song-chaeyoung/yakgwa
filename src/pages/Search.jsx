import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { searchKeyword } from "../atoms";
import {
  searchDrugEfcyQesitm,
  searchDrugEntpName,
  searchDrugName,
} from "../api";
import { useQueries } from "@tanstack/react-query";

const Conatiner = styled.section`
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  flex: 1;

  .topSearch {
    position: relative;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 0 10px;
    padding-top: 100px;
    > input {
      flex: 5;
      width: 100%;
      padding: 0.5rem 0.25rem;
      border: none;
      border-bottom: 2px solid var(--main-color);
      font-size: 28px;
      &::placeholder {
        color: #ccc;
        font-weight: 100;
      }
    }
    > button {
      flex: 1;
      width: 100%;
      background: var(--main-color);
      color: #fff;
      padding: 0.75rem 0.25rem;
      border: none;
      border-radius: 10px;
      font-size: 20px;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .searchInfo {
    position: absolute;
    top: 90%;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0.5rem 1rem;
    overflow-y: scroll;
    scrollbar-width: none;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    > p {
      font-weight: 350;
      line-height: 140%;
      font-size: 1.25rem;
      cursor: pointer;
    }
  }
  .btmList {
    height: 50%;
    background: var(--main-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    .searchList {
      padding: 0 10px;
      h3 {
        margin-bottom: 15px;
        color: #fff;
      }
      .searchList_items {
        display: flex;
        flex-wrap: wrap;
        gap: 8px 14px;
        span {
          line-height: 140%;
          background: #fff;
          padding: 4px 8px;
          color: var(--main-color);
          cursor: pointer;
        }
      }
    }
  }
`;

const oftenDrugs = [
  "피로회복",
  "항생제",
  "소염",
  "두통",
  "소화",
  "고혈압",
  "피부",
  "진통",
];

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const Search = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [keyword, setKeyword] = useRecoilState(searchKeyword);
  const [searching, setSearching] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    goResult(searchInput);
    setKeyword(searchInput);
  };

  const goResult = (item) => {
    navigate(`/result?q=${item}`);
  };

  const results = useQueries({
    queries: [
      {
        queryKey: ["drugName", searchInput],
        queryFn: () => searchDrugName(searchInput),
        enabled: !!searchInput?.trim(),
        select: (data) =>
          Array.isArray(data.body.items) ? data.body.items : [],
      },
      {
        queryKey: ["drugEfcy", searchInput],
        queryFn: () => searchDrugEfcyQesitm(searchInput),
        enabled: !!searchInput?.trim(),
        select: (data) =>
          Array.isArray(data.body.items) ? data.body.items : [],
      },
      {
        queryKey: ["drugEntp", searchInput],
        queryFn: () => searchDrugEntpName(searchInput),
        enabled: !!searchInput?.trim(),
        select: (data) =>
          Array.isArray(data.body.items) ? data.body.items : [],
      },
    ],
  });

  const data = results.map((result) => result.data || []);
  const searchResult = data.flat().slice(0, 10);

  return (
    <Conatiner>
      <form className="topSearch" onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setSearching(true)}
          onBlur={() => setSearching(false)}
          placeholder="약품명, 회사, 증상 입력"
        />
        <button type="submit">검색</button>
        <AnimatePresence>
          {searching && (
            <motion.div
              className="searchInfo"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {searchInput.length > 0 &&
                searchResult.map((item, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      goResult(item.itemName);
                      setKeyword(item.itemName);
                    }}
                  >
                    {item.itemName}
                  </p>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
      {searching ? (
        <div></div>
      ) : (
        <div className="btmList">
          <div className="searchDrugList searchList">
            <h3 className="searchDrugList_title searchList_title">
              자주 찾는 약물
            </h3>
            <div className="searchDrugList_items searchList_items">
              {oftenDrugs.map((it, idx) => (
                <span key={idx} onClick={() => goResult(it)}>
                  #{it}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </Conatiner>
  );
};

export default Search;
