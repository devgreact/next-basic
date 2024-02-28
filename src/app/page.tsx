import style from "@/app/styles/style.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>첫페이지</h1>
      <ul className={style.list}>
        <li>
          <Link href="/detail/daegu">대구</Link>
        </li>
        <li>
          <Link href="/detail/busan">부산</Link>
        </li>
        <li>
          <Link href="/detail/daegun">대전</Link>
        </li>
        <li>
          <Link href="/detail/gwangju">광주</Link>
        </li>
        <li>
          <Link href="/detail/seoul">서울</Link>
        </li>
        <li>
          <Link href="/detail/jeju">서울</Link>
        </li>
      </ul>
    </>
  );
}
