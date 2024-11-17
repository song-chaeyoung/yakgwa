import React from "react";
import { useLocation } from "react-router-dom";

const AlAnswer = () => {
  const { question } = useLocation();
  console.log(question);
  return <section>AlAnswer</section>;
};

export default AlAnswer;
