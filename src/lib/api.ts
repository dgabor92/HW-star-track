// import customAxios from "../config/http";
import axios from "axios";
import { Checklist } from "./interfaces";

const baseURL = import.meta.env.VITE_BASE_URL;

if (baseURL === "") {
  throw new Error("VITE_BASE_URL is not defined");
}

export const getChecklist = async (): Promise<Checklist[]> => {
  const response = await axios.get(baseURL + "/checklists");
  console.log(response.data.checklist);
  if (response.status !== 200) {
    throw new Error("Invalid credentials");
  } else {
    return response.data.checklist;
  }
};

export const getSelectedChecklist = async (
  driveNumber: string
): Promise<Checklist> => {
  const response = await axios.get(baseURL + `/check/start/${driveNumber}`);
  if (response.status !== 200) {
    throw new Error("Invalid credentials");
  }
  return response.data;
};

export const postChecklist = async (
  checklist: Checklist,
  driveNumber: string
): Promise<void> => {
  const response = await axios.put(
    baseURL + `/check/start/${driveNumber}`,
    checklist
  );
  if (response.status !== 200) {
    throw new Error("Invalid credentials");
  } else {
    console.log(response.data);
  }
};
