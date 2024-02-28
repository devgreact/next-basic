'use client'

import { useEffect } from "react";

type Props = {
    error:Error;
    reset: () => void
}
export default function Error({error, reset}:Props){
    useEffect(() => {
        console.log(error.message);
    }, [])
    return (
    <>
        <h1>에러 페이지, {error.message}</h1>
        <button onClick={() => {
            reset()
        }}>새로고침</button>
    </>
    )
}