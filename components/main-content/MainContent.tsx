import { TOTAL_QUESTIONS } from "@/constants";
import { useQuestions } from "@/contexts";
import { useEffect, useState } from "react";
import {
  FirstNameInput,
  IndustryInput,
  Intro,
  LastNameInput,
} from "../questions";

export function MainContent() {
  const [questionNum, setQuestionNum] = useState<{
    prev: null | number;
    now: number;
  }>({
    prev: null,
    now: 0,
  });

  const { prev, now } = questionNum;
  const {
    state: { firstName, lastName },
  } = useQuestions();

  const [errorMsg, setErrorMsg] = useState<{ [key: string]: string }>({});
  const [showIndustriesList, setShowIndustriesList] = useState(false);

  useEffect(() => {
    function handleKeypress(event: KeyboardEvent) {
      if (event.key === "Enter") {
        event.preventDefault();

        if (now + 1 === 2 && firstName === "") {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            firstName: "Please fill this in",
          }));
          return;
        } else if (now + 1 === 3 && lastName === "") {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            lastName: "Please fill this in",
          }));
          return;
        }

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
  }, [firstName, lastName, now]);

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
    <section>
      <div>
        <Intro
          outView={now - 1 === 0 || now > 1}
          outViewSlide="up"
          inView={now === 0}
          inViewSlide={prev === 1 ? "up" : ""}
          isRendered={prev === null}
        />

        {[0, 2].includes(prev ?? -1) && [now - 1, now, now + 1].includes(1) && (
          <FirstNameInput
            outView={[now - 1, now + 1].includes(1)}
            outViewSlide={now - 1 === 1 ? "up" : "down"}
            inView={now === 1}
            inViewSlide={prev === 2 ? "down" : "up"}
            errorMsg={errorMsg.firstName ?? ""}
            setErrorMsg={setErrorMsg}
          />
        )}

        {[1, 3].includes(prev ?? 0) && [now - 1, now, now + 1].includes(2) && (
          <LastNameInput
            outView={[now - 1, now + 1].includes(2)}
            outViewSlide={now - 1 === 2 ? "up" : "down"}
            inView={now === 2}
            inViewSlide={prev === 3 ? "down" : "up"}
            errorMsg={errorMsg.lastName ?? ""}
            setErrorMsg={setErrorMsg}
          />
        )}

        {prev === 2 && [now - 1, now, now + 1].includes(3) && (
          <IndustryInput
            outView={[now - 1, now + 1].includes(3)}
            outViewSlide={now - 1 === 3 ? "up" : "down"}
            inView={now === 3}
            inViewSlide={"up"}
            showIndustriesList={showIndustriesList}
            setShowIndustriesList={setShowIndustriesList}
            errorMsg={errorMsg.industry ?? ""}
            setErrorMsg={setErrorMsg}
          />
        )}
      </div>
    </section>
  );
}
