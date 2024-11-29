import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 18.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 0.75rem;
  margin-bottom: 10rem;
  width: 100%;
  height: fit-content;
  .home_symptom {
    min-width: 100%;
    padding: 1.12rem;
    display: flex;
    gap: 1.25rem;
    align-items: center;
    background: #efefef;
    border-radius: 1.25rem;
    cursor: pointer;
    .home_symptom_img {
      width: 5rem;
      height: 5rem;
      min-width: 5rem;
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
        line-height: 120%;
      }
    }
  }
`;

const HomeTab = ({ selectedCategory }) => {
  const onClickEvent = () => {
    alert("아직 준비중인 서비스입니다.");
  };
  return (
    <Container className="home_symptom_list">
      <div className="home_symptom" onClick={onClickEvent}>
        <div className="home_symptom_img">
          <img
            src={
              selectedCategory === "약품 추천"
                ? "/mainIcon0.png"
                : "/mainIcon1.png"
            }
            alt="mainIcon"
          />
        </div>
        <div className="home_symptom_desc">
          <h5>
            {selectedCategory === "약품 추천"
              ? "감기 증상 완화를 위한 약"
              : "비타민 D 보충제"}
          </h5>
          <p>
            {selectedCategory === "약품 추천"
              ? "감기 증상 완화에 효과적인 약을 알아보세요. 타이레놀 콜드로 기침과 콧물, 두통을 완화해보세요."
              : "뼈 건강과 면역력 증진에 도움을 주는 비타민 D를 확인해보세요. 솔가 비타민 D3 1000IU로 건강을 지키세요."}
          </p>
        </div>
      </div>
      <div className="home_symptom" onClick={onClickEvent}>
        <div className="home_symptom_img">
          <img
            src={
              selectedCategory === "약품 추천"
                ? "/mainIcon2.png"
                : "/mainIcon3.png"
            }
            alt="mainIcon"
          />
        </div>
        <div className="home_symptom_desc">
          <h5>
            {selectedCategory === "약품 추천"
              ? "소화불량 개선 약"
              : "멀티비타민"}
          </h5>
          <p>
            {selectedCategory === "약품 추천"
              ? "소화가 안 될 때 훼스탈 플러스로 소화를 돕고 더부룩함을 해결하세요."
              : "균형 잡힌 영양 섭취가 부족할 때 센트룸 멀티비타민으로 전반적인 영양을 보충하세요."}
          </p>
        </div>
      </div>
      <div className="home_symptom" onClick={onClickEvent}>
        <div className="home_symptom_img">
          <img
            src={
              selectedCategory === "약품 추천"
                ? "/mainIcon4.png"
                : "/mainIcon5.png"
            }
            alt="mainIcon"
          />
        </div>
        <div className="home_symptom_desc">
          <h5>
            {selectedCategory === "약품 추천" ? "통증 완화 약" : "오메가-3"}
          </h5>
          <p>
            {selectedCategory === "약품 추천"
              ? "두통, 생리통 등 다양한 경증 통증에 타이레놀로 빠르게 완화하세요."
              : "혈액순환과 뇌 기능을 돕는 오메가-3를 섭취해 보세요. 뉴트리코어 오메가-3로 건강을 챙기세요."}
          </p>
        </div>
      </div>
    </Container>
  );
};

export default HomeTab;
