"use client";

import ContentHeader from "./contentHeader";
import { useSession } from "next-auth/react";
import ComponentButtonHomepage from "../../components/componentButtonHomepage";
const Header = ({}) => {
  const { data, status } = useSession();

  // const { statusSearch, setStatusSearch } = UseAppContext();
  // const HandleSearchProduct = () => {
  //   setStatusSearch(!statusSearch);
  // };

  return (
    <>
      <ContentHeader data={data} status={status} />
      <ComponentButtonHomepage />

      {/* {statusSearch && statusSearch === true ? (
        <ComponentBackdropFilter onClick={HandleSearchProduct} />
      ) : (
        <></>
      )} */}
    </>
  );
};

export default Header;
