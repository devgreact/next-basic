import HomeButton from "@/components/HomeButton"
import { getForecast } from "@/utils/getForcast"
import Link from "next/link"

type Props  = {
    params: {
        location: string
    }
}
export default async function Detail({params}:Props){    
    const city = params.location === "seoul" ? "서울" : "";    
    const res = await getForecast(params.location);
    
    return (
    <>
        <h1>Detail : {city}</h1>
        {/* <Link href="/">홈</Link> */}
        <ul>
            {res.forecast.forecastday.map(day => (
                <li key={day.date}> {day.date} / {day.day.avgtemp_c}</li>
            ))}
        </ul>
        <HomeButton/>
    </>
    )
}