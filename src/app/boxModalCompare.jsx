"use client";
import { UseAppContext } from "./lib/appProvider";
import ModalCompareProducts from "./modalCompareProducts";

const BoxModalCompare = ({ session }) => {
  const { isModalOpen } = UseAppContext();

  return <>{isModalOpen && <ModalCompareProducts session={session} />}</>;
};
export default BoxModalCompare;
