// to do
/// load data fro csv => add to database!!

import { createPresentator } from "@/config/firebase";
import { DEFAULT_PASSWORD } from "@/constants";
import { getSchoolEmail } from "./email_template";

export const createAdmin = async () => {
  let password = "FIT@123";
  let studentID = "fit";

  await createPresentator("FIT@123", {
    fullName: "Đoàn hội FIT",
    birthDate: new Date(10, 20, 2004),
    email: getSchoolEmail(studentID),
    studentID: studentID,
    communistUnionID: "",
    representativeID: "",
    phoneNumber: "",
    role: "admin",
  });
};
