# Next.js 기초 연습

## 기본 정리

- app/page.tsx
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

- app/detail 폴더 / page.tsx 파일생성
  : http://localhost:3000/detail

  ```tsx
  import React from "react";
  const page = () => {
    return <div>page</div>;
  };

  export default page;
  ```

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
  : console.log 활용시 터미널 및 F12 console 탭참조

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
  : 이유는 Next.js 는 client component 는 컴포넌트 만들길 추천
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
  : 지역 css 적용
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

- API 서버 연동
