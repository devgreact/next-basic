'use client'
import { useRouter } from "next/navigation"

export default function HomeButton() {
    const router = useRouter();

    const handleClick = () => {
        console.log("뒤로가기");
        router.push("/");
    }
    return <button onClick={handleClick}>홈</button>
}