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
import { faCheck, faSearch } from "@fortawesome/free-solid-svg-icons";
import { drugData, searchKeyword } from "../atoms";
import { useRecoilState } from "recoil";
import { getSearchDrugList } from "../api";

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
      .searchResult-info {
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
`;

const SearchResult = () => {
  const [keyword, setKeyword] = useRecoilState(searchKeyword);
  const [searchParams] = useSearchParams();
  const keywordParams = searchParams.get("q");
  const [input, setInput] = useState(keywordParams);
  const [drugInfo, setDrugInfo] = useRecoilState(drugData);
  const navigate = useNavigate();

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
  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  const data = results.map((result) => result.data || []);
  const searchResult = data.flat();

  // console.log(keyword);

  if (isLoading) return <Loading />;
  if (isError) return <section>Error: {isError.message}</section>;

  const searchEvent = (e) => {
    e.preventDefault();
    setKeyword(input);
    navigate(`/result?q=${input}`);
  };

  const goDrugResult = (item) => {
    setDrugInfo(item);
    // console.log(item);
    navigate(`/drugresult?q=${item.itemName}`);
  };

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
            <input type="checkbox" name={`check-${idx}`} id={`check-${idx}`} />
            <label htmlFor={`check-${idx}`}>
              <FontAwesomeIcon icon={faCheck} />
            </label>
            <div className="searchResult-info">
              <p>{item.itemName}</p>
              <p>{item.entpName}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default SearchResult;
