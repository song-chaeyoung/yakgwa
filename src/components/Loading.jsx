import React from "react";
import styled from "styled-components";
import PulseLoader from "react-spinners/PulseLoader";

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#3E8AFA",
};

const Loading = () => {
  return (
    <Container>
      <PulseLoader cssOverride={override} color="#3E8AFA" size={20} />
    </Container>
  );
};

export default Loading;
