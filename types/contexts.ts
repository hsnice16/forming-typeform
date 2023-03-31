import { QuestionsActionsType, QuestionsStateType } from "@/reducers";
import { Dispatch, SetStateAction } from "react";
import { ObjectType } from "./index";

/**
 * questions-context
 */

export type QuestionsContextType = {
  readonly state: QuestionsStateType;
  readonly dispatch: Dispatch<QuestionsActionsType>;
  readonly percent: number;
};

/**
 * shared-states-context
 */

export type QuestionNumType = { prev: null | number; now: number };

export type SharedStatesContextType = {
  readonly questionNum: QuestionNumType;
  readonly setQuestionNum: Dispatch<SetStateAction<QuestionNumType>>;
  readonly errorMsg: ObjectType;
  readonly setErrorMsg: Dispatch<SetStateAction<ObjectType>>;
  readonly showIndustriesList: boolean;
  readonly setShowIndustriesList: Dispatch<SetStateAction<boolean>>;
  readonly handleQuestionNumUpdate: () => void;
  readonly handleOkClick: () => void;
};
