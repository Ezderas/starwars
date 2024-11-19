"use client";

import { useState } from "react";

type Props = {
  title: string;
};

export default function InputHash({ title }: Props) {
  const [userInput, setUserInput] = useState(undefined);

  function handleUserInput(event: any) {
    setUserInput(event.target.value);
    localStorage.setItem("username", event.target.value);
  }

  return (
    <>
      <div>{title}</div>
      <input onChange={handleUserInput} />
      <div>
        {userInput ?? typeof window !== "undefined"
          ? localStorage.getItem("username")
          : ""}{" "}
      </div>
      <button className="btn" onClick={() => localStorage.clear()}>
        Clear Storage
      </button>
    </>
  );
}
