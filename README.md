# Next.js 기초 연습

## 기본 정리

- App Router 방식이라면 app 폴더가 Root
- app/page.tsx (첫 화면)
  : 루트 페이지
  : http://localhost:3000/

  ```tsx
  export default function Home() {
    return (
      <>
        <h1>첫페이지</h1>
        <ul>
          <li>대구</li>
          <li>부산</li>
          <li>대전</li>
          <li>광주</li>
          <li>서울</li>
        </ul>
      </>
    );
  }
  ```

- 정적라우팅(static router)
- app 폴더 안 폴더 구조로 구성해야합니다.
- app/detail 폴더 / page.tsx 파일생성
  : http://localhost:3000/detail

  ```tsx
  import React from "react";
  const page = () => {
    return <div>page</div>;
  };

  export default page;
  ```

- 동적 라우팅 (Dinamic Router)
- app 폴더 안에 반드시 하고, [변수] 폴더
- app/detail/[city] 폴더생성 page.tsx 파일생성
  : http://localhost:3000/detail/daegu
  : http://localhost:3000/detail/busan
  : http://localhost:3000/detail/daegun
  : http://localhost:3000/detail/gwangju
  : http://localhost:3000/detail/seoul
  : http://localhost:3000/detail/jeju

  ```tsx
  import React from "react";
  // 아.. 어렵다.
  type Props = {
    params: {
      city: string;
    };
  };

  const page = ({ params }: Props) => {
    return <div>상세내용 : {params.city}</div>;
  };

  export default page;
  ```

  ```ts
  import React from "react";
  // 아.. 어렵다.
  type Props = {
    params: {
      city: string;
    };
  };

  const page = ({ params }: Props) => {
    const cityName = params.city === "daegu" ? "대구" : "";
    return <div>상세내용 : {cityName}</div>;
  };

  export default page;
  ```

- 동적 라우팅 적용

  ```tsx
  import Link from "next/link";

  export default function Home() {
    return (
      <>
        <h1>첫페이지</h1>
        <ul>
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
  ```

- 정적 라우팅 적용

```tsx
import Link from "next/link";
import React from "react";
// 아.. 어렵다.
type Props = {
  params: {
    city: string;
  };
};

const page = ({ params }: Props) => {
  const cityName = params.city === "daegu" ? "대구" : params.city;
  return (
    <>
      <div>상세내용 : {cityName}</div>
      <Link href="/">이전페이지</Link>
    </>
  );
};

export default page;
```

- 참고사항
  : next.js 는 Server 의 콘솔(터미널) 확인
  : console.log 활용시 터미널 및 F12 console 탭 참조

- useRouter 활용하기
  : use 는 hook 입니다.
  : 이벤트 핸들러 활용
  : 필수로 클라이언트 컴포넌트라고 명시
  : `"use client"` (React 18버전)

  ```ts
  "use client";

  import { useRouter } from "next/navigation";
  // import Link from "next/link";
  import React from "react";

  // function ( parameter: 데이터 종류)
  // 1. const page = (받은값:Props) => {

  // function ( {속성:값}: 데이터 종류)
  // 2. const page = ({속성:값}:Props) => {

  // 약속된 속성명 params
  // 3. const page = ({params:params}:Props) => {

  // 축약형 적용
  // 4. const page = ({params}:Props) => {
  // type Props = {
  // // 키명 : {속성:값종류};
  // // params : {속성:값종류};
  // // params : {city:값종류};
  // // params: { city: string };
  // };

  type Props = {
    params: {
      city: string;
    };
  };

  const Detail = ({ params }: Props) => {
  const cityName = params.city === "daegu" ? "대구" : params.city;
  // 첫 페이지로 이동
  // 주의사항 : react-router-dom (X)
  // import { useRouter } from "next/navigation";
  const router = useRouter();
  const handleClick = () => {
  console.log("첫페이지로");
  router.push("/");
  };
  return (
    <>
      <div>상세내용 : {cityName}</div>
      {/_ <Link href="/">이전페이지</Link> _/}
      <button onClick={() => handleClick()}>이전으로</button>
    </>
  );
  };

  export default Detail;
  ```

- 버튼을 컴포넌트로 만들기
  : 이유 1. Next.js 서버컴포넌트가 기본입니다.
  : 이유 2. 서버 컴포넌트에는 클라이언트 컴포넌트(use, onC..) 배치가능
  : 이유 3. 클라이언트 컴포넌트(use, onC..)에 서버컴포넌트를 배치못함.
  : 이유 4. Next.js 는 client component 는 componets 폴더 컴포넌트 만들길 추천
  : "use client" 사용한 것은 가능하면 컴포넌트로 뽑기를 원합니다.
  : /app/components/폴더생성
  : /app/components/HomeButton.tsx 생성

  ```ts
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
  ```

  ```ts
  // "use client";
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
        <div>상세내용 : {cityName}</div>
        {/* <Link href="/">이전페이지</Link> */}
        {/* <button onClick={() => handleClick()}>이전으로</button> */}
        <HomeButton />
      </>
    );
  };

  export default Detail;
  ```

- Next.js 의 기본 컴포넌트는 서버 컴포넌트 이다.
  : use 류의 hook 과 이벤트 핸들러가 포함된 컴포넌트는 배치용으로 제작
  : 서버 컴포넌트에 import 해서 쓴다.
  : 반대는 안됩니다. (클라이언트 컴포넌트에 서버컴포넌트를 배치하며 오류발생)

- css 작업 해보기
  : global.css 에 기본 내용을 작성(앱 전체에 영향을 줌)
  : 파일명은 자유입니다.
  : 전역 기본 css 적용하기
  : 기본레이아웃은 layout.tsx 에 작성하면 적용.
  : next.js 는 레이아웃을 담당하는 파일
  : layout.tsx 에 적용 (import "./globals.css")

  ```css
  /* @tailwind base;
  @tailwind components;
  @tailwind utilities; */

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline-style: none;
  }
  ul,
  li {
    list-style: none;
  }
  a {
    color: #000;
    text-decoration: none;
  }
  html {
    font-size: 12px;
  }
  body {
  }
  button {
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 8px;
    padding: 4px 8px;
    background-color: hotpink;
    color: #fff;
  }
  ```

- 파일명.module.css 활용
  : 확장자는 .module.css
  : 지역(적용하는 컴포넌트에만) css 적용
  : 다른 css 와의 충돌을 제거하고 우선적 적용
  : 적용 후 실행하면 랜덤(유일)한 class 명을 생성
  : css 동일한 이름에 의한 문제가 발생되지 않는다.
  : /app/styles 폴더 만들기 / detail.module.css 생성

  ```css
  .detailTitle {
    color: #ff0000;
    font-weight: 900;
    font-size: 20px;
  }
  ```

  ```ts
  // @은 /src 를 가르키는 절대 경로입니다.
  // import from "@/app/styles/aaa.css";
  import style from "@/app/styles/detail.module.css";
  // js 처럼 작성해야 해요.
  <div className={style.detailTitle}>상세내용 : {cityName}</div>;
  ```

  : /app/page.tsx 에 파일명.module.css 적용해 보기
  : /app/styles/style.module.css 생성
  : Link 는 a 태그로 치환됨.

  ```css
  .list {
    position: relative;
    display: block;
    width: 80%;
    margin: 0 auto;
    background-color: skyblue;
  }
  .list li {
    font-size: 18px;
  }
  // <Link href="/">경로</Link>
  .list li:hover a {
    color: #ff0000;
  }
  ```

  ```tsx
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
  ```

- API 백엔드 서버 연동
  : [REST OPEN API](https://jsonplaceholder.typicode.com/)
  : 전체목록 https://jsonplaceholder.typicode.com/todos
  : Type 만들기

  - 손으로 작업하기

  ```json
  {
    "userId": 10,
    "id": 200,
    "title": "ipsam aperiam voluptates qui",
    "completed": false
  }
  ```

  ```ts
  export type TodoType = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  };
  ```

  - ChatGPT 작업하기

  ```txt
  {
    "userId": 10,
    "id": 200,
    "title": "ipsam aperiam voluptates qui",
    "completed": false
  }   타입스크립트 타입으로 만들어줘
  ```

  - 서비스 사이트 이용해서 작업하기
    : https://transform.tools/json-to-typescript

    ```ts
    export interface Root {
      userId: number;
      id: number;
      title: string;
      completed: boolean;
    }
    ```

- Next.js 내장된 fetch API 사용하기
  : React Query 처럼 좀.. 좋아요..
  : /app/page.tsx

  ```tsx
  import style from "@/app/styles/style.module.css";
  import Link from "next/link";

  // Open API 호출하기
  const getTodoList = async () => {
    // Next.js 에 내부 함수
    // 전체 목록
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    console.log(res);
    return res.json();
  };

  export default async function Home() {
    const res = await getTodoList();
    console.log("받은 데이터 : ", res);

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
  ```

- Next.js 에러처리하기

```tsx
import style from "@/app/styles/style.module.css";
import Link from "next/link";

// Open API 호출하기
const getTodoList = async () => {
  // Next.js 에 내부 함수
  // 전체 목록
  // 주소를 일부러 오류를 발생시켰습니다.
  const res = await fetch("https://jsonplaceholder.typicode.com/todos2");
  // console.log(res.status);
  // console.log(typeof res.status); // 데이터 종류
  if (res.status !== 200) {
    // 에러...
    throw new Error("데이터를 가지고 오는데 실패하였습니다.");
  } else {
    return res.json();
  }
};

export default async function Home() {
  const res = await getTodoList();
  console.log("받은 데이터 : ", res);
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
      <div>{/* 목록 출력하기 */}</div>
    </>
  );
}
```

- Next.js 에러 페이지 만들기
  : https://nextjs.org/docs/getting-started/project-structure
  : /app/error.tsx 생성 (약속이 된 파일명)

  ```tsx
  "use client";

  import { useEffect } from "react";

  type Props = {
    error: Error;
    reset: () => void;
  };
  const Error = ({ error, reset }: Props) => {
    useEffect(() => {
      console.log(error.message);
    });
    return (
      <>
        <h1>에러 페이지입니다. {error.message}</h1>
        <button
          onClick={() => {
            reset();
          }}
        >
          새로고침
        </button>
      </>
    );
  };

  export default Error;
  ```

- 데이터의 타입을 정의한다.
  : /app/type 폴더 만들기
  : /app/type/TodoType.ts
  : 가능하면 type 들은 모아서 관리

  ```ts
  export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }
  ```

  : /app/page.tsx

  ```tsx
  import style from "@/app/styles/style.module.css";
  import Link from "next/link";
  import { Todo } from "./type/TodoType";

  // Open API 호출하기
  const getTodoList = async () => {
    // Next.js 에 내부 함수
    // 전체 목록
    // 주소를 일부러 오류를 발생시켰습니다.
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    // console.log(res.status);
    // console.log(typeof res.status); // 데이터 종류
    if (res.status !== 200) {
      // 에러...
      throw new Error("데이터를 가지고 오는데 실패하였습니다.");
    } else {
      return res.json();
    }
  };

  export default async function Home() {
    const res = await getTodoList();
    // console.log("받은 데이터 : ", res);

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
        <div>
          {res.map((item: Todo) => (
            <div key={item.id}>
              id {item.userId} : {item.title}{" "}
            </div>
          ))}
        </div>
      </>
    );
  }
  ```

- Todo 상세페이지 이동하기
  : /app/todos 폴더 만들기
  : /app/todos/[id] 폴더 만들기
  : /app/todos/[id]/page.tsx 파일 만들기
  ```ts
  {
    res.map((item: Todo) => (
      <div key={item.id}>
        id {item.userId} : <Link href={`/todos/${item.id}`}>{item.title}</Link>
      </div>
    ));
  }
  ```
- Todo 상세페이지 출력하기
  : /app/todos/[id]/page.tsx

  ```tsx
  import React from "react";
  type Props = {
    params: {
      id: string;
    };
  };
  // Next.js 의 fetch 사용

  // Open API 호출하기
  const getTodoDetail = async (id: string) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    if (res.status !== 200) {
      throw new Error("상세 할일 정보를 가지고 오는데 실패하였습니다.");
    } else {
      return res.json();
    }
  };

  const TodoDetail = async ({ params }: Props) => {
    //   console.log(params.id);
    const res = await getTodoDetail(params.id);
    console.log(res);
    return (
      <div>
        할일 상세페이지 {res.id} : {res.title}{" "}
      </div>
    );
  };

  export default TodoDetail;
  ```

- 로딩창 생성하기
  : /app/loading.tsx 파일 생성

  ```tsx
  import React from "react";
  const Loading = () => {
    return <h1>loading</h1>;
  };
  export default Loading;
  ```

- 환경변수 파일 생성하기
  : 숨겨야 하는 정보 (API 키, 지도 키, FB 키...)
  : 반드시 / 생성함
  : .env.local 입니다.
  : 서버를 재실행하셔야 합니다.
  : REACT 와 NEXT 는 접두어가 달라요.

  ```txt
    NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
  ```

  : /app/page.tsx

  ```tsx
  import style from "@/app/styles/style.module.css";
  import Link from "next/link";
  import { Todo } from "./type/TodoType";

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Open API 호출하기
  const getTodoList = async () => {
    // Next.js 에 내부 함수
    // 전체 목록
    // 주소를 일부러 오류를 발생시켰습니다.
    const res = await fetch(`${API_URL}/todos`);
    // console.log(res.status);
    // console.log(typeof res.status); // 데이터 종류
    if (res.status !== 200) {
      // 에러...
      throw new Error("데이터를 가지고 오는데 실패하였습니다.");
    } else {
      return res.json();
    }
  };

  export default async function Home() {
    const res = await getTodoList();
    // console.log("받은 데이터 : ", res);

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
        <div>
          {res.map((item: Todo) => (
            <div key={item.id}>
              id {item.userId} : <Link href={`/todos/${item.id}`}>{item.title}</Link>
            </div>
          ))}
        </div>
      </>
    );
  }
  ```

  : /app/todos/[id]/page.tsx

  ```tsx
  import React from "react";
  type Props = {
    params: {
      id: string;
    };
  };

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Next.js 의 fetch 사용

  // Open API 호출하기
  const getTodoDetail = async (id: string) => {
    const res = await fetch(`${API_URL}/todos/${id}`);
    if (res.status !== 200) {
      throw new Error("상세 할일 정보를 가지고 오는데 실패하였습니다.");
    } else {
      return res.json();
    }
  };

  const TodoDetail = async ({ params }: Props) => {
    //   console.log(params.id);
    const res = await getTodoDetail(params.id);
    console.log(res);
    return (
      <div>
        할일 상세페이지 {res.id} : {res.title}{" "}
      </div>
    );
  };

  export default TodoDetail;
  ```

- 혼자서 연습해 보기
  : 고양이 https://thecatapi.com/
  : 지브리 https://ghibliapi.vercel.app/
  : 날씨 https://www.weatherapi.com/
  : 포켓몬 https://pokeapi.co/

- MetaData 적용하기 1. (정적 Static )
  : /app/layout.tsx 에 기본 내용

  ```tsx
  import type { Metadata } from "next";
  import { Inter } from "next/font/google";
  import "./globals.css";

  const inter = Inter({ subsets: ["latin"] });

  export const metadata: Metadata = {
    title: "타이틀 - 연습",
    description: "연습하고 있습니다. ^^",
  };

  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    );
  }
  ```

- MetaData 적용하기 2. (동적 Dynamic )
  : /app/detail/[city]/page.tsx

  ```tsx
  import style from "@/app/styles/detail.module.css";
  import HomeButton from "@/app/components/HomeButton";
  type Props = {
    params: {
      city: string;
    };
  };
  // 동적 MetaData
  export function generateMetadata({ params }: Props) {
    return {
      title: `새로운 타이틀 - ${params.city}`,
      description: `${params.city} : 연습하고 있습니다. ^^`,
    };
  }

  const Detail = ({ params }: Props) => {
    const cityName = params.city === "daegu" ? "대구" : params.city;
    return (
      <>
        <div className={style.detailTitle}>상세내용 : {cityName}</div>

        <HomeButton />
      </>
    );
  };

  export default Detail;
  ```

- MetaData 적용하기 3. (동적 Dynamic : SearchParams 활용 )
  : /app/page.tsx

  ```tsx
  import style from "@/app/styles/style.module.css";
  import Link from "next/link";
  import { Todo } from "./type/TodoType";

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Open API 호출하기
  const getTodoList = async () => {
    // Next.js 에 내부 함수
    // 전체 목록
    // 주소를 일부러 오류를 발생시켰습니다.
    const res = await fetch(`${API_URL}/todos`);
    // console.log(res.status);
    // console.log(typeof res.status); // 데이터 종류
    if (res.status !== 200) {
      // 에러...
      throw new Error("데이터를 가지고 오는데 실패하였습니다.");
    } else {
      return res.json();
    }
  };

  export default async function Home() {
    const res = await getTodoList();
    // console.log("받은 데이터 : ", res);

    return (
      <>
        <h1>첫페이지</h1>
        <ul className={style.list}>
          <li>
            <Link href="/detail/daegu?cityName=대구">대구</Link>
          </li>
          <li>
            <Link href="/detail/busan?cityName=부산">부산</Link>
          </li>
          <li>
            <Link href="/detail/daegun?cityName=대전">대전</Link>
          </li>
          <li>
            <Link href="/detail/gwangju?cityName=광주">광주</Link>
          </li>
          <li>
            <Link href="/detail/seoul?cityName=서울">서울</Link>
          </li>
          <li>
            <Link href="/detail/jeju?cityName=제주">제주</Link>
          </li>
        </ul>
        <div>
          {res.map((item: Todo) => (
            <div key={item.id}>
              id {item.userId} : <Link href={`/todos/${item.id}`}>{item.title}</Link>
            </div>
          ))}
        </div>
      </>
    );
  }
  ```

  : /app/detail/[city]/page.tsx

  ```tsx
  import style from "@/app/styles/detail.module.css";
  import HomeButton from "@/app/components/HomeButton";
  type Props = {
    params: {
      city: string;
    };
    searchParams: {
      cityName: string;
    };
  };
  // 동적 MetaData
  export function generateMetadata({ params, searchParams }: Props) {
    return {
      title: `새로운 타이틀 - ${searchParams.cityName}`,
      description: `${params.city} : 연습하고 있습니다. ^^`,
    };
  }

  const Detail = ({ params, searchParams }: Props) => {
    // const cityName = params.city === "daegu" ? "대구" : params.city;
    return (
      <>
        <div className={style.detailTitle}>상세내용 : {searchParams.cityName}</div>

        <HomeButton />
      </>
    );
  };

  export default Detail;
  ```

- 배포하기 (Deploy)
  : 인터넷 주소로 접근하기.
  : https://vercel.com/
