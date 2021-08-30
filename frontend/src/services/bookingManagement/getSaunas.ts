import { SaunaData } from "utils/dist/bookingManagement/types";
import { Doc } from "utils/dist/types";
import { firestore } from "../fireConfig";

export const getSaunas = async () => {
  const saunas = await firestore.collection("saunas").get();

  return saunas.docs.map((saunaDoc) => {
    return {
      id: saunaDoc.id,
      data: saunaDoc.data(),
    } as Doc<SaunaData>;
  });
};
