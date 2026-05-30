// @ts-nocheck
import Enquiry from "../../models/enquiry";
import { NotFoundError } from "../../utils/errors/app.error";

/* =========================
   CREATE ENQUIRY
========================= */

export interface CreateEnquiryPayload {
  name: string;
  phoneNumber: string;
  preferredYatra: string;
  message: string;
  email?: string;
  travelers?: string;
  journeyType?: string;
  budget?: string;
}

export const createEnquiryService = async (payload: CreateEnquiryPayload) => {
  const enquiry = await Enquiry.create({
    name: payload.name,
    phoneNumber: payload.phoneNumber,
    preferredYatra: payload.preferredYatra,
    message: payload.message,
    email: payload.email,
    travelers: payload.travelers,
    journeyType: payload.journeyType,
    budget: payload.budget,
  });

  return enquiry;
};

/* =========================
   GET ALL ENQUIRIES
========================= */

export const getAllEnquiriesService = async () => {
  const enquiries = await Enquiry.find().sort({ createdAt: -1 });
  return enquiries;
};

/* =========================
   GET SINGLE ENQUIRY
========================= */

export const getSingleEnquiryService = async (id: string) => {
  const enquiry = await Enquiry.findById(id);

  if (!enquiry) {
    throw new NotFoundError("Enquiry not found");
  }

  return enquiry;
};

/* =========================
   UPDATE STATUS
========================= */

export interface UpdateEnquiryPayload {
  status?: "New" | "Contacted" | "Resolved";
}

export const updateEnquiryService = async (
  id: string,
  payload: UpdateEnquiryPayload,
) => {
  const enquiry = await Enquiry.findById(id);

  if (!enquiry) {
    throw new NotFoundError("Enquiry not found");
  }

  const updated = await Enquiry.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updated;
};

/* =========================
   DELETE ENQUIRY
========================= */

export const deleteEnquiryService = async (id: string) => {
  const enquiry = await Enquiry.findById(id);

  if (!enquiry) {
    throw new NotFoundError("Enquiry not found");
  }

  await Enquiry.findByIdAndDelete(id);

  return true;
};
