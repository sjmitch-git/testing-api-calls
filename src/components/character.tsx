import React from "react";
import { useFetch } from "../hooks/use_fetch";

interface CharacterResponse {
  name: string;
}

export const Character = () => {
  const { data, loading, error } = useFetch<CharacterResponse>("https://swapi.dev/api/people/1");

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <h2 data-testid="title">{data?.name}</h2>
      )}
    </>
  );
};
