import { atom } from "recoil";

export const searchKeyword = atom({
  key: "searchKeyword",
  default: "",
});

export const drugData = atom({
  key: "drugData",
  default: {},
});

export const firstQuestion = atom({
  key: "firstQuestion",
  default: "",
});
