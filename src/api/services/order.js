import { db } from "../firebase";
import {
  collection,
  serverTimestamp,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";

const OrderService = {
  createOrder: async (tableNumber, productIds) => {
    const docRef = await addDoc(collection(db, "orders"), {
      table_number: tableNumber,
      products: productIds,
      created_at: serverTimestamp(),
    });
  },
};

export default OrderService;
