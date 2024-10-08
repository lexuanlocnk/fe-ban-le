"use client";
import {
  useState,
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { cartReducer } from "./cartReducer";
import { notification } from "antd";
import { Next13ProgressBar } from "next13-progressbar";

export const AppContext = createContext();
export const UseAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("UseAppContext must be used with an AppProvider");
  }
  return context;
};

export default function AppProvider({ children }) {
  const [infoUpdate, setInfoUpdate] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemCompare, setItemCompare] = useState([]);
  const [statusSearch, setStatusSearch] = useState(false);
  const [menuCategories, setMenuCategories] = useState(false);
  const [itemCart, setItemCart] = useState([]);
  const [stateCart, dispatch] = useReducer(cartReducer, {
    idClickBuyNow: {
      status: null,

      idCart: null,
      idProduct: null,
    },
    products: [],
    stateCheckedProducts: [],
    valueVoucher: null,
    valueVoucherDetail: null,
    total: 0,
    orderPoints: 0,
    totalPoints: 1000,
    productNotAccount:
      typeof window !== "undefined" && localStorage.getItem("cart_not_account")
        ? JSON.parse(localStorage.getItem("cart_not_account"))
        : [],
  });
  const [api, contextHolder] = notification.useNotification();
  const [productViewed, setProductViewed] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("productsViewed"))
      : []
  );

  const handleAddProductViewed = useCallback((item) => {
    const { listPictures, parameter, maso, ...itemUpdate } = item;

    setProductViewed((prev) => {
      const viewedProducts = Array.isArray(prev) ? prev : [];

      const isExist = viewedProducts.some(
        (product) => product.ProductId === itemUpdate.ProductId
      );

      if (!isExist) {
        let updatedViewed = [itemUpdate, ...viewedProducts];

        // Nếu vượt quá 20 item, xóa item đầu tiên
        if (updatedViewed.length > 15) {
          updatedViewed = updatedViewed.slice(0, 10);
        }

        localStorage.setItem("productsViewed", JSON.stringify(updatedViewed));
        return updatedViewed;
      }

      return viewedProducts;
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "cart_not_account",
      JSON.stringify(stateCart.productNotAccount)
    );
  }, [stateCart.productNotAccount]);

  const showModal = (value) => {
    setItemCompare(value);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openNotificationWithIcon = (
    type,
    valueMessage,
    valueDescription,
    position
  ) => {
    api[type]({
      message: valueMessage,
      description: valueDescription,
      placement: position ? position : "topRight",
    });
  };

  return (
    <AppContext.Provider
      value={{
        productViewed,
        handleAddProductViewed,
        infoUpdate,
        setInfoUpdate,
        openNotificationWithIcon,
        itemCart,
        setItemCart,
        stateCart,
        dispatch,
        menuCategories,
        setMenuCategories,
        statusSearch,
        setStatusSearch,
        isModalOpen,
        showModal,
        handleCancel,
        setItemCompare,
        itemCompare,
      }}
    >
      <Next13ProgressBar
        height="3px"
        color="#0A2FFF"
        options={{ showSpinner: true }}
        showOnShallow
      />

      {contextHolder}
      {children}
    </AppContext.Provider>
  );
}
