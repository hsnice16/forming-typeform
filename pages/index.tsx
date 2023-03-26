import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { questrialFont } from "@/utils";
import {
  BtnContainer,
  ProgressBar,
  QuestionBox,
  QuestionBoxHeading,
  QuestionBoxPara,
} from "@/components";

export default function Home() {
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
      <main className={`${styles.main} ${questrialFont.className}`}>
        <section>
          <div>
            <QuestionBox>
              <QuestionBoxHeading>
                Up-skilling requires time commitment
              </QuestionBoxHeading>
              <QuestionBoxPara>
                The GrowthX experience is designed by keeping in mind the
                working hours founders &amp; full time operators typically work
                in.
                <br />
                <br />
                You will spend
                <br />- 6 hours/week for the first 5 weeks
                <br />- 15 hours/week for the last 3 weeks
              </QuestionBoxPara>
              <BtnContainer />
            </QuestionBox>
          </div>
        </section>
      </main>
    </>
  );
}
