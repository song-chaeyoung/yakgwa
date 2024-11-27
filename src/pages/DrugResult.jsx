import React, { useEffect } from "react";
import { drugData } from "../atoms";
import { useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchDrugName } from "../api";
import Loading from "../components/Loading";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding: 4rem 1.5rem 6rem;
  position: relative;
  .mainImg {
    width: 12.5rem;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  > div {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    font-size: 1.125rem;
    p:first-child {
      color: #666;
      margin-bottom: 0.5rem;
    }
    p:last-child {
      line-height: 1.4;
      letter-spacing: -0.0125rem;
      color: #333;
      /* word-break: keep-all; */
      font-weight: 500;
    }
  }
  .backArr {
    position: absolute;
    top: 5rem;
    left: 1.5rem;
    cursor: pointer;
    font-size: 1.5rem;
    color: #aaa;
  }
`;

const DrugResult = () => {
  const [drugInfo, setDrugInfo] = useRecoilState(drugData);
  const [searchParams] = useSearchParams();
  const keywordParams = searchParams.get("q");
  const navigate = useNavigate();

  const result = useQuery({
    queryKey: ["drugInfo", keywordParams],
    queryFn: () => searchDrugName(keywordParams),
    enabled: Object.keys(drugInfo || {}).length === 0,
  });
  const isLoading = result.isLoading;

  useEffect(() => {
    if (result.data) {
      setDrugInfo(result.data.body.items[0]);
    }
  }, [result.data]);

  if (isLoading) return <Loading />;

  return (
    <Container>
      <div className="mainImg">
        <img src="/drug.png" alt="drug" />
      </div>
      <div className="drugInfo">
        <div>
          <p>제품명</p>
          <p>{drugInfo.itemName}</p>
        </div>
        <div>
          <p>업체명</p>
          <p>{drugInfo.entpName}</p>
        </div>
        <div>
          <p>효능</p>
          <p>{drugInfo.efcyQesitm}</p>
        </div>
        <div>
          <p>사용법</p>
          <p>{drugInfo.useMethodQesitm}</p>
        </div>
        <div>
          <p>사용하기 전 알아야할 내용은?</p>
          <p>{drugInfo.atpnWarnQesitm}</p>
        </div>
        <div>
          <p>복용시 주의사항은?</p>
          <p>{drugInfo.atpnQesitm}</p>
        </div>
        <div>
          <p>사용하는 동안 주의해야 할 약 또는 음식은?</p>
          <p>{drugInfo.intrcQesitm}</p>
        </div>
        <div>
          <p>이 약의 부작용은?</p>
          <p>{drugInfo.seQesitm}</p>
        </div>
        <div>
          <p>어떻게 보관해야할까요?</p>
          <p>{drugInfo.depositMethodQesitm}</p>
        </div>
      </div>
      <div className="backArr" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
    </Container>
  );
};

export default DrugResult;
