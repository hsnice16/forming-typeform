import { useSharedStates } from "@/contexts";
import { BtnContainer, QuestionBoxHeading, QuestionBoxPara } from "../index";

export function Intro() {
  const { handleOkClick } = useSharedStates();

  return (
    <>
      <QuestionBoxHeading>
        Up-skilling requires time commitment
      </QuestionBoxHeading>
      <QuestionBoxPara>
        The GrowthX experience is designed by keeping in mind the working hours
        founders &amp; full time operators typically work in.
        <br />
        <br />
        You will spend
        <br />- 6 hours/week for the first 5 weeks
        <br />- 15 hours/week for the last 3 weeks
      </QuestionBoxPara>
      <BtnContainer showPressEnter={true} onClick={handleOkClick}>
        I agree
      </BtnContainer>
    </>
  );
}
