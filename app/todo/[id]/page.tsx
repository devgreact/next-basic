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
