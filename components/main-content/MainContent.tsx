import { useSharedStates } from "@/contexts";
import { useHandleKeypress, useHandleScroll } from "@/hooks";
import { useEffect } from "react";
import { Question } from "../index";

export function MainContent() {
  const { questionNum, setShowIndustriesList } = useSharedStates();
  const { prev, now } = questionNum;

  useHandleKeypress();
  useHandleScroll();

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
          inViewSlide={prev === 1 ? "down" : ""}
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

        {[3, 5].includes(prev ?? 0) && [now - 1, now, now + 1].includes(4) && (
          <Question
            type="role"
            outView={[now - 1, now + 1].includes(4)}
            outViewSlide={now - 1 === 4 ? "up" : "down"}
            inView={now === 4}
            inViewSlide={prev === 5 ? "down" : "up"}
          />
        )}

        {[4, 6].includes(prev ?? 0) && [now - 1, now, now + 1].includes(5) && (
          <Question
            type="goal"
            outView={[now - 1, now + 1].includes(5)}
            outViewSlide={now - 1 === 5 ? "up" : "down"}
            inView={now === 5}
            inViewSlide={prev === 6 ? "down" : "up"}
          />
        )}

        {prev === 5 && [now - 1, now, now + 1].includes(6) && (
          <Question
            type="email"
            outView={[now - 1, now + 1].includes(6)}
            outViewSlide={now - 1 === 6 ? "up" : "down"}
            inView={now === 6}
            inViewSlide={"up"}
          />
        )}
      </div>
    </section>
  );
}
