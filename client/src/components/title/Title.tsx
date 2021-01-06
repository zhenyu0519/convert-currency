import React from "react";
import "./title.css";
interface Props {
  title: String;
}

export const Title: React.FC<Props> = ({ title }) => {
  return <h1>{title}</h1>;
};
