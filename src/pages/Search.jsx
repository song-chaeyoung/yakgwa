import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Conatiner = styled.section`
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  flex: 1;
  > div {
    /* flex: 1; */
    /* height: 50%; */
  }
  .topSearch {
    position: relative;
    height: 50%;
    /* margin: 50px 0; */
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
    top: 75%;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0.5rem 1rem;
    overflow-y: scroll;
    scrollbar-width: none;
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
    /* padding: 5rem 0; */
    .searchList {
      padding: 0 10px;
      h3 {
        /* font-size: 14px; */
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
        }
      }
    }
  }
`;

const searchResult = [
  "두통",
  "소화제",
  "고혈압",
  "피부염",
  "소염제",
  "항생제",
  "두통",
  "소화제",
  "고혈압",
  "피부염",
  "소염제",
  "항생제",
];

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [searching, setSearching] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/result?q=${keyword}`);
  };

  const searchKeyword = (item) => {
    navigate(`/result?q=${item}`);
  };

  return (
    <Conatiner>
      <form className="topSearch" onSubmit={handleSubmit}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setSearching(true)}
          onBlur={() => setSearching(false)}
          placeholder="병원, 약품, 키워드 입력"
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
              {searchResult.map((item, index) => (
                <p key={index} onClick={() => searchKeyword(item)}>
                  {item}
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
              <span>#피로회복제</span>
              <span>#항생제</span>
              <span>#소염제</span>
              <span>#두통약</span>
              <span>#소화제</span>
              <span>#고혈압약</span>
              <span>#피부연고</span>
              <span>#진통제</span>
            </div>
          </div>
          <div className="searchHospitalList searchList">
            <h3 className="searchDrugList_title searchList_title">
              추천 병원 검색
            </h3>
            <div className="searchDrugList_items searchList_items">
              <span>#피로회복제</span>
              <span>#항생제</span>
              <span>#소염제</span>
              <span>#두통약</span>
              <span>#소화제</span>
              <span>#고혈압약</span>
              <span>#피부연고</span>
              <span>#진통제</span>
            </div>
          </div>
        </div>
      )}
    </Conatiner>
  );
};

export default Search;
