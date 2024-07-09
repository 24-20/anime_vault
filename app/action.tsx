"use server";

const MAX_LIMIT = 8;

export const getData = async (page: number) => {
  const response = await fetch(
    `https://shikimori.one/api/animes?page=${page}&limit=${MAX_LIMIT}&order=popularity`
  );
  return response.json();
};
