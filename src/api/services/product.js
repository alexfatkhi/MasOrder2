import { db } from "../firebase";
import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";

const ProductService = {
    getProducts: async () => {
        const productsCollection = collection(db, "products");
        const querySnapshot = await getDocs(productsCollection);
        const products = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return products;
    },

    getProductById: async (productId) => {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error("Product not found");
        }
    },

    getProductsByIds: async (idsArray) => {
        try {
            const colRef = collection(db, "products");

            const q = query(colRef, where("__name__", "in", idsArray));

            const querySnapshot = await getDocs(q);

            const results = [];
            querySnapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            });

            return results;
        } catch (error) {
            console.error("Error fetching documents by IDs:", error);
        }
    }
}

export default ProductService