type role = "student" | "Admin" | "teacher" | "staff" | "guest";

type User = {
  fullName: string;
  birthDate: Date | null;
  email: string;
  phoneNumber: string | null;
  studentID: string | null;
  communistUnionID: string | null;
  representativeID: string | null;
  role: role | null;
};

export type { User };
