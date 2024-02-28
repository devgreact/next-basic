'use client'

type Props = {
    tag: string
}
export default function RevalidateButton({tag}:Props) {
    const handleClick = async () => {
        const res = await fetch("/api/revalidate?tag=" + tag)
        console.log(res)
    }
    return <button onClick={handleClick}>캐쉬비우기</button>
}