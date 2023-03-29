import { useQuestions, useSharedStates } from "@/contexts";
import { useEffect } from "react";
import { Question } from "../index";

export function MainContent() {
  const {
    questionNum,
    handleQuestionNumUpdate,
    setErrorMsg,
    setShowIndustriesList,
  } = useSharedStates();
  const { state } = useQuestions();

  const { prev, now } = questionNum;
  const { firstName, lastName, industry, role } = state;

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
        } else if (now + 1 === 4 && industry === "") {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            industry: "Oops! Please make a selection",
          }));
          return;
        } else if (now + 1 === 5 && role === "") {
          setErrorMsg((prevValue) => ({
            ...prevValue,
            role: "Oops! Please make a selection",
          }));
          return;
        }

        handleQuestionNumUpdate();
      }
    }

    document.addEventListener("keypress", handleKeypress);

    return function () {
      document.removeEventListener("keypress", handleKeypress);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, industry, lastName, now, role]);

  useEffect(() => {
    function handleClick() {
      setShowIndustriesList(false);
    }

    document.addEventListener("click", handleClick);

    return function () {
      document.removeEventListener("click", handleClick);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div>
        <Question
          type="intro"
          outView={now - 1 === 0 || now > 1}
          outViewSlide="up"
          inView={now === 0}
          inViewSlide={prev === 1 ? "up" : ""}
          isRendered={prev === null}
        />

        {[0, 2].includes(prev ?? -1) && [now - 1, now, now + 1].includes(1) && (
          <Question
            type="firstName"
            outView={[now - 1, now + 1].includes(1)}
            outViewSlide={now - 1 === 1 ? "up" : "down"}
            inView={now === 1}
            inViewSlide={prev === 2 ? "down" : "up"}
          />
        )}

        {[1, 3].includes(prev ?? 0) && [now - 1, now, now + 1].includes(2) && (
          <Question
            type="lastName"
            outView={[now - 1, now + 1].includes(2)}
            outViewSlide={now - 1 === 2 ? "up" : "down"}
            inView={now === 2}
            inViewSlide={prev === 3 ? "down" : "up"}
          />
        )}

        {[2, 4].includes(prev ?? 0) && [now - 1, now, now + 1].includes(3) && (
          <Question
            type="industry"
            outView={[now - 1, now + 1].includes(3)}
            outViewSlide={now - 1 === 3 ? "up" : "down"}
            inView={now === 3}
            inViewSlide={prev === 4 ? "down" : "up"}
          />
        )}

        {prev === 3 && [now - 1, now, now + 1].includes(4) && (
          <Question
            type="role"
            outView={[now - 1, now + 1].includes(4)}
            outViewSlide={now - 1 === 4 ? "up" : "down"}
            inView={now === 4}
            inViewSlide={"up"}
          />
        )}
      </div>
    </section>
  );
}
