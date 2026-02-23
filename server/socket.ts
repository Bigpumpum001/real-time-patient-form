import { createServer } from "http";
import { Server } from "socket.io";
import { PatientFormData } from "../types/form";
const httpServer = createServer();
const PORT = process.env.PORT || 3001
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let latestFormData: PatientFormData = {
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
  status: "inactive",
};

// Inactivity timer
let inactivityTimer: NodeJS.Timeout | null = null;

const resetInactivityTimer = () => {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
  }
  
  inactivityTimer = setTimeout(() => {
    latestFormData = {
      ...latestFormData,
      status: "inactive",
    };
    io.emit("form-update", latestFormData);
    console.log("Patient status: inactive");
  }, 30000); // 30 seconds
};

io.on("connection", (socket) => {
  console.log("Client connected", socket.id);

  socket.emit("form-update", latestFormData);

  socket.on("patient-typing", (data: PatientFormData) => {
    latestFormData = {
      ...data,
      status: "typing",
    };

    resetInactivityTimer();
    io.emit("form-update", latestFormData);
    console.log("Patient status: typing");
  });

  socket.on("patient-submit", (data: PatientFormData) => {
    latestFormData = {
      ...data,
      status: "submitted",
    };

    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      inactivityTimer = null;
    }

    io.emit("form-update", latestFormData);
    console.log("Patient status: submitted");
  });

  socket.on("disconnect", () => {
    console.log("client disconnected:", socket.id);
  });
});

httpServer.listen(PORT,()=>{
    console.log(`Socket server running on http://localhost:${PORT}`)
})