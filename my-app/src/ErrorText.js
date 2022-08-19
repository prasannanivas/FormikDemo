import React from "react";

const ErrorText = (props) => {
  console.log(props);
  return <div style={{ color: "red" }}> {props.children} </div>;
};

export default ErrorText;
