import { Input } from "@/components/ui/input";
import React, { useEffect, useState, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PatientFormData } from "@/types/form";
import { getSocket } from "@/lib/socket";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { patientSchema } from "@/lib/validation";
import { z } from "zod";

const initialForm: PatientFormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  phoneNumber: "",
  email: "",
  address: "",
  preferredLanguage: "",
  nationality: "",
  emergencyContactName: "",
  emergencyRelationship: "",
  emergencyPhoneNumber: "",
  religion: "",
};

function PatientForm() {
  const [form, setForm] = useState<PatientFormData>(initialForm);
  const [date, setDate] = React.useState<Date>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const startMonth = new Date(1900, 0); // Jan 1900
  const endMonth = new Date();

  useEffect(() => {
    const socket = getSocket();
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = {
      ...form,
      [name]: value,
      status: "typing" as const,
    };

    setForm(updated);

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    const socket = getSocket();
    socket.emit("patient-typing", updated);
  };

  const handleSelectChange = (name: string, value: string) => {
    const updated = {
      ...form,
      [name]: value,
      status: "typing" as const,
    };

    setForm(updated);

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    const socket = getSocket();
    socket.emit("patient-typing", updated);
  };

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const updated = {
        ...form,
        dateOfBirth: format(selectedDate, "yyyy-MM-dd"),
        status: "typing" as const,
      };

      setForm(updated);

      // Clear error for date field
      if (errors.dateOfBirth) {
        setErrors((prev) => ({ ...prev, dateOfBirth: "" }));
      }

      const socket = getSocket();
      socket.emit("patient-typing", updated);
    }
  };

  const validateForm = useCallback(() => {
    try {
      patientSchema.parse(form);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.issues.forEach((issues) => {
          const fieldName = issues.path[0] as string;
          newErrors[fieldName] = issues.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  }, [form]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const socket = getSocket();
    socket.emit("patient-submit", {
      ...form,
      status: "submitted",
    });
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8 pt-20 sm:px-6 lg:px-8">
      <form onSubmit={submit} className="w-full max-w-3xl space-y-8">
        <div className="space-y-3 text-center">
          <h1 className="mt-5 font-serif text-3xl sm:text-4xl md:text-5xl">
            Patient <span className="text-green-800 italic">Form</span>
          </h1>
          <p className="font-light text-stone-400">
            Fields marked <span className="text-red-500">*</span> are required
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex w-full items-center space-x-4">
            <p className="text-stone-500 uppercase">Personal Information</p>
            <div className="h-px grow bg-slate-200" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-1">
              <div className="text-sm text-stone-500">
                First Name <span className="text-red-500">*</span>
              </div>
              <Input
                className={`border-stone-300 bg-white placeholder:text-stone-300 focus-visible:border-green-800 focus-visible:ring-[1px] ${
                  errors.firstName && "border-red-500"
                }`}
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-1">
              <div className="text-sm text-stone-500">
                Middle Name <span className="text-stone-300">(Optional)</span>
              </div>
              <Input
                className="border-stone-300 bg-white placeholder:text-stone-300 focus-visible:border-green-800 focus-visible:ring-[1px]"
                name="middleName"
                placeholder="Middle Name"
                value={form.middleName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1">
              <div className="text-sm text-stone-500">
                Last Name <span className="text-red-500">*</span>
              </div>
              <Input
                className={`border-stone-300 bg-white placeholder:text-stone-300 focus-visible:border-green-800 focus-visible:ring-[1px] ${
                  errors.lastName && "border-red-500"
                }`}
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <div className="text-sm text-stone-500">
                Date of Birth <span className="text-red-500">*</span>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!date}
                    className={`data-[empty=true]:text-muted-foreground w-full justify-between border-stone-300 bg-white text-left font-normal placeholder:text-stone-300 ${
                      errors.dateOfBirth && "border-red-500"
                    }`}
                  >
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                    <ChevronDownIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateChange}
                    defaultMonth={date}
                    captionLayout="dropdown-years"
                    startMonth={startMonth}
                    endMonth={endMonth}
                    disabled={{
                      after: new Date(),
                    }}
                  />
                </PopoverContent>
              </Popover>
              {errors.dateOfBirth && (
                <p className="text-sm text-red-500">{errors.dateOfBirth}</p>
              )}
            </div>
            <div className="space-y-1">
              <div className="text-sm text-stone-500">
                Gender <span className="text-red-500">*</span>
              </div>
              <Select
                onValueChange={(value) => handleSelectChange("gender", value)}
              >
                <SelectTrigger
                  className={`w-full border-stone-300 bg-white placeholder:text-stone-300 ${
                    errors.gender && "border-red-500"
                  }`}
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                {errors.gender && (
                  <p className="text-sm text-red-500">{errors.gender}</p>
                )}
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Select">Select</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex w-full items-center space-x-4">
            <p className="text-stone-500 uppercase">Contact Details</p>
            <div className="h-px grow bg-slate-200" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <div className="text-sm text-stone-500">
                Phone Number <span className="text-red-500">*</span>
              </div>
              <Input
                className={`border-stone-300 bg-white placeholder:text-stone-300 focus-visible:border-green-800 focus-visible:ring-[1px] ${
                  errors.phoneNumber && "border-red-500"
                }`}
                name="phoneNumber"
                placeholder="081 234 5678"
                value={form.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <p className="text-sm text-red-500">{errors.phoneNumber}</p>
              )}
            </div>
            <div className="space-y-1">
              <div className="text-sm text-stone-500">
                Email Address <span className="text-red-500">*</span>
              </div>
              <Input
                className={`border-stone-300 bg-white placeholder:text-stone-300 focus-visible:border-green-800 focus-visible:ring-[1px] ${
                  errors.email && "border-red-500"
                }`}
                name="email"
                type="email"
                placeholder="email@example.com"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-stone-500">
                Address <span className="text-red-500">*</span>
              </div>
              <Input
                className={`border-stone-300 bg-white placeholder:text-stone-300 focus-visible:border-green-800 focus-visible:ring-[1px] ${
                  errors.address && "border-red-500"
                }`}
                name="address"
                placeholder="123 Sukhumvit Rd, Bangkok 10110"
                value={form.address}
                onChange={handleChange}
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address}</p>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex w-full items-center space-x-4">
            <p className="text-stone-500 uppercase">Background</p>
            <div className="h-px grow bg-slate-200" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-1">
              <div className="text-sm text-stone-500">
                Preferred Language <span className="text-red-500">*</span>
              </div>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("preferredLanguage", value)
                }
              >
                <SelectTrigger
                  className={`w-full border-stone-300 bg-white placeholder:text-stone-300 ${
                    errors.preferredLanguage && "border-red-500"
                  }`}
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                {errors.preferredLanguage && (
                  <p className="text-sm text-red-500">
                    {errors.preferredLanguage}
                  </p>
                )}
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Select">Select</SelectItem>
                    <SelectItem value="Thai">Thai</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Japanese">Japanese</SelectItem>
                    <SelectItem value="Korean">Korean</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-stone-500">
                Nationality <span className="text-red-500">*</span>
              </div>
              <Input
                className={`border-stone-300 bg-white placeholder:text-stone-300 focus-visible:border-green-800 focus-visible:ring-[1px] ${
                  errors.nationality && "border-red-500"
                }`}
                name="nationality"
                placeholder="Thai"
                value={form.nationality}
                onChange={handleChange}
              />
              {errors.nationality && (
                <p className="text-sm text-red-500">{errors.nationality}</p>
              )}
            </div>
            <div className="space-y-1">
              <div className="text-sm text-stone-500">
                Religion <span className="text-stone-300">(Optional)</span>
              </div>
              <Select
                onValueChange={(value) => handleSelectChange("religion", value)}
              >
                <SelectTrigger className="w-full border-stone-300 bg-white placeholder:text-stone-300">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Select">Select</SelectItem>
                    <SelectItem value="Buddhism">Buddhism</SelectItem>
                    <SelectItem value="Christianity">Christianity</SelectItem>
                    <SelectItem value="Islam">Islam</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex w-full items-center space-x-4">
            <p className="text-stone-500 uppercase">Emergency Contact</p>
            <div className="h-px grow bg-slate-200" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-1">
              <div className="text-sm text-stone-500">
                Contact Name <span className="text-stone-300">(Optional)</span>
              </div>
              <Input
                className="border-stone-300 bg-white placeholder:text-stone-300 focus-visible:border-green-800 focus-visible:ring-[1px]"
                name="emergencyContactName"
                placeholder="John Doe"
                value={form.emergencyContactName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1">
              <div className="text-sm text-stone-500">
                Relationship <span className="text-stone-300">(Optional)</span>
              </div>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("emergencyRelationship", value)
                }
              >
                <SelectTrigger className="w-full border-stone-300 bg-white placeholder:text-stone-300">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Select">Select</SelectItem>
                    <SelectItem value="Parent">Parent</SelectItem>
                    <SelectItem value="Spouse">Spouse</SelectItem>
                    <SelectItem value="Sibling">Sibling</SelectItem>
                    <SelectItem value="Child">Child</SelectItem>
                    <SelectItem value="Friend">Friend</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-stone-500">
                Phone <span className="text-stone-300">(Optional)</span>
              </div>
              <Input
                className="border-stone-300 bg-white placeholder:text-stone-300 focus-visible:border-green-800 focus-visible:ring-[1px]"
                name="emergencyPhoneNumber"
                placeholder="081 234 5678"
                value={form.emergencyPhoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full items-center space-x-4">
          <div className="h-px grow bg-slate-200" />
        </div>
        <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-green-900 px-8 py-5 font-serif text-xl tracking-widest text-white uppercase hover:bg-green-800 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            Submit Form
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PatientForm;
