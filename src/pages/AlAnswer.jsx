import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { firstQuestion } from "../atoms";

const Container = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  .answer_section {
    height: calc(100% - 170px);
    overflow-y: auto;
  }
  .question_section {
    width: 100%;
    position: fixed;
    bottom: 90px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0 1rem;
    height: 5rem;
    background: #fff;
    > textarea {
      height: 100%;
      flex: 3;
      border: 1px solid var(--main-color);
      border-radius: 0.375rem;
      background: #fff;
      padding: 0.625rem;
      resize: none;
      &:focus {
        outline: none;
      }
    }
    > button {
      height: 100%;
      flex: 1;
      border: none;
      border-radius: 0.375rem;
      background: var(--main-color);
      color: #fff;
      line-height: 140%;
      font-size: 1rem;
      cursor: pointer;
    }
  }
`;

const qna = [];

const AlAnswer = () => {
  const firstQuestionInput = useRecoilValue(firstQuestion);
  console.log(firstQuestionInput);
  return (
    <Container>
      <div className="answer_section">
        <div className="ai_answer">{firstQuestionInput}</div>
      </div>
      <form className="question_section">
        <textarea name="" id=""></textarea>
        <button type="submit">
          질문
          <br />
          하기
        </button>
      </form>
    </Container>
  );
};

export default AlAnswer;
