"use client";

import { UseAppContext } from "../lib/appProvider";
import ComponentBackdropFilter from "../../components/componentBackdropFilter";
import ContentHeader from "./contentHeader";
import { useSession } from "next-auth/react";

const Header = ({}) => {
  const { data, status } = useSession();

  const { statusSearch, setStatusSearch } = UseAppContext();
  const HandleSearchProduct = () => {
    setStatusSearch(!statusSearch);
  };

  return (
    <>
      <ContentHeader data={data} status={status} />

      {statusSearch && statusSearch === true ? (
        <ComponentBackdropFilter onClick={HandleSearchProduct} />
      ) : (
        <></>
      )}
    </>
  );
};

export default Header;
