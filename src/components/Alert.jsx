import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background-color: #fff;
  padding: 0 !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  white-space: nowrap;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
  border-radius: 1rem;
  overflow: hidden;

  > div:nth-child(1) {
    flex: 1;
    font-size: 1.2rem;
    font-weight: 600;
    padding: 1.5rem 2rem 0;
  }
  > div:nth-child(2) {
    height: 100%;
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 0.01rem;
    > span {
      padding: 0.8rem 1rem;
      background: var(--main-color);
      flex: 1;
      color: #fff;
      text-align: center;
      cursor: pointer;
      &:nth-child(1) {
      }
    }
    > div {
      width: 1px;
      background: #fff;
    }
  }
`;

const Alert = ({ message, message2, setAlert }) => {
  const navigate = useNavigate();
  return (
    <AnimatePresence>
      <Container
        initial={{ transform: "translate(-50%, -100%)" }}
        animate={{ transform: "translate(-50%, -50%)" }}
        exit={{ transform: "translate(-50%, -100%)" }}
      >
        <div>{message}</div>
        <div>
          <span onClick={() => setAlert(false)}>확인</span>
          <div></div>
          <span onClick={() => navigate("/bookmark")}>{message2}</span>
        </div>
      </Container>
    </AnimatePresence>
  );
};

export default Alert;
