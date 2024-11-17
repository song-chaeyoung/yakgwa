import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.section`
  width: 100%;
  height: calc(100vh - 60px);
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  img {
    height: 10.625rem;
  }
  form {
    width: 100%;
    display: flex;
    gap: 0.75rem;
    input[type="text"] {
      flex: 6;
      width: 100%;
      padding: 0.75rem;
      border: none;
      border: 2px solid var(--main-color);
      text-align: center;
      &::placeholder {
        transition: all 0.3s;
      }
      &:focus {
        &::placeholder {
          color: transparent;
        }
      }
    }
    input[type="submit"] {
      flex: 1;
      width: 100%;
      padding: 0.75rem;
      border: none;
      background: var(--main-color);
      color: #fff;
      cursor: pointer;
    }
  }
  .question_home_text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    h3 {
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: -0.02rem;
    }
    p {
      font-size: 0.875rem;
      color: #666;
      text-align: justify;
      line-height: 140%;
      span {
        margin-left: 0.25rem;
        color: var(--main-color);
        font-weight: 700;
      }
    }
  }
`;

const Question = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm();

  const onVaild = (keyword) => {
    // e.preventDefault();
    // console.log(keyword);
    // const { question } = keyword;
    navigate(`/question?question=${keyword.question}`);
    setValue("question", "");
  };

  return (
    <Container>
      <img
        src="https://s3-alpha-sig.figma.com/img/6214/e692/57a365c1b29397f84ab5167f496a4afb?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NsCaVN83M2dYhPMtB0wkIUxF-kur~4RqP2aAMEVFxKgUIF6sd2Az5x2lOBCKqAmHngVDBIBTr4Nq8l8N-TEVQhZU~ScqjsSmKr0i-Lpexxj1WeF8nM9lXXsh3B4LfGFTcmRlBhn3DoShDkVmalWyCPIbTDrXIHrALPV34N7xcxI-acznxq0sb50hg9HHstvCtqL8fNB7o66WAgc97exRuhPyNJOgPaRoaMcjMK2Nm3i6TpxR4U~sIteVVp~3VYOj2aGS1fqPjAQ-UipFmFAQDHjuQc0~r18uH8VIQqYOn4VCM7s~BidK5Rk1cALBU0CrCVIgsh7n~b~LjR4zLsY~iQ__"
        alt="drugImg"
      />
      <form onSubmit={handleSubmit(onVaild)}>
        <input
          {...register("question", { required: true, minLength: 10 })}
          type="text"
          placeholder="어디가 아프신가요?"
        />
        <input type="submit" value="질문하기" />
      </form>
      <div className="question_home_text">
        <h3>AI한테 물어보세요!</h3>
        <p>
          약과에서 제공되는 정보는 일반적인 건강 정보로, 의학적 조언이나 진단을
          대신하지 않습니다. 정확한 진단과 치료를 위해서는
          <span>반드시 의료 전문가와 상담</span>하세요.
        </p>
      </div>
    </Container>
  );
};

export default Question;
