import {
  faHome,
  faQuestion,
  faSearch,
  faBookmark,
  faGear,
  faWrench,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Background = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const Container = styled(motion.div)`
  background: #fff;
  width: 70%;
  height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 101;
  > .header {
    position: relative;
    width: 100%;
    height: 150px;
    background: var(--main-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: "SDSamliphopangche_Basic";
    h3 {
      font-size: 36px;
    }
    p {
      font-size: 24px;
      text-align: center;
      line-height: 1.2;
      letter-spacing: 0.1em;
    }
  }
  .xmark {
    position: absolute;
    top: 15px;
    right: 22px;
    color: #fff;
    font-size: 26px;
    cursor: pointer;
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 30px;
    color: #aaa;
    padding: 30px;
    .headerList_icon {
      display: flex;
      align-items: center;
      gap: 16px;
      cursor: pointer;
      svg {
        font-size: 28px;
        width: 28px;
      }
      p {
        margin-top: 6px;
        font-size: 18px;
      }
    }
  }
`;

const iconList = [
  {
    icon: faHome,
    text: "홈",
    path: "/",
  },
  {
    icon: faQuestion,
    text: "질문",
    path: "/question",
  },
  {
    icon: faSearch,
    text: "검색",
    path: "/search",
  },
  {
    icon: faBookmark,
    text: "즐겨찾기",
    path: "/bookmark",
  },
  // {
  //   icon: faGear,
  //   text: "설정",
  // },
  // {
  //   icon: faWrench,
  //   text: "버전확인",
  // },
];

const HeaderList = ({ setIsOpen, variants }) => {
  const navigate = useNavigate();

  const move = (path) => {
    navigate(path);
    setIsOpen(false);
  };
  return (
    <Background>
      <Container
        variants={variants}
        initial="initial"
        animate="visible"
        exit="leaving"
      >
        <div className="header">
          <h3>약과</h3>
          <p>
            약과 함께하는 <br />
            건강한 생활
          </p>
        </div>
        <div className="xmark" onClick={() => setIsOpen(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <div className="content">
          {iconList.map((it) => (
            <div
              className="headerList_icon"
              onClick={() => move(it.path)}
              key={it.text}
            >
              <FontAwesomeIcon icon={it.icon} />
              <p>{it.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </Background>
  );
};

export default HeaderList;
