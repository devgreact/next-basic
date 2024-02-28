"use client";
import { useRouter } from "next/navigation";
import React from "react";

const HomeButton = () => {
  // 첫 페이지로 이동
  // 주의사항 : react-router-dom (X)
  // import { useRouter } from "next/navigation";
  const router = useRouter();
  const handleClick = () => {
    console.log("첫페이지로");
    router.push("/");
  };
  return <button onClick={() => handleClick()}>이전으로</button>;
};

export default HomeButton;
