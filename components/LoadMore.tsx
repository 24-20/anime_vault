"use client";

import { getData } from "@/app/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AnimeCard, { AnimeProp } from "./AnimeCard";

let pagenum = 2;
function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setdata] = useState<AnimeProp[]>([]);
  const [loading, setloading] = useState<boolean>(false);

  useEffect(() => {
    async function updatedata() {
      const newdata = (await getData(pagenum)) as AnimeProp[];

      setdata((prev: AnimeProp[]) => {
        return [...prev, ...newdata];
      });
      pagenum++;
    }

    if (inView) {
      setloading(true);
      updatedata();
      setloading(false);
    }
  }, [inView]);

  return (
    <>
      {data.length > 0 && (
        <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {data.map((item: AnimeProp) => (
            <AnimeCard key={item.id} anime={item} />
          ))}
        </section>
      )}
      <section ref={ref}>
        <div>
          {!inView ? (
            <div className=" flex flex-col gap-2 justify-center items-center w-full">
              <p>Javascript still loading</p>
              <Image
                src="./spinner.svg"
                alt="spinner"
                width={56}
                height={56}
                className="object-contain"
              />
            </div>
          ) : (
            <div className=" flex flex-col gap-2 justify-center items-center w-full">
              <p>loading data</p>
              <Image
                src="./spinner.svg"
                alt="spinner"
                width={56}
                height={56}
                className="object-contain"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default LoadMore;
