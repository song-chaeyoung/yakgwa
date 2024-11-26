import { faFaceSadCry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 100vh;
  > svg {
    font-size: 3rem;
    color: var(--main-color);
  }
  > h1 {
    font-size: 2rem;
  }
  > button {
    font-size: 1.25rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    background-color: var(--main-color);
    color: #fff;
    cursor: pointer;
  }
`;

const Error = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <FontAwesomeIcon icon={faFaceSadCry} />
      <h1>잘못된 접근입니다.</h1>
      <button onClick={() => navigate("/")}>홈으로</button>
    </Container>
  );
};

export default Error;
