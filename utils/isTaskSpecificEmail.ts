export function isTaskSpecificEmail(emailId: string) {
  const TASK_SPECIFIC = /\+(.+)@/;

  return TASK_SPECIFIC.test(emailId);
}
