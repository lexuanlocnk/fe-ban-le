"use client";
import { UseAppContext } from "./lib/appProvider";
import ModalCompareProducts from "./modalCompareProducts";

const BoxModalCompare = ({}) => {
  const { isModalOpen } = UseAppContext();

  return <>{isModalOpen && <ModalCompareProducts />}</>;
};
export default BoxModalCompare;
