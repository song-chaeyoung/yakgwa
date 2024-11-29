import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { searchDrugEfcyQesitm } from "../api";
import HomeTab from "../components/HomeTab";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { firstQuestion } from "../atoms";

const Container = styled.section`
  width: 100%;
  height: 100vh;
  background: var(--main-color);
  .home_top_search {
    height: 10.5rem;
    padding: 2.3rem 0.75rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
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
    position: fixed;
    top: 15.5rem;
    left: 0;
    right: 0;
    height: calc(100% - 15.5rem);
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
        &.active {
          background: #fed543;
          color: #fff;
        }
      }
    }
  }
`;

const categories = ["약품 추천", "영양제 추천"];

const Home = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const navigate = useNavigate();
  const setFirstQuestionInput = useSetRecoilState(firstQuestion);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const efcyItem = "비타민";

  const efcyQesitm = useQuery({
    queryKey: ["efcyQesitm", efcyItem],
    queryFn: () => searchDrugEfcyQesitm(efcyItem),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedValue === "") {
      alert("분야를 선택해주세요.");
      return;
    }
    const question = e.target[0].value;

    if (selectedValue === "drug") {
      navigate(`/result?q=${question}`);
    } else if (selectedValue === "ai") {
      setFirstQuestionInput(question);
      navigate(`/alanswer`);
    }
  };

  return (
    <Container>
      <div className="home_top_search">
        <div>
          <label htmlFor="search_type">
            <FontAwesomeIcon icon={faLocationDot} />
          </label>
          <select
            name="search_type"
            id="search_type"
            onChange={handleChange}
            value={selectedValue}
          >
            <option value="" disabled>
              분야 선택하기
            </option>
            <option value="drug">의약품검색</option>
            <option value="ai">AI질문</option>
          </select>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="어디가 아프신가요?" required />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
      <div className="home_btm_exam">
        <div className="home_category">
          {categories.map((category, index) => (
            <span
              key={index}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </span>
          ))}
        </div>
        <HomeTab selectedCategory={selectedCategory} />
      </div>
    </Container>
  );
};

export default Home;
