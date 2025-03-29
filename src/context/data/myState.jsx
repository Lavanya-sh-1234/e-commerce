/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import MyContext from "./myContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../../firebase/FirebaseConfig";

export default function MyState(props) {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState({
    title: "",
    price: "",
    imageUrl: "",
    category: "",
    description: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",

      { month: "short", day: "2-digit", year: "numeric" }
    ),
  });

  const addProduct = async () => {
    if (
      products.title == "" ||
      products.price == "" ||
      products.imageUrl == "" ||
      products.category == "" ||
      products.description == ""
    ) {
      return toast.error("Please fill all fields");
    }
    const productRef = collection(fireDB, "products");
    setLoading(true);
    try {
      await addDoc(productRef, products);
      toast.success("Product added successfully");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      getProductData(); // Fetch latest data
      setProducts({
        title: "",
        price: "",
        imageUrl: "",
        category: "",
        description: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const [product, setProduct] = useState([]);

  const getProductData = async () => {
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const edithandle = (item) => {
    setProducts(item);
  };

  // update product
  const updateProduct = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product Updated successfully");
      getProductData();
      setLoading(false);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setProducts("");
  };

  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product Deleted successfully");
      setLoading(false);
      getProductData();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      setOrder(ordersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "user"));
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false);
      });
      setUser(usersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
    getOrderData();
    getUserData();
  }, []);

  const [searchkey, setSearchkey] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  return (
    <>
      {/* Global Loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur-md z-50">
          <div className="flex flex-col items-center space-y-3">
            <ClipLoader color="#ff69b4" size={60} />
          </div>
        </div>
      )}
      <MyContext.Provider
        value={{
          mode,
          toggleMode,
          loading,
          setLoading,
          products,
          setProducts,
          addProduct,
          product,
          setProduct,
          edithandle,
          deleteProduct,
          updateProduct,
          order,
          searchkey,
          filterPrice,
          filterType,
          setSearchkey,
          setFilterPrice,
          setFilterType,
          user,
        }}
      >
        {props.children}
      </MyContext.Provider>
    </>
  );
}
