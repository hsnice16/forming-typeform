import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { questrialFont } from "@/utils";
import {
  ProgressBar,
  QuestionOne,
  QuestionTwo,
  QuestionZero,
} from "@/components";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { TOTAL_QUESTIONS } from "@/constants";

export default function Home() {
  const [questionNum, setQuestionNum] = useState<{
    prev: null | number;
    now: number;
  }>({
    prev: null,
    now: 0,
  });

  const { prev, now } = questionNum;
  const [showIndustriesList, setShowIndustriesList] = useState(false);

  useEffect(() => {
    function handleKeypress(event: KeyboardEvent) {
      if (event.key === "Enter") {
        event.preventDefault();
        setQuestionNum((prevValue) =>
          prevValue.now + 1 >= TOTAL_QUESTIONS + 1
            ? { ...prevValue }
            : { prev: prevValue.now, now: prevValue.now + 1 }
        );
      }
    }

    document.addEventListener("keypress", handleKeypress);

    return function () {
      document.removeEventListener("keypress", handleKeypress);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handleClick() {
      setShowIndustriesList(false);
    }

    document.addEventListener("click", handleClick);

    return function () {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Typeform</title>
        <meta
          name="description"
          content="Typeform built for a take home assignment."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <ProgressBar />
        <Image
          src="/growth-x-logo.png"
          alt="GrowthX logo"
          width={96}
          height={24}
        />
      </header>
      <main className={classNames(styles.main, questrialFont.className)}>
        <section>
          <div>
            <QuestionZero
              outView={now - 1 === 0 || now > 1}
              outViewSlide="up"
              inView={now === 0}
              inViewSlide={prev === 1 ? "up" : ""}
            />
            {prev !== null && [now - 1, now, now + 1].includes(1) && (
              <QuestionOne
                outView={[now - 1, now + 1].includes(1)}
                outViewSlide={now - 1 === 1 ? "up" : "down"}
                inView={now === 1}
                inViewSlide={prev === 2 ? "down" : "up"}
              />
            )}
            {prev === 1 && [now - 1, now, now + 1].includes(2) && (
              <QuestionTwo
                outView={[now - 1, now + 1].includes(2)}
                outViewSlide={now - 1 === 2 ? "up" : "down"}
                inView={now === 2}
                inViewSlide={"up"}
                showIndustriesList={showIndustriesList}
                setShowIndustriesList={setShowIndustriesList}
              />
            )}
          </div>
        </section>
      </main>
    </>
  );
}
