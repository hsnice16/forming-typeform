import { TOTAL_QUESTIONS } from "@/constants";
import { questionsInitialState, questionsReducerFunc } from "@/reducers";
import { QuestionsContextType } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";

const QuestionsContext = createContext<QuestionsContextType>({
  state: questionsInitialState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
  percent: 0,
});

type QuestionsProviderType = {
  readonly children: ReactNode;
};

export function QuestionsProvider({ children }: QuestionsProviderType) {
  const [state, dispatch] = useReducer(
    questionsReducerFunc,
    questionsInitialState
  );

  const percent = useMemo(
    function () {
      let answeredQues = 0;
      const { firstName, lastName, industry, role, goals, email } = state;

      if (firstName) answeredQues += 1;
      if (lastName) answeredQues += 1;
      if (industry) answeredQues += 1;
      if (role) answeredQues += 1;
      if (goals.length !== 0) answeredQues += 1;
      if (email) answeredQues += 1;

      return (answeredQues * 100) / TOTAL_QUESTIONS;
    },
    [state]
  );

  const value = { state, dispatch, percent };

  return (
    <QuestionsContext.Provider value={value}>
      {children}
    </QuestionsContext.Provider>
  );
}

export function useQuestions(): QuestionsContextType {
  const context = useContext(QuestionsContext);

  if (context) {
    return context;
  }

  throw new Error("useQuestions must be use inside QuestionsProvider");
}
