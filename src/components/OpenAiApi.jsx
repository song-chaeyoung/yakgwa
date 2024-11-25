import React, { useState } from "react";

const ChatGPTComponent = () => {
  const [input, setInput] = useState(""); // 사용자 입력 값
  const [response, setResponse] = useState(""); // ChatGPT 응답 값
  const [loading, setLoading] = useState(false); // 로딩 상태
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  // API 호출 함수
  const callChatGPT = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo", // 사용할 모델 선택
            messages: [
              { role: "system", content: "You are a helpful assistant." }, // 시스템 역할 설정
              { role: "user", content: input }, // 사용자 메시지
            ],
            max_tokens: 150, // 응답의 최대 토큰 길이
          }),
        }
      );

      if (!response.ok) {
        throw new Error("API 요청 실패");
      }

      const data = await response.json();
      setResponse(data.choices[0].message.content); // 응답 데이터 설정
    } catch (error) {
      console.error("오류 발생:", error);
      setResponse("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>ChatGPT와 대화</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="질문을 입력하세요..."
        rows="4"
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <button onClick={callChatGPT} disabled={loading}>
        {loading ? "응답 기다리는 중..." : "질문 보내기"}
      </button>
      <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        <h3>응답:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default ChatGPTComponent;
