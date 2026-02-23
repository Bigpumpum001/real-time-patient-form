import z from "zod";

export const patientSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  middleName: z.string().max(50).optional(),
  lastName: z.string().min(1, "Last name is required").max(50),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  gender: z.string().min(1, "Gender is required").refine(val => val !== "Select", "Please select gender"),
  phoneNumber: z
    .string()
    .min(8, "Phone number must be at least 8 digits")
    .max(15, "Phone number too long")
    .regex(/^[0-9+()-\s]+$/, "Invalid phone number format"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  address: z.string().min(1, "Address is required"),
  preferredLanguage: z.string().min(1, "Preferred language is required").max(50).refine(val => val !== "Select", "Please select preferred language"),
  nationality: z.string().min(1, "Nationality is required").max(50).regex(/^[a-zA-Z\s]+$/, "Nationality must contain only letters"),
  emergencyContactName: z.string().max(100).optional(),
  emergencyRelationship: z.string().optional(),
  emergencyPhoneNumber: z
    .string()
    .optional()
    .refine(
      (val) => !val || (val.length >= 8 && val.length <= 15),
      "Emergency phone must be 8-15 digits",
    )
    .refine(
      (val) => !val || /^[0-9+()-\s]+$/.test(val),
      "Invalid emergency phone format",
    ),
  religion: z.string().optional(),
  status: z.enum(["typing", "submitted", "inactive"]).optional(),
});

export type PatientSchema = z.infer<typeof patientSchema>;
