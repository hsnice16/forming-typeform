import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { questrialFont } from "@/utils";
import { MainContent, ProgressBar } from "@/components";
import classNames from "classnames";
import { QuestionsProvider, SharedStatesProvider } from "@/contexts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Typeform</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        <SharedStatesProvider>
          <QuestionsProvider>
            <MainContent />
          </QuestionsProvider>
        </SharedStatesProvider>
      </main>
    </>
  );
}
