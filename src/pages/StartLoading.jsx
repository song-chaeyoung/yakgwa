import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const Container = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  background: var(--main-color);
  color: #fff;
  font-weight: 550;
  z-index: 1000;
  p:nth-child(1) {
    font-family: "SDSamliphopangche_Outline";
    font-size: 4.375rem;
  }
  p:nth-child(2) {
    font-family: "Sandoll Samliphopangche";
    font-size: 1.875rem;
  }
`;

const variants = {
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5, // 사라질 때의 duration 설정
    },
  },
};

const StartLoading = () => {
  return (
    <Container
      key="loading"
      variants={variants}
      initial="exit"
      animate="animate"
      exit="exit"
    >
      <p>약과</p>
      <p>약과 함께하는 건강한 생활</p>
    </Container>
  );
};

export default StartLoading;
