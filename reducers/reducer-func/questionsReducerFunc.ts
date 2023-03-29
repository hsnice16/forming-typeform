import {
  QuestionsActionsType,
  QuestionsStateType,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_INDUSTRY,
  SET_ROLE,
} from "../index";

export function questionsReducerFunc(
  state: QuestionsStateType,
  action: QuestionsActionsType
) {
  switch (action.type) {
    case SET_FIRST_NAME:
      return { ...state, firstName: action.payload };

    case SET_LAST_NAME:
      return { ...state, lastName: action.payload };

    case SET_INDUSTRY:
      return { ...state, industry: action.payload };

    case SET_ROLE:
      return { ...state, role: action.payload };

    default:
      return state;
  }
}
