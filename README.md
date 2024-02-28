# Next 13.5.6 진행

## 1. 파일 시스템 기반의 라우팅 지원(App Router)

- 디렉토리 구조에 따라 라우팅 구조가 달라진다.
- 예전에는 pages 폴더에 구성을 하였다.
- 이제는 app 폴더에 구성을 하는 것에 따라서 달라진다.

## 2. 서버 컴포넌트(React Server Component : RSC)

- React 18에서 도입
- 필요한 이유는 데잍터 페칭에서 성능상에 잇점이 있다.
- 보안상의 이점
- 랜더링 되어진 정보를 캐싱에 이점
- 자바스크립트 번들의 크기가 감소.
- 서버 컴포넌트는 서버에서 완성된 파일을 내려줌.
- 이전 방식 보다는 용량이 줄어든다.
- hook, eventListener 를 쓸수 없다.

## 3. 서버 컴포넌트와 다른 방식 즉, 기존 방식을 클라이언트 컴포넌트라고 한다.

- 클라이언트 컴포넌트는 'use client' 를 직접 작성해서 사용해야 한다.
- 키워드를 써서 사용하는 경우 조심해야 하는 것은 클라이언트 컴포넌트에서 서버 컴포넌트를 import 할 수 없다.
- 클라이언트 컴포넌트에서 서버 컴포넌트를 사용해야 하는 경우 Props 를 사용해야 한다.
- 클라이언트 컴포넌트는 CSR 컴포넌트 즉 클라이언트에서만 실행되는 컴포넌트가 아니다.
- 클라이언트 컴포넌트도 SSR, SSG 방식으로 렌더링 가능
- 서버에서 컴포넌트를 미리 랜더링 해 두는 것을 말함.
- 클라이언트 컴포넌트는 트리의 끝으로 보내라.

## 라우팅 (경로 지정하기)

- 파일 시스템 방식으로 지정하고 app 폴더 안에 작성한다.
- 폴더 이름을 따르는 URL path 를 정의할 수 있다.
- 파일명이 미리 약속이 되어 있다.
- app/dashboard/page.tsx (세그먼트)
- https://localhost:3000/dashboard 를 하면 page.tsx 를 보여준다.

- 파일이름이 미리 정의되어 있다.
  : page.tsx 는 성공적으로 페이지가 성공적일 때
  : error.tsx
  : loading.tsx
  : layout.tsx

- 동적으로 변할 수 있는 URL Path (다이나믹 라우터)
  : app/blog/[id]/page.tsx
  : [id] 가 동적 라우터

## 페이지 간의 이동

- Link 컴포넌트 사용하기
- useRouter 사용하기 : 버튼 등에 사용/클라이언트 컴포넌트로 만들어야 함.

## 스타일링

- CSS Modules 등 여러가지 방식을 사용할 수 있다. (.modue.css)
- 전역 스타일링 (global.css)

## 데이터 패칭

- 웹 애플리케이션에서 데이터 패칭은 중요하다.
- Next.js 에서 Fetch API 에서 제공한다.
- 데이터를 캐싱하고 있다.
- 데이터 재검증(Revalidating) : 새로운 데이터 가져오기
  : 시간 기반 재검증, 온디맨드 재검증(수요가 있을 때 재검증)

## 메터데이터

- 페이지를 설명하는 용도
- 카카오, 페이스 북등.
- 정의하는 방법을 2개 정도 제시
- 정적 메터 데이터 설정 (mentadata 객체를 설정하는 형식)
- 동적 메터 데이터 설정 (mentadata 객체를 설정하는 동적 함수 형식 generateMetadat 함수)

## 실습 1.

- app/page.tsx 수정

```tsx
export default function Home() {
  return <h1>main</h1>;
}
```

- app/global.css 수정

- 실행: yarn dev

## 실습 2.

- app/page.tsx

```tsx
export default function Home() {
  return (
    <>
      <h1>main</h1>
      <ul>
        <li>서울</li>
        <li>뉴욕</li>
        <li>일본</li>
      </ul>
    </>
  );
}
```

## 실습 3.

- app/detail 폴더 생성
- app/detail/page.tsx

```tsx
export default function Detail(): JSX.Element {
  return (
    <>
      <h1>Detail</h1>
    </>
  );
}
```

- app router 확인
- http://localhost:3000/detail

## 실습 4. 동적 라우팅 적용해보기 1

- app/detail/page.tsx

```tsx
type Props = {
  params: {
    location: string;
  };
};
export default function Detail({ params }: Props): JSX.Element {
  return (
    <>
      <h1>Detail {params.location}</h1>
    </>
  );
}
```

- app router 확인
- http://localhost:3000/detail

## 실습 5. 동적 라우팅 적용해보기 2

- app/[location]/page.tsx 으로 변경하기

```tsx
type Props = {
  params: {
    location: string;
  };
};
export default function Detail({ params }: Props): JSX.Element {
  const city = params.location === "seoul" ? "서울" : "";
  return (
    <>
      <h1>Detail : {city}</h1>
    </>
  );
}
```

- app router 확인
- http://localhost:3000/seoul

## 실습 5. 동적 라우팅 적용해보기 3

- Link 컴포넌트 이용해 보기

- app/page.tsx

```tsx
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>main</h1>
      <ul>
        <li>
          <Link href="/seoul">서울</Link>
        </li>
        <li>
          <Link href="/newyork">뉴욕</Link>
        </li>
        <li>
          <Link href="/lundom">런던</Link>
        </li>
      </ul>
    </>
  );
}
```

- app router 확인
- http://localhost:3000/

## 실습 5. 동적 라우팅 적용해보기 4

- Link 컴포넌트 이용해 보기
- app/[location]/page.tsx 으로 변경하기

```tsx
import Link from "next/link";

type Props = {
  params: {
    location: string;
  };
};
export default function Detail({ params }: Props): JSX.Element {
  const city = params.location === "seoul" ? "서울" : "";

  const handleClick = () => {
    console.log("뒤로가기");
  };

  return (
    <>
      <h1>Detail : {city}</h1>
      <Link href="/">홈</Link>
      <button onClick={handleClick}>홈</button>
    </>
  );
}
```

- app router 확인
- http://localhost:3000/seoul

## 실습 5. 동적 라우팅 적용해보기 5

- onClick 이벤트 자체, 즉 이벤트가 들어가는 행위자체가 서버컴포넌트가 허용하지 않음.
  : 'use client' 를 작성해 주어야 함.

- app/[location]/page.tsx 으로 변경하기

```tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  params: {
    location: string;
  };
};
export default function Detail({ params }: Props): JSX.Element {
  const city = params.location === "seoul" ? "서울" : "";

  const router = useRouter();

  const handleClick = () => {
    console.log("뒤로가기");
    router.push("/");
  };

  return (
    <>
      <h1>Detail : {city}</h1>
      <Link href="/">홈</Link>
      <button onClick={handleClick}>홈</button>
    </>
  );
}
```

- app router 확인
- http://localhost:3000/seoul

## 실습 5. 동적 라우팅 적용해보기 6

- 클라이언트 컴포넌트는 별도로 빼주자.
- /components 폴더 만들기
- HomeButton.tsx 생성

```tsx
"use client";
import { useRouter } from "next/navigation";

export default function HomeButton() {
  const router = useRouter();

  const handleClick = () => {
    console.log("뒤로가기");
    router.push("/");
  };
  return <button onClick={handleClick}>홈</button>;
}
```

## 실습 5. 동적 라우팅 적용해보기 7

```tsx
import HomeButton from "@/components/HomeButton";
import Link from "next/link";

type Props = {
  params: {
    location: string;
  };
};
export default function Detail({ params }: Props): JSX.Element {
  const city = params.location === "seoul" ? "서울" : "";

  return (
    <>
      <h1>Detail : {city}</h1>
      <Link href="/">홈</Link>
      <HomeButton />
    </>
  );
}
```

## 실습 6. 간단한 스타일 입력하기 1

- 스타일 전역 코드 만들기
- /app/style.module.css 파일 생성

```css
.list {
  list-style: none;
  padding: 0;
}
.list li {
  font-size: 14px;
  line-height: 1.3;
}
.list li a {
  text-decoration: none;
  color: hotpink;
}
```

```tsx
import Link from "next/link";
import style from "./style.module.css";

export default function Home() {
  return (
    <>
      <h1>main</h1>
      <ul className={style.list}>
        <li>
          <Link href="/seoul">서울</Link>
        </li>
        <li>
          <Link href="/newyork">뉴욕</Link>
        </li>
        <li>
          <Link href="/lundom">런던</Link>
        </li>
      </ul>
    </>
  );
}
```

## 실습 6. 간단한 스타일 입력하기 2

- 스타일 글로벌 코드 만들기
- /app/global.css 파일 생성

```css
/* @tailwind base;
@tailwind components;
@tailwind utilities; */

button {
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 8px;
  background-color: blue;
  color: #fff;
}
```

## 실습 7. 날씨 API 사용해 보기 1

- [날씨API](https://www.weatherapi.com/)
- http://api.weatherapi.com/v1/current.json?key=키값&q=Seoul&aqi=no
- http://api.weatherapi.com/v1/forecast.json?key=키값&q=Seoul&days=1&aqi=no&alerts=no
- 타입 스크립트 타입 만들기
  :[https://transform.tools/json-to-typescript](hhttps://transform.tools/json-to-typescript)

```ts
export interface Root {
  location: Location;
  current: Current;
}

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface Current {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

export interface Condition {
  text: string;
  icon: string;
  code: number;
}
```

## 실습 7. 날씨 API 사용해 보기 2 (날씨 데이터 조회하기)

- 결과는 터미널에서 확인
- app/page.tsx

```tsx
import Link from "next/link";
import style from "./style.module.css";

const getCurrentWeather = async () => {
  const res = await fetch("http://api.weatherapi.com/v1/current.json?key=키값&q=Seoul&aqi=no");
  return res.json();
};

export default async function Home() {
  const res = await getCurrentWeather();
  console.log(res);
  return (
    <>
      <h1>main</h1>
      <ul className={style.list}>
        <li>
          <Link href="/seoul">서울</Link>
        </li>
        <li>
          <Link href="/newyork">뉴욕</Link>
        </li>
        <li>
          <Link href="/lundom">런던</Link>
        </li>
      </ul>
    </>
  );
}
```

## 실습 7. 날씨 API 사용해 보기 3 (환경변수 다루기 1)

```tsx
import Link from "next/link";
import style from "./style.module.css";

const API_KEY = "키값";
const getCurrentWeather = async () => {
  const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Seoul&aqi=no`);
  return res.json();
};

export default async function Home() {
  const res = await getCurrentWeather();
  console.log(res);
  return (
    <>
      <h1>main</h1>
      <ul className={style.list}>
        <li>
          <Link href="/seoul">서울</Link>
        </li>
        <li>
          <Link href="/newyork">뉴욕</Link>
        </li>
        <li>
          <Link href="/lundom">런던</Link>
        </li>
      </ul>
    </>
  );
}
```

## 실습 7. 날씨 API 사용해 보기 3 (환경변수 다루기 2)

- /.env.local 파일 생성

```txt
NEXT_PUBLIC_API_KEY=키값
```

```tsx
import Link from "next/link";
import style from "./style.module.css";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const getCurrentWeather = async () => {
  const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Seoul&aqi=no`);
  return res.json();
};

export default async function Home() {
  const res = await getCurrentWeather();
  console.log(res);
  return (
    <>
      <h1>main</h1>
      <ul className={style.list}>
        <li>
          <Link href="/seoul">서울</Link>
        </li>
        <li>
          <Link href="/newyork">뉴욕</Link>
        </li>
        <li>
          <Link href="/lundom">런던</Link>
        </li>
      </ul>
    </>
  );
}
```

## 실습 8. 에러처리하기 1

```tsx
import Link from "next/link";
import style from "./style.module.css";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const getCurrentWeather = async () => {
  const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}ㅇㄹㅇㄹ&q=Seoul&aqi=no`);
  if (!res.ok) {
    throw new Error("날씨 정보를 가져올수 없습니다.");
  }
  return res.json();
};

export default async function Home() {
  const res = await getCurrentWeather();
  console.log(res);
  return (
    <>
      <h1>main</h1>
      <ul className={style.list}>
        <li>
          <Link href="/seoul">서울</Link>
        </li>
        <li>
          <Link href="/newyork">뉴욕</Link>
        </li>
        <li>
          <Link href="/lundom">런던</Link>
        </li>
      </ul>
    </>
  );
}
```

## 실습 8. 에러처리하기 2

- /app/error.tsx 파일 생성

```tsx
"use client";

import { useEffect } from "react";

type Props = {
  error: Error;
  reset: () => void;
};
export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.log(error.message);
  }, []);
  return (
    <>
      <h1>에러 페이지, {error.message}</h1>
      <button
        onClick={() => {
          reset();
        }}
      >
        새로고침
      </button>
    </>
  );
}
```

## 실습 9. 로딩 페이지 만들기 (타입추론하기)

- app/loading.tsx

```tsx
export default function Loading() {
  return (
    <>
      <h1>로딩중</h1>
    </>
  );
}
```

## 실습 10. 데이터를 실제로 화면에 출력하기 1

- /utils 폴더 생성
- /utils/getCurrentWeather.ts 파일 생성

```ts
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export const getCurrentWeather = async () => {
  const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Seoul&aqi=no`);
  if (!res.ok) {
    throw new Error("날씨 정보를 가져올수 없습니다.");
  }
  return res.json();
};
```

```ts
import Link from "next/link";
import style from "./style.module.css";
import { getCurrentWeather } from "@/utils/getCurrentWeather";

export default async function Home() {
  const res = await getCurrentWeather();
  console.log(res);
  return (
    <>
      <h1>main</h1>
      <ul className={style.list}>
        <li>
          <Link href="/seoul">서울</Link>
        </li>
        <li>
          <Link href="/newyork">뉴욕</Link>
        </li>
        <li>
          <Link href="/lundom">런던</Link>
        </li>
      </ul>
    </>
  );
}
```

## 실습 10. 데이터를 실제로 화면에 출력하기 2

- 타입 정의 넣기

```ts
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export interface Response {
  location: Location;
  current: Current;
}

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface Current {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export const getCurrentWeather = async (): Promise<Response> => {
  const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Seoul&aqi=no`);
  if (!res.ok) {
    throw new Error("날씨 정보를 가져올수 없습니다.");
  }
  return res.json();
};
```

````ts
# Next 13.5.6 진행
## 1. 파일 시스템 기반의 라우팅 지원(App Router)
- 디렉토리 구조에 따라 라우팅 구조가 달라진다.
- 예전에는 pages 폴더에 구성을 하였다.
- 이제는 app 폴더에 구성을 하는 것에 따라서 달라진다.

## 2. 서버 컴포넌트(React Server Component : RSC)
- React 18에서 도입
- 필요한 이유는 데잍터 페칭에서 성능상에 잇점이 있다.
- 보안상의 이점
- 랜더링 되어진 정보를 캐싱에 이점
- 자바스크립트 번들의 크기가 감소.
- 서버 컴포넌트는 서버에서 완성된 파일을 내려줌.
- 이전 방식 보다는 용량이 줄어든다.
- hook, eventListener 를 쓸수 없다.

## 3. 서버 컴포넌트와 다른 방식 즉, 기존 방식을 클라이언트 컴포넌트라고 한다.
- 클라이언트 컴포넌트는 'use client' 를 직접 작성해서 사용해야 한다.
- 키워드를 써서 사용하는 경우 조심해야 하는 것은 클라이언트 컴포넌트에서 서버 컴포넌트를 import 할 수 없다.
- 클라이언트 컴포넌트에서 서버 컴포넌트를 사용해야 하는 경우 Props 를 사용해야 한다.
- 클라이언트 컴포넌트는 CSR 컴포넌트 즉 클라이언트에서만 실행되는 컴포넌트가 아니다.
- 클라이언트 컴포넌트도 SSR, SSG 방식으로 렌더링 가능
- 서버에서 컴포넌트를 미리 랜더링 해 두는 것을 말함.
- 클라이언트 컴포넌트는 트리의 끝으로 보내라.

## 라우팅 (경로 지정하기)
- 파일 시스템 방식으로 지정하고 app 폴더 안에 작성한다.
- 폴더 이름을 따르는 URL path 를 정의할 수 있다.
- 파일명이 미리 약속이 되어 있다.
- app/dashboard/page.tsx (세그먼트)
- https://localhost:3000/dashboard 를 하면 page.tsx 를 보여준다.

- 파일이름이 미리 정의되어 있다.
: page.tsx 는 성공적으로 페이지가 성공적일 때
: error.tsx
: loading.tsx
: layout.tsx

- 동적으로 변할 수 있는 URL Path (다이나믹 라우터)
: app/blog/[id]/page.tsx
: [id] 가 동적 라우터

## 페이지 간의 이동
- Link 컴포넌트 사용하기
- useRouter 사용하기 : 버튼 등에 사용/클라이언트 컴포넌트로 만들어야 함.

## 스타일링
- CSS Modules 등 여러가지 방식을 사용할 수 있다. (.modue.css)
- 전역 스타일링 (global.css)

## 데이터 패칭
- 웹 애플리케이션에서 데이터 패칭은 중요하다.
- Next.js 에서 Fetch API 에서 제공한다.
- 데이터를 캐싱하고 있다.
- 데이터 재검증(Revalidating) : 새로운 데이터 가져오기
: 시간 기반 재검증, 온디맨드 재검증(수요가 있을 때 재검증)

## 메터데이터
- 페이지를 설명하는 용도
- 카카오, 페이스 북등.
- 정의하는 방법을 2개 정도 제시
- 정적 메터 데이터 설정 (mentadata 객체를 설정하는 형식)
- 동적 메터 데이터 설정 (mentadata 객체를 설정하는 동적 함수 형식 generateMetadat 함수)

## 실습 1.
- app/page.tsx 수정

```tsx
export default function Home() {
  return (
    <h1>main</h1>
  )
}
````

- app/global.css 수정

- 실행: yarn dev

## 실습 2.

- app/page.tsx

```tsx
export default function Home() {
  return (
    <>
      <h1>main</h1>
      <ul>
        <li>서울</li>
        <li>뉴욕</li>
        <li>일본</li>
      </ul>
    </>
  );
}
```

## 실습 3.

- app/detail 폴더 생성
- app/detail/page.tsx

```tsx
export default function Detail(): JSX.Element {
  return (
    <>
      <h1>Detail</h1>
    </>
  );
}
```

- app router 확인
- http://localhost:3000/detail

## 실습 4. 동적 라우팅 적용해보기 1

- app/detail/page.tsx

```tsx
type Props = {
  params: {
    location: string;
  };
};
export default function Detail({ params }: Props): JSX.Element {
  return (
    <>
      <h1>Detail {params.location}</h1>
    </>
  );
}
```

- app router 확인
- http://localhost:3000/detail

## 실습 5. 동적 라우팅 적용해보기 2

- app/[location]/page.tsx 으로 변경하기

```tsx
type Props = {
  params: {
    location: string;
  };
};
export default function Detail({ params }: Props): JSX.Element {
  const city = params.location === "seoul" ? "서울" : "";
  return (
    <>
      <h1>Detail : {city}</h1>
    </>
  );
}
```

- app router 확인
- http://localhost:3000/seoul

## 실습 5. 동적 라우팅 적용해보기 3

- Link 컴포넌트 이용해 보기

- app/page.tsx

```tsx
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>main</h1>
      <ul>
        <li>
          <Link href="/seoul">서울</Link>
        </li>
        <li>
          <Link href="/newyork">뉴욕</Link>
        </li>
        <li>
          <Link href="/lundom">런던</Link>
        </li>
      </ul>
    </>
  );
}
```

- app router 확인
- http://localhost:3000/

## 실습 5. 동적 라우팅 적용해보기 4

- Link 컴포넌트 이용해 보기
- app/[location]/page.tsx 으로 변경하기

```tsx
import Link from "next/link";

type Props = {
  params: {
    location: string;
  };
};
export default function Detail({ params }: Props): JSX.Element {
  const city = params.location === "seoul" ? "서울" : "";

  const handleClick = () => {
    console.log("뒤로가기");
  };

  return (
    <>
      <h1>Detail : {city}</h1>
      <Link href="/">홈</Link>
      <button onClick={handleClick}>홈</button>
    </>
  );
}
```

- app router 확인
- http://localhost:3000/seoul

## 실습 5. 동적 라우팅 적용해보기 5

- onClick 이벤트 자체, 즉 이벤트가 들어가는 행위자체가 서버컴포넌트가 허용하지 않음.
  : 'use client' 를 작성해 주어야 함.

- app/[location]/page.tsx 으로 변경하기

```tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  params: {
    location: string;
  };
};
export default function Detail({ params }: Props): JSX.Element {
  const city = params.location === "seoul" ? "서울" : "";

  const router = useRouter();

  const handleClick = () => {
    console.log("뒤로가기");
    router.push("/");
  };

  return (
    <>
      <h1>Detail : {city}</h1>
      <Link href="/">홈</Link>
      <button onClick={handleClick}>홈</button>
    </>
  );
}
```

- app router 확인
- http://localhost:3000/seoul

## 실습 5. 동적 라우팅 적용해보기 6

- 클라이언트 컴포넌트는 별도로 빼주자.
- /components 폴더 만들기
- HomeButton.tsx 생성

```tsx
"use client";
import { useRouter } from "next/navigation";

export default function HomeButton() {
  const router = useRouter();

  const handleClick = () => {
    console.log("뒤로가기");
    router.push("/");
  };
  return <button onClick={handleClick}>홈</button>;
}
```

## 실습 5. 동적 라우팅 적용해보기 7

```tsx
import HomeButton from "@/components/HomeButton";
import Link from "next/link";

type Props = {
  params: {
    location: string;
  };
};
export default function Detail({ params }: Props): JSX.Element {
  const city = params.location === "seoul" ? "서울" : "";

  return (
    <>
      <h1>Detail : {city}</h1>
      <Link href="/">홈</Link>
      <HomeButton />
    </>
  );
}
```

## 실습 6. 간단한 스타일 입력하기 1

- 스타일 전역 코드 만들기
- /app/style.module.css 파일 생성

```css
.list {
  list-style: none;
  padding: 0;
}
.list li {
  font-size: 14px;
  line-height: 1.3;
}
.list li a {
  text-decoration: none;
  color: hotpink;
}
```

```tsx
import Link from "next/link";
import style from "./style.module.css";

export default function Home() {
  return (
    <>
      <h1>main</h1>
      <ul className={style.list}>
        <li>
          <Link href="/seoul">서울</Link>
        </li>
        <li>
          <Link href="/newyork">뉴욕</Link>
        </li>
        <li>
          <Link href="/lundom">런던</Link>
        </li>
      </ul>
    </>
  );
}
```

## 실습 6. 간단한 스타일 입력하기 2

- 스타일 글로벌 코드 만들기
- /app/global.css 파일 생성

```css
/* @tailwind base;
@tailwind components;
@tailwind utilities; */

button {
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 8px;
  background-color: blue;
  color: #fff;
}
```

## 실습 7. placeHold 사용해 보기 1

- # [https://jsonplaceholder.typicode.com/](https://jsonplaceholder.typicode.com/)
- 타입 스크립트 타입 만들기
  :[https://transform.tools/json-to-typescript](hhttps://transform.tools/json-to-typescript)

  ```ts
  export interface Root {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }
  ```

## 7. todoList 사용해 보기 2

- 결과는 터미널에서 확인
- app/page.tsx

```ts
import Link from "next/link";
import style from "./style.module.css";
const getTodoList = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
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
          <Link href="/seoul">서울</Link>
        </li>
        <li>
          <Link href="/newyork">뉴욕</Link>
        </li>
        <li>
          <Link href="/lundom">런던</Link>
        </li>
      </ul>
    </>
  );
}
```

## 실습 7. todoList 사용해 보기 3 (에러처리하기 1)

```ts
import Link from "next/link";
import style from "./style.module.css";
const getTodoList = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos2");
  console.log(typeof res.status);
  if (res.status !== 200) {
    throw new Error("목록을 불러올 수 없습니다.");
  }
  return res.json();
};
export default async function Home() {
  const res = await getTodoList();
  // console.log(res);
  return (
    <>
      <h1>main</h1>
      <ul className={style.list}>
        <li>
          <Link href="/seoul">서울</Link>
        </li>
        <li>
          <Link href="/newyork">뉴욕</Link>
        </li>
        <li>
          <Link href="/lundom">런던</Link>
        </li>
      </ul>
    </>
  );
}
```

## 실습 7. todoList 사용해 보기 4 (에러처리하기 2)

- /app/error.tsx 파일 생성

```tsx
"use client";

import { useEffect } from "react";

type Props = {
  error: Error;
  reset: () => void;
};
export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.log(error.message);
  }, []);
  return (
    <>
      <h1>에러 페이지, {error.message}</h1>
      <button
        onClick={() => {
          reset();
        }}
      >
        새로고침
      </button>
    </>
  );
}
```

## 실습 7. todoList 사용해 보기 5 (todoType 생성)

- /app/type/폴더 생성
- /app/type/todoType.ts 파일 생성

```ts
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
```

## 실습 7. todoList 사용해 보기 6 (목록출력)

```tsx
import Link from "next/link";
import style from "./style.module.css";
import { Todo } from "./type/todoType";
const getTodoList = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
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
          <Link href="/seoul">서울</Link>
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
            {item.id} : {item.title}
          </div>
        ))}
      </div>
    </>
  );
}
```

## 실습 7. todoList 상세보기 7

```ts
import Link from "next/link";
import style from "./style.module.css";
import { Todo } from "./type/todoType";
const getTodoList = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
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
          <Link href="/seoul">서울</Link>
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
            {item.id} : <Link href={`/todos/${item.id}`}>{item.title}</Link>
          </div>
        ))}
      </div>
    </>
  );
}
```

## 실습 7. todoList 상세보기 8

- app/todo/[id] 폴더 생성
- app/todo/[id]/page.tsx

  ```tsx
  import React from "react";

  type Props = {
    params: {
      id: string;
    };
  };
  const getTodoDetail = async (_id: string) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${parseInt(_id)}`);
    // console.log(res);
    // console.log(typeof res.status);
    if (res.status !== 200) {
      throw new Error("목록을 불러올 수 없습니다.");
    }
    return res.json();
  };

  const TodoDetail = async ({ params }: Props) => {
    // console.log(params.id);
    // console.log(typeof params.id);
    const res = await getTodoDetail(params.id);
    // console.log(res);

    return (
      <div>
        page : {res.id} : {res.title}
      </div>
    );
  };

  export default TodoDetail;
  ```

## 실습 7. todoList 상세보기 8 (로딩창) (타입추론하기)

- app/loading.tsx

```tsx
export default function Loading() {
  return (
    <>
      <h1>로딩중</h1>
    </>
  );
}
```

## 실습 7. todoList 환경변수 설정하기 9

- /.env.local 파일 생성

```txt
NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
```

```tsx
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
          <Link href="/seoul">서울</Link>
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
```

```tsx
import React from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
type Props = {
  params: {
    id: string;
  };
};
const getTodoDetail = async (_id: string) => {
  const res = await fetch(`${API_URL}/todos/${parseInt(_id)}`);
  // console.log(res);
  // console.log(typeof res.status);
  if (res.status !== 200) {
    throw new Error("목록을 불러올 수 없습니다.");
  }
  return res.json();
};

const TodoDetail = async ({ params }: Props) => {
  // console.log(params.id);
  // console.log(typeof params.id);
  const res = await getTodoDetail(params.id);
  // console.log(res);

  return (
    <div>
      page : {res.id} : {res.title}
    </div>
  );
};

export default TodoDetail;
```

============== https://thecatapi.com/ =========================== 고양이 API ? ==================================

## 실습 8. 날씨 API 사용해 보기 1

- [날씨API](https://www.weatherapi.com/)
- http://api.weatherapi.com/v1/current.json?key=키값&q=Seoul&aqi=no
- http://api.weatherapi.com/v1/forecast.json?key=키값&q=Seoul&days=1&aqi=no&alerts=no
- 타입 스크립트 타입 만들기
  :[https://transform.tools/json-to-typescript](hhttps://transform.tools/json-to-typescript)

```ts
export interface Root {
  location: Location;
  current: Current;
}

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface Current {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

export interface Condition {
  text: string;
  icon: string;
  code: number;
}
```

## 실습 8. 날씨 API 사용해 보기 2 (날씨 데이터 조회하기)

- 결과는 터미널에서 확인
- app/page.tsx

```tsx
import Link from "next/link";
import style from "./style.module.css";

const getCurrentWeather = async () => {
  const res = await fetch("http://api.weatherapi.com/v1/current.json?key=키값&q=Seoul&aqi=no");
  return res.json();
};

export default async function Home() {
  const res = await getCurrentWeather();
  console.log(res);
  return (
    <>
      <h1>main</h1>
      <ul className={style.list}>
        <li>
          <Link href="/seoul">서울</Link>
        </li>
        <li>
          <Link href="/newyork">뉴욕</Link>
        </li>
        <li>
          <Link href="/lundom">런던</Link>
        </li>
      </ul>
    </>
  );
}
```

## 실습 8. 날씨 API 사용해 보기 3 (환경변수 다루기 1)

```tsx
import Link from "next/link";
import style from "./style.module.css";

const API_KEY = "키값";
const getCurrentWeather = async () => {
  const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Seoul&aqi=no`);
  return res.json();
};

export default async function Home() {
  const res = await getCurrentWeather();
  console.log(res);
  return (
    <>
      <h1>main</h1>
      <ul className={style.list}>
        <li>
          <Link href="/seoul">서울</Link>
        </li>
        <li>
          <Link href="/newyork">뉴욕</Link>
        </li>
        <li>
          <Link href="/lundom">런던</Link>
        </li>
      </ul>
    </>
  );
}
```

## 실습 8. 날씨 API 사용해 보기 3 (환경변수 다루기 2)

- /.env.local 파일 생성

```txt
NEXT_PUBLIC_API_KEY=키값
```

```tsx
import Link from "next/link";
import style from "./style.module.css";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const getCurrentWeather = async () => {
  const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Seoul&aqi=no`);
  return res.json();
};

export default async function Home() {
  const res = await getCurrentWeather();
  console.log(res);
  return (
    <>
      <h1>main</h1>
      <ul className={style.list}>
        <li>
          <Link href="/seoul">서울</Link>
        </li>
        <li>
          <Link href="/newyork">뉴욕</Link>
        </li>
        <li>
          <Link href="/lundom">런던</Link>
        </li>
      </ul>
    </>
  );
}
```

## 실습 9. 에러처리하기 1

```tsx
import Link from "next/link";
import style from "./style.module.css";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const getCurrentWeather = async () => {
  const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}ㅇㄹㅇㄹ&q=Seoul&aqi=no`);
  if (!res.ok) {
    throw new Error("날씨 정보를 가져올수 없습니다.");
  }
  return res.json();
};

export default async function Home() {
  const res = await getCurrentWeather();
  console.log(res);
  return (
    <>
      <h1>main</h1>
      <ul className={style.list}>
        <li>
          <Link href="/seoul">서울</Link>
        </li>
        <li>
          <Link href="/newyork">뉴욕</Link>
        </li>
        <li>
          <Link href="/lundom">런던</Link>
        </li>
      </ul>
    </>
  );
}
```

## 실습 9. 에러처리하기 2

- /app/error.tsx 파일 생성

```tsx
"use client";

import { useEffect } from "react";

type Props = {
  error: Error;
  reset: () => void;
};
export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.log(error.message);
  }, []);
  return (
    <>
      <h1>에러 페이지, {error.message}</h1>
      <button
        onClick={() => {
          reset();
        }}
      >
        새로고침
      </button>
    </>
  );
}
```

## 실습 10. 로딩 페이지 만들기 (타입추론하기)

- app/loading.tsx

```tsx
export default function Loading() {
  return (
    <>
      <h1>로딩중</h1>
    </>
  );
}
```

## 실습 11. 데이터를 실제로 화면에 출력하기 1

- /utils 폴더 생성
- /utils/getCurrentWeather.ts 파일 생성

```ts
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export const getCurrentWeather = async () => {
  const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Seoul&aqi=no`);
  if (!res.ok) {
    throw new Error("날씨 정보를 가져올수 없습니다.");
  }
  return res.json();
};
```

```ts
import Link from "next/link";
import style from "./style.module.css";
import { getCurrentWeather } from "@/utils/getCurrentWeather";

export default async function Home() {
  const res = await getCurrentWeather();
  console.log(res);
  return (
    <>
      <h1>main</h1>
      <ul className={style.list}>
        <li>
          <Link href="/seoul">서울</Link>
        </li>
        <li>
          <Link href="/newyork">뉴욕</Link>
        </li>
        <li>
          <Link href="/lundom">런던</Link>
        </li>
      </ul>
    </>
  );
}
```

## 실습 11. 데이터를 실제로 화면에 출력하기 2

- 타입 정의 넣기

```ts
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export interface Response {
  location: Location;
  current: Current;
}

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface Current {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export const getCurrentWeather = async (): Promise<Response> => {
  const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Seoul&aqi=no`);
  if (!res.ok) {
    throw new Error("날씨 정보를 가져올수 없습니다.");
  }
  return res.json();
};
```

- 터미널 창에서 확인

```ts
import Link from "next/link";
import style from "./style.module.css";
import { getCurrentWeather } from "@/utils/getCurrentWeather";

export default async function Home() {
  const res = await getCurrentWeather();

  // 터미널 창에서 확인
  console.log(res.current.condition.text);
  return (
    <>
      <h1>main</h1>
      <ul className={style.list}>
        <li>
          <Link href="/seoul">서울</Link>
        </li>
        <li>
          <Link href="/newyork">뉴욕</Link>
        </li>
        <li>
          <Link href="/lundom">런던</Link>
        </li>
      </ul>
    </>
  );
}
```

## 실습 11. 데이터를 실제로 화면에 출력하기 3

- /utils/getForecast.ts

```ts
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const getForecast = async () => {
  const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=Seoul&days=1&aqi=no&alerts=no`);
  if (!res.ok) {
    throw new Error("날씨 정보를 가져올수 없습니다.");
  }
  return res.json();
};
```

## 실습 11. 데이터를 실제로 화면에 출력하기 4

- /utils/getForecast.ts

```ts
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export interface Response {
  location: Location;
  current: Current;
  forecast: Forecast;
}

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface Current {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export interface Forecast {
  forecastday: Forecastday[];
}

export interface Forecastday {
  date: string;
  date_epoch: number;
  day: Day;
  astro: Astro;
  hour: Hour[];
}

export interface Day {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_snow: number;
  condition: Condition2;
  uv: number;
}

export interface Condition2 {
  text: string;
  icon: string;
  code: number;
}

export interface Astro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: number;
  is_moon_up: number;
  is_sun_up: number;
}

export interface Hour {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition3;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  snow_cm: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
  short_rad: number;
  diff_rad: number;
}

export interface Condition3 {
  text: string;
  icon: string;
  code: number;
}

export const getForecast = async (): Promise<Response> => {
  const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=Seoul&days=1&aqi=no&alerts=no`);
  if (!res.ok) {
    throw new Error("날씨 정보를 가져올수 없습니다.");
  }
  return res.json();
};
```

## 실습 12. 데이터를 실제로 화면에 출력하기 5

- /app/[location]/page.tsx

```tsx
import HomeButton from "@/components/HomeButton";
import { getForecast } from "@/utils/getForcast";
import Link from "next/link";

type Props = {
  params: {
    location: string;
  };
};
export default async function Detail({ params }: Props) {
  const city = params.location === "seoul" ? "서울" : "";
  const res = await getForecast();

  return (
    <>
      <h1>Detail : {city}</h1>
      <Link href="/">홈</Link>
      <HomeButton />
    </>
  );
}
```

## 실습 12. 데이터를 실제로 화면에 출력하기 6

- /utils/getCurrentWeather.ts

```ts
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export interface Response {
  location: Location;
  current: Current;
}

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface Current {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export const getCurrentWeather = async (location: string): Promise<Response> => {
  const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`);
  if (!res.ok) {
    throw new Error("날씨 정보를 가져올수 없습니다.");
  }
  return res.json();
};
```

## 실습 12. 데이터를 실제로 화면에 출력하기 7

- /utils/getForcast.ts

```ts
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export interface Response {
  location: Location;
  current: Current;
  forecast: Forecast;
}

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface Current {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export interface Forecast {
  forecastday: Forecastday[];
}

export interface Forecastday {
  date: string;
  date_epoch: number;
  day: Day;
  astro: Astro;
  hour: Hour[];
}

export interface Day {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_snow: number;
  condition: Condition2;
  uv: number;
}

export interface Condition2 {
  text: string;
  icon: string;
  code: number;
}

export interface Astro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: number;
  is_moon_up: number;
  is_sun_up: number;
}

export interface Hour {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition3;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  snow_cm: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
  short_rad: number;
  diff_rad: number;
}

export interface Condition3 {
  text: string;
  icon: string;
  code: number;
}

export const getForecast = async (location: string): Promise<Response> => {
  const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=1&aqi=no&alerts=no`);
  if (!res.ok) {
    throw new Error("날씨 정보를 가져올수 없습니다.");
  }
  return res.json();
};
```

## 실습 12. 데이터를 실제로 화면에 출력하기 8

```tsx
import Link from "next/link";
import style from "./style.module.css";
import { getCurrentWeather } from "@/utils/getCurrentWeather";

export default async function Home() {
  const res = await getCurrentWeather("seoul");
  console.log(res.current.condition.text);
  return (
    <>
      <h1>main</h1>
      <ul className={style.list}>
        <li>
          <Link href="/seoul">서울</Link>
          <span>{res.current.condition.text}</span>
        </li>
        <li>
          <Link href="/newyork">뉴욕</Link>
        </li>
        <li>
          <Link href="/lundom">런던</Link>
        </li>
      </ul>
    </>
  );
}
```

## 실습 12. 데이터를 실제로 화면에 출력하기 9

```tsx
import HomeButton from "@/components/HomeButton";
import { getForecast } from "@/utils/getForcast";
import Link from "next/link";

type Props = {
  params: {
    location: string;
  };
};
export default async function Detail({ params }: Props) {
  const city = params.location === "seoul" ? "서울" : "";
  const res = await getForecast(params.location);

  return (
    <>
      <h1>Detail : {city}</h1>
      {/* <Link href="/">홈</Link> */}
      <ul>
        {res.forecast.forecastday.map((day) => (
          <li key={day.date}>
            {" "}
            {day.date} / {day.day.avgtemp_c}
          </li>
        ))}
      </ul>
      <HomeButton />
    </>
  );
}
```

## 실습 12. 최신데이터 가져오기(데이터 재검증 1)

- 데이터를 캐쉬한다.
- 캐쉬를 풀어줘야 한다.
- utils/getTime.ts

```ts
interface Response {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  seconds: number;
  milliSeconds: number;
  dateTime: string;
  date: string;
  time: string;
  timeZone: string;
  dayOfWeek: string;
  dstActive: boolean;
}

export const getTime = async (timeZone: string): Promise<Response> => {
  const res = await fetch(`https://timeapi.io/api/Time/current/zone?timeZone=${timeZone}`);
  if (!res.ok) throw new Error("시간 정보를 가져올 수 없습니다.");
  return res.json();
};
```

## 실습 12. 최신데이터 가져오기(데이터 재검증 2)

```tsx
import Link from "next/link";
import style from "./style.module.css";
import { getCurrentWeather } from "@/utils/getCurrentWeather";
import { getTime } from "@/utils/getTime";

export default async function Home() {
  const res = await getCurrentWeather("seoul");
  // console.log(res.current.condition.text);
  const time = await getTime(res.location.tz_id);

  return (
    <>
      <h1>main</h1>
      <h3>{time.dateTime}</h3>
      <ul className={style.list}>
        <li>
          <Link href="/seoul">서울</Link>
          <span>{res.current.condition.text}</span>
        </li>
        <li>
          <Link href="/newyork">뉴욕</Link>
        </li>
        <li>
          <Link href="/lundom">런던</Link>
        </li>
      </ul>
    </>
  );
}
```

## 실습 12. 최신데이터 가져오기(데이터 재검증 3)

- 캐쉬 풀기 (서버에서만 실행됨)
  ` /app/revalidate폴더/route.ts

```ts
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const tag = req.nextUrl.searchParams.get("tag");
  if (!tag) throw Error("태그는 필수 입니다.");
  revalidateTag(tag);
  return NextResponse.json({ message: "재검을 성공했습니다.", tag });
}
```

- components/RevalidateButton.tsx

```ts
"use client";

type Props = {
  tag: string;
};
export default function RevalidateButton({ tag }: Props) {
  const handleClick = async () => {
    const res = await fetch("/api/revalidate?tag=" + tag);
    console.log(res);
  };
  return <button onClick={handleClick}>캐쉬비우기</button>;
}
```

```tsx
import Link from "next/link";
import style from "./style.module.css";
import { getCurrentWeather } from "@/utils/getCurrentWeather";
import { getTime } from "@/utils/getTime";
import RevalidateButton from "@/components/RevalidateButton";

export default async function Home() {
  const res = await getCurrentWeather("seoul");
  // console.log(res.current.condition.text);
  const time = await getTime(res.location.tz_id);

  return (
    <>
      <h1>main</h1>
      <h3>{time.dateTime}</h3>
      <ul className={style.list}>
        <li>
          <Link href="/seoul">서울</Link>
          <span>{res.current.condition.text}</span>
        </li>
        <li>
          <Link href="/newyork">뉴욕</Link>
        </li>
        <li>
          <Link href="/lundom">런던</Link>
        </li>
      </ul>

      <RevalidateButton tag={"time"} />
    </>
  );
}
```

```ts
interface Response {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  seconds: number;
  milliSeconds: number;
  dateTime: string;
  date: string;
  time: string;
  timeZone: string;
  dayOfWeek: string;
  dstActive: boolean;
}

export const getTime = async (timeZone: string): Promise<Response> => {
  const res = await fetch(`https://timeapi.io/api/Time/current/zone?timeZone=${timeZone}`, { next: { tags: ["time"] } });
  if (!res.ok) throw new Error("시간 정보를 가져올 수 없습니다.");
  return res.json();
};
```

## 실습 13. 메타데이터 1

- layout.tsx 에 정의 되어 있다.
- 정적 메타 데이터 수정하기

```js
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "나의 앱",
  description: "나의 앱입니다.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

## 실습 13. 메타데이터 2

- 페이지에 맞는 메타데이터 만들기 (동적 메타데이터)

```tsx
import HomeButton from "@/components/HomeButton";
import { getForecast } from "@/utils/getForcast";
import Link from "next/link";

type Props = {
  params: {
    location: string;
  };
};

export function generateMetadata({ params }: Props) {
  return {
    title: `새로운 타이틀 - ${params.location}`,
    descrtiption: "새로운 타이틀입니다.",
  };
}

export default async function Detail({ params }: Props) {
  const city = params.location === "seoul" ? "서울" : "";
  const res = await getForecast(params.location);

  return (
    <>
      <h1>Detail : {city}</h1>
      {/* <Link href="/">홈</Link> */}
      <ul>
        {res.forecast.forecastday.map((day) => (
          <li key={day.date}>
            {" "}
            {day.date} / {day.day.avgtemp_c}
          </li>
        ))}
      </ul>
      <HomeButton />
    </>
  );
}
```

```tsx
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
```

```ts
import HomeButton from "@/components/HomeButton";
import { getForecast } from "@/utils/getForcast";
import Link from "next/link";

type Props = {
  params: {
    location: string;
  };
  searchParams: {
    name: string;
  };
};

export function generateMetadata({ params, searchParams }: Props) {
  return {
    title: `새로운 타이틀 - ${searchParams.name}`,
    descrtiption: "새로운 타이틀입니다.",
  };
}

export default async function Detail({ params, searchParams }: Props) {
  const city = searchParams.name;
  const res = await getForecast(params.location);

  return (
    <>
      <h1>Detail : {city}</h1>
      {/* <Link href="/">홈</Link> */}
      <ul>
        {res.forecast.forecastday.map((day) => (
          <li key={day.date}>
            {" "}
            {day.date} / {day.day.avgtemp_c}
          </li>
        ))}
      </ul>
      <HomeButton />
    </>
  );
}
```
