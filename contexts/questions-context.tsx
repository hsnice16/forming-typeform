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

      if (state.firstName) answeredQues += 1;
      if (state.lastName) answeredQues += 1;
      if (state.industry) answeredQues += 1;
      if (state.role) answeredQues += 1;
      if (state.goals.length !== 0) answeredQues += 1;
      if (state.email) answeredQues += 1;

      return (answeredQues * 100) / TOTAL_QUESTIONS;
    },
    [
      !!state.firstName,
      !!state.lastName,
      !!state.industry,
      !!state.role,
      !!state.goals.length,
      !!state.email,
    ]
  );

  const value = useMemo(() => ({ state, dispatch, percent }), [percent, state]);

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
