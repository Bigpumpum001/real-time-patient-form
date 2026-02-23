export type PatientFormData = {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  email: string;
  address: string;
  preferredLanguage: string;
  nationality: string;
  emergencyContactName?: string;
  emergencyRelationship?: string;
  religion?: string;
  emergencyPhoneNumber?: string;
  status?: "typing" | "submitted" | "inactive";
};
