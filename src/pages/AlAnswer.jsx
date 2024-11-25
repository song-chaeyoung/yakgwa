import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { firstQuestion } from "../atoms";
import { useQueries } from "@tanstack/react-query";

const Container = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  .answer_section {
    height: calc(100% - 200px);
    overflow-y: auto;
    display: flex;
    padding: 0 1rem;
    flex-direction: column;
    justify-content: flex-end;
    gap: 1rem;
    > div {
      display: flex;
      padding: 1.25rem;
      justify-content: center;
      align-items: center;
      border-radius: 1rem;
      max-width: 80%;
      line-height: 140%;
    }
    .question {
      align-self: flex-end;
      border: 1px solid var(--main-color);
    }
    .answer {
      align-self: flex-start;
      background: var(--main-color);
      color: #efefef;
    }
  }
  .question_section {
    width: 100%;
    position: fixed;
    bottom: 90px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0 1rem;
    height: 5rem;
    background: #fff;
    > textarea {
      height: 100%;
      flex: 3;
      border: 1px solid var(--main-color);
      border-radius: 0.375rem;
      background: #fff;
      padding: 0.625rem;
      resize: none;
      &:focus {
        outline: none;
      }
    }
    > button {
      height: 100%;
      flex: 1;
      border: none;
      border-radius: 0.375rem;
      background: var(--main-color);
      color: #fff;
      line-height: 140%;
      font-size: 1rem;
      cursor: pointer;
    }
  }
`;

const AlAnswer = () => {
  const firstQuestionInput = useRecoilValue(firstQuestion);
  const [talk, setTalk] = useState([
    { type: "question", message: firstQuestionInput },
  ]);

  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const getGPTResponse = async (questionText) => {
    setLoading(true);
    try {
      const messageHistory = talk.map((item) => ({
        role: item.type === "question" ? "user" : "assistant",
        content: item.message,
      }));

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a knowledgeable assistant and must only provide answers related to medical information. Always include the following disclaimer at the end of your responses: ' 약과에서 제공되는 정보는 일반적인 건강 정보로, 의학적 조언이나 진단을 대신하지 않습니다.'",
              },
              ...messageHistory,
              { role: "user", content: questionText },
            ],
            max_tokens: 300,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("API 요청 실패");
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("오류 발생:", error);
      return "오류가 발생했습니다. 다시 시도해주세요.";
    } finally {
      setLoading(false);
    }
  };

  // talk 배열이 변경될 때마다 마지막 질문에 대한 답변 받아오기
  useEffect(() => {
    const getAnswer = async () => {
      const lastMessage = talk[talk.length - 1];
      if (
        lastMessage?.type === "question" &&
        !loading &&
        lastMessage?.message.length > 0
      ) {
        const answer = await getGPTResponse(lastMessage.message);
        setTalk((prev) => [...prev, { type: "answer", message: answer }]);
      }
    };

    getAnswer();
  }, [talk]);

  // 새 질문 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setTalk((prev) => [...prev, { type: "question", message: input }]);
    setInput("");
  };

  return (
    <Container>
      <div className="answer_section">
        {talk.map((it, idx) => {
          return (
            <div
              className={it.type === "question" ? "question" : "answer"}
              key={idx}
            >
              {it.message}
            </div>
          );
        })}
      </div>
      <form className="question_section" onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <button type="submit" disabled={loading}>
          질문
          <br />
          하기
        </button>
      </form>
    </Container>
  );
};

export default AlAnswer;
