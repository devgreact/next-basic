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
