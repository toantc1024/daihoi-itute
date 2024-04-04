import { SCHOOL_EMAIL_TEMPLATE } from "../../constants";

export const getSchoolEmail = (studentID: number | string): string => {
  return `${studentID}${SCHOOL_EMAIL_TEMPLATE}`;
};
