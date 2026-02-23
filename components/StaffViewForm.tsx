import { Card } from "@/components/ui/card";
import { getSocket } from "@/lib/socket";
import { PatientFormData } from "@/types/form";
import { useEffect, useState } from "react";

function StaffViewForm() {
  const [data, setData] = useState<PatientFormData | null>(null);

  useEffect(() => {
    const socket = getSocket();
    socket.connect();

    socket.on("form-update", (formData: PatientFormData) => {
      setData(formData);
    });

    return () => {
      socket.off("form-update");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8 pt-20 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl space-y-8">
        <div className="space-y-3 text-center">
          <h1 className="mt-5 font-serif text-3xl text-stone-900 sm:text-4xl md:text-5xl">
            Patient <span className="text-green-800 italic">Overview</span>
          </h1>
          <div className="flex items-center justify-center space-x-2 font-light">
            <span className="text-stone-500">Status:</span>
            <span
              className={` ${
                data?.status === "submitted"
                  ? "text-green-600"
                  : data?.status === "typing"
                    ? "text-yellow-600"
                    : "text-gray-500"
              }`}
            >
              {data?.status || "inactive"}
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex w-full items-center space-x-4">
            <p className="text-stone-500 uppercase">Information</p>
            <div className="h-px grow bg-slate-200" />
          </div>
          <Card className="w-full gap-0 bg-white py-0 shadow-sm">
            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
              <div className="border-r border-b p-4 text-left sm:p-5">
                <p className="text-xs font-medium text-stone-500 uppercase">
                  First Name <span className="text-red-500">*</span>
                </p>
                <p className="text-stone-900">{data?.firstName || "-"}</p>
              </div>
              <div className="border-r border-b p-4 text-left sm:p-5">
                <p className="text-xs font-medium text-stone-500 uppercase">
                  Middle Name
                </p>
                <p className="text-stone-900">{data?.middleName || "-"}</p>
              </div>
              <div className="border-r border-b p-4 text-left sm:p-5">
                <p className="text-xs font-medium text-stone-500 uppercase">
                  Last Name <span className="text-red-500">*</span>
                </p>
                <p className="text-stone-900">{data?.lastName || "-"}</p>
              </div>
              <div className="border-r border-b p-4 text-left sm:p-5">
                <p className="text-xs font-medium text-stone-500 uppercase">
                  Date of Birth <span className="text-red-500">*</span>
                </p>
                <p className="text-stone-900">{data?.dateOfBirth || "-"}</p>
              </div>
              <div className="border-r border-b p-4 text-left sm:p-5">
                <p className="text-xs font-medium text-stone-500 uppercase">
                  Gender <span className="text-red-500">*</span>
                </p>
                <p className="text-stone-900">{(data?.gender && data.gender !== "Select") ? data.gender : "-"}</p>
              </div>
              <div className="border-r border-b p-4 text-left sm:p-5">
                <p className="text-xs font-medium text-stone-500 uppercase">
                  Phone Number <span className="text-red-500">*</span>
                </p>
                <p className="text-stone-900">{data?.phoneNumber || "-"}</p>
              </div>
              <div className="border-r border-b p-4 text-left sm:p-5">
                <p className="text-xs font-medium text-stone-500 uppercase">
                  Email Address <span className="text-red-500">*</span>
                </p>
                <p className="text-stone-900">{data?.email || "-"}</p>
              </div>
              <div className="border-r border-b p-4 text-left sm:p-5">
                <p className="text-xs font-medium text-stone-500 uppercase">
                  Address <span className="text-red-500">*</span>
                </p>
                <p className="text-stone-900">{data?.address || "-"}</p>
              </div>
              <div className="border-r border-b p-4 text-left sm:p-5">
                <p className="text-xs font-medium text-stone-500 uppercase">
                  Preferred Language <span className="text-red-500">*</span>
                </p>
                <p className="text-stone-900">
                  {(data?.preferredLanguage && data.preferredLanguage !== "Select") ? data.preferredLanguage : "-"}
                </p>
              </div>
              <div className="border-r border-b p-4 text-left sm:p-5">
                <p className="text-xs font-medium text-stone-500 uppercase">
                  Nationality <span className="text-red-500">*</span>
                </p>
                <p className="text-stone-900">{data?.nationality || "-"}</p>
              </div>
              <div className="border-r border-b p-4 text-left sm:p-5">
                <p className="text-xs font-medium text-stone-500 uppercase">
                  Religion
                </p>
                <p className="text-stone-900">{(data?.religion && data.religion !== "Select") ? data.religion : "-"}</p>
              </div>
              <div className="border-r border-b p-4 text-left sm:p-5">
                <p className="text-xs font-medium text-stone-500 uppercase">
                  Contact Name
                </p>
                <p className="text-stone-900">
                  {data?.emergencyContactName || "-"}
                </p>
              </div>
              <div className="border-r p-4 text-left sm:p-5">
                <p className="text-xs font-medium text-stone-500 uppercase">
                  Relationship
                </p>
                <p className="text-stone-900">
                  {(data?.emergencyRelationship && data.emergencyRelationship !== "Select") ? data.emergencyRelationship : "-"}
                </p>
              </div>
              <div className="p-4 text-left sm:p-5">
                <p className="text-xs font-medium text-stone-500 uppercase">
                  Phone
                </p>
                <p className="text-stone-900">
                  {data?.emergencyPhoneNumber || "-"}
                </p>
              </div>
            </div>
          </Card>
        </div>
        <div className="mt-11 flex w-full items-center">
          <div className="h-px grow bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

export default StaffViewForm;
