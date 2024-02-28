import Link from "next/link";
import style from "./style.module.css";
import { Todo } from "./type/todoType";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getTodoList = async () => {
  const res = await fetch(`${API_URL}/todos`);
  console.log(typeof res.status);
  if (res.status !== 200) {
    throw new Error("목록을 불러올 수 없습니다.");
  }
  return res.json();
};
export default async function Home() {
  const res = await getTodoList();
  console.log(res);
  return (
    <>
      <h1>main</h1>
      <ul className={style.list}>
        <li>
          <Link href="/seoul?name=서울">서울</Link>
        </li>
        <li>
          <Link href="/newyork">뉴욕</Link>
        </li>
        <li>
          <Link href="/lundom">런던</Link>
        </li>
      </ul>
      <div>
        {res.map((item: Todo) => (
          <div key={item.id}>
            {item.id} : <Link href={`/todo/${item.id}`}>{item.title}</Link>
          </div>
        ))}
      </div>
    </>
  );
}
