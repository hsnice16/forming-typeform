import { questionsInitialState, questionsReducerFunc } from "@/reducers";
import { useReducer } from "react";

export function useQuestionReducer() {
  const [state, dispatch] = useReducer(
    questionsReducerFunc,
    questionsInitialState
  );

  return { state, dispatch };
}
