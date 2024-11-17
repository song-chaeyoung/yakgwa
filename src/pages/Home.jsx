import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faSearch } from "@fortawesome/free-solid-svg-icons";
const Container = styled.section`
  width: 100%;
  height: 100vh;
  /* height: calc(100vh - 60px); */
  background: var(--main-color);
  .home_top_search {
    /* height: fit-content; */
    height: 10.5rem;
    padding: 2.3rem 0.75rem;
    /* height: 30%; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
    /* align-items: center; */
    > div {
      color: #fff;
      display: flex;
      align-items: center;
      gap: 1rem;
      > label {
        font-size: 1.5rem;
      }
      > select {
        border: none;
        background: none;
        color: #fff;
        font-size: 1.125rem;
        padding-right: 1rem;
      }
    }
    > form {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      > input {
        width: 100%;
        border: none;
        background: #fff;
        padding: 0.7rem;
        border-radius: 0.625rem;
        font-size: 1rem;
      }
      > button {
        background: #fed543;
        border-radius: 0.625rem;
        border: none;
        color: #fff;
        padding: 0.7rem;
        cursor: pointer;
        font-size: 1rem;
      }
    }
  }
  .home_btm_exam {
    position: relative;
    /* height: 80%; */
    height: calc(100% - 10.5rem);
    border-radius: 3.5rem 0rem 0rem 0rem;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .home_category {
      position: absolute;
      top: 0;
      right: 0.75rem;
      display: flex;
      gap: 0.88rem;
      transform: translateY(-50%);
      /* justify-content: space-between; */
      /* padding: 1.5rem; */
      > span {
        padding: 0.875rem;
        border-radius: 0.625rem;
        background: #efefef;
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
        color: #666;
        font-size: 1rem;
        font-weight: 500;
        line-height: 100%;
        cursor: pointer;
      }
    }
    .home_symptom_list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 0 0.75rem;
      .home_symptom {
        padding: 1.12rem;
        display: flex;
        gap: 1.25rem;
        align-items: center;
        background: #efefef;
        border-radius: 1.25rem;
        .home_symptom_img {
          width: 5rem;
          height: 5rem;
          min-width: 5rem;
          background: #999;
          > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .home_symptom_desc {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          > h5 {
            font-size: 1.125rem;
            font-weight: 500;
            word-break: keep-all;
            line-height: 140%;
          }
          > p {
            font-size: 0.875rem;
            color: #666;
            &::after {
              content: " >";
            }
          }
        }
      }
    }
  }
`;

const Home = () => {
  return (
    <Container>
      <div className="home_top_search">
        <div>
          <label htmlFor="search_type">
            <FontAwesomeIcon icon={faLocationDot} />
          </label>
          <select name="search_type" id="search_type">
            <option value="1" selected>
              통합검색
            </option>
            <option value="2">의사검색</option>
            <option value="3">약국검색</option>
          </select>
        </div>
        <form action="">
          <input type="text" placeholder="어디가 아프신가요?" />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
      <div className="home_btm_exam">
        <div className="home_category">
          <span>카테고리</span>
          <span>카테고리</span>
          <span>카테고리</span>
        </div>
        <div className="home_symptom_list">
          <div className="home_symptom">
            <div className="home_symptom_img"></div>
            <div className="home_symptom_desc">
              <h5>메인증상 텍스트</h5>
              <p>서브증상 텍스트</p>
            </div>
          </div>
          <div className="home_symptom">
            <div className="home_symptom_img"></div>
            <div className="home_symptom_desc">
              <h5>메인증상 텍스트</h5>
              <p>서브증상 텍스트</p>
            </div>
          </div>
          <div className="home_symptom">
            <div className="home_symptom_img"></div>
            <div className="home_symptom_desc">
              <h5>메인증상 텍스트 메인증상 텍스트 메인증상 텍스트</h5>
              <p>AI에게 상담하기</p>``
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;