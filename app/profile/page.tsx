"use client";

import Main from "@/app/components/Main";
import { useRef } from "react";
import { useTypes } from "../utils/TypesProvider";
import { EMPTY_STRING } from "../utils/empty";

const Profile = () => {
  const inputRef = useRef<HTMLInputElement>(null!);
  const { types, addType } = useTypes();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const inputValue = inputRef.current.value;
    // Already exists in the types context
    if (types.includes(inputValue.trim().toLowerCase())) {
      return console.log(`${inputValue} already exists!`);
    }
    if (inputValue.trim() === EMPTY_STRING) {
      return console.log("Can't add empty value");
    }
    inputRef.current.value = EMPTY_STRING;
    addType(inputValue);
  }

  return (
    <Main>
      <section className="bg-white">
        <p>types:</p>
        <ul className="overflow-y-auto h-[200px]">
          {types.map((type) => {
            return <li key={type}>{type}</li>;
          })}
        </ul>
        <input ref={inputRef} />
        <button onClick={handleClick}>add type</button>
      </section>
    </Main>
  );
};

export default Profile;
