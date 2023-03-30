import { FOUNDER_GOALS, NON_FOUNDER_GOALS } from "@/constants";

export function getGoals(role: "FOUNDER" | "NON_FOUNDER") {
  switch (role) {
    case "FOUNDER":
      return FOUNDER_GOALS;
    case "NON_FOUNDER":
    default:
      return NON_FOUNDER_GOALS;
  }
}
