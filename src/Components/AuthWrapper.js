import React from "react";

function AuthWrapper(props) {
  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        height: "300px",
        width: "40vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 20,
        backdropFilter: "blur(10px)",
        // justifyContent: "center",
      }}
    >
      {props.children}
    </div>
  );
}

export default AuthWrapper;
