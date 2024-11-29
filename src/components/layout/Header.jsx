import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import HeaderList from "./HeaderList";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: var(--main-color);
  color: #fff;
  z-index: 100;
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 30px;
    font-family: "SDSamliphopangche_Basic";
  }
  span {
    font-size: 26px;
    cursor: pointer;
  }
`;

const boxVariants = {
  initial: {
    opacity: 0,
    x: 300,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
  leaving: {
    opacity: 0,
    x: 300,
    transition: {
      duration: 0.3,
    },
  },
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HeaderContainer>
      <Link to={"/"}>
        <h1>약과</h1>
      </Link>
      <span onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={faBars} />
      </span>
      <AnimatePresence>
        {isOpen && (
          <HeaderList
            setIsOpen={setIsOpen}
            variants={boxVariants}
            initial="initial"
            animate="visible"
            exit="leaving"
          />
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header;
