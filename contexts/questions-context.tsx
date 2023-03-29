import { questionsInitialState, questionsReducerFunc } from "@/reducers";
import { QuestionsContextType } from "@/types";
import { createContext, ReactNode, useContext, useReducer } from "react";

const QuestionsContext = createContext<QuestionsContextType>({
  state: questionsInitialState,
  dispatch: () => {},
});

type QuestionsProviderType = {
  readonly children: ReactNode;
};

export function QuestionsProvider({ children }: QuestionsProviderType) {
  const [state, dispatch] = useReducer(
    questionsReducerFunc,
    questionsInitialState
  );

  const value = { state, dispatch };

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
