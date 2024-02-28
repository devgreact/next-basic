// "use client";
// @은 /src 를 가르키는 절대 경로입니다.
import style from "@/app/styles/detail.module.css";
import HomeButton from "@/app/components/HomeButton";
// import Link from "next/link";

// function ( parameter: 데이터 종류)
// 1. const page = (받은값:Props) => {

// function ( {속성:값}: 데이터 종류)
// 2. const page = ({속성:값}:Props) => {

// 약속된 속성명 params
// 3. const page = ({params:params}:Props) => {

// 축약형 적용
// 4. const page = ({params}:Props) => {
// type Props = {
//   // 키명 : {속성:값종류};
//   // params : {속성:값종류};
//   // params : {city:값종류};
//   // params: { city: string };
// };

type Props = {
  params: {
    city: string;
  };
};

const Detail = ({ params }: Props) => {
  const cityName = params.city === "daegu" ? "대구" : params.city;
  return (
    <>
      <div className={style.detailTitle}>상세내용 : {cityName}</div>
      {/* <Link href="/">이전페이지</Link> */}
      {/* <button onClick={() => handleClick()}>이전으로</button> */}
      <HomeButton />
    </>
  );
};

export default Detail;
