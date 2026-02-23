"use client";
import { io, Socket } from "socket.io-client";
import type { PatientFormData } from "@/types/form";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      transports: ["websocket"],
    });
  }
  return socket;
};

export function emitTyping(data: PatientFormData) {
  const s = getSocket();
  s.emit("patient-typing", data);
}

export function emitSubmit(data: PatientFormData) {
  const s = getSocket();
  s.emit("patient-submit", data);
}
