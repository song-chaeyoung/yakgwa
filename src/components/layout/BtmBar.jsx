import {
  faBookmark,
  faHouseChimney,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons/faMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 60px;
  background: #fff;
  box-shadow: 0px -2px 20px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    color: #aaa;
    cursor: pointer;
    > span {
      font-size: 18px;
    }
    p {
      font-family: "Noto Sans KR";
      font-size: 14px;
    }
    &.active {
      color: var(--main-color);
    }
  }
`;

const BtmBar = () => {
  const navigate = useNavigate();
  const homeMatch = useMatch("/");
  const question1Match = useMatch("/question");
  const searchHomeMatch = useMatch("/search");
  const searchDrugMatch = useMatch("/drugResult");
  const searchResultMatch = useMatch("/result");
  const bookmarkMatch = useMatch("/bookmark");
  const alAnswerMatch = useMatch("/alAnswer");
  const searchMatch = Boolean(
    searchHomeMatch || searchDrugMatch || searchResultMatch
  );

  const questionMatch = Boolean(question1Match || alAnswerMatch);

  return (
    <Container>
      <div className={homeMatch ? "active" : ""} onClick={() => navigate("/")}>
        <span>
          <FontAwesomeIcon icon={faHouseChimney} />
        </span>
        <p>홈</p>
      </div>
      <div
        className={questionMatch ? "active" : ""}
        onClick={() => navigate("/question")}
      >
        <span>
          <FontAwesomeIcon icon={faMessage} />
        </span>
        <p>질문</p>
      </div>
      <div
        className={searchMatch ? "active" : ""}
        onClick={() => navigate("/search")}
      >
        <span>
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <p>검색</p>
      </div>
      <div
        className={bookmarkMatch ? "active" : ""}
        onClick={() => navigate("/bookmark")}
      >
        <span>
          <FontAwesomeIcon icon={faBookmark} />
        </span>
        <p>즐겨찾기</p>
      </div>
    </Container>
  );
};

export default BtmBar;
