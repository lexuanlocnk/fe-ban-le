"use client";

import { useCallback, useEffect, useState } from "react";
import { hostApi } from "../lib/config";
import { useDebouncedCallback } from "use-debounce";
import ModalAccessory from "./modalAccessory";

const ButtonChooseAccessory = ({
  keyAccessory,
  setAccessories,
  accessories,
  checkedConfiguration,
  item,
  nameAccessory,
}) => {
  const [optionFilter, setOptionFilter] = useState([]);

  const [isModalOpenAccessory, setIsModalOpenAccessory] = useState(false);

  const showModalAccessory = useCallback(async () => {
    setIsModalOpenAccessory(true);
    try {
      const response = await fetch(
        `${hostApi}/member/filter-build-pc?key=${item.catId}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setOptionFilter(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }, [item]);

  return (
    <>
      <div onClick={showModalAccessory} className="btn_choose_accessory">
        <span className=" ">
          {accessories &&
          accessories[checkedConfiguration.idConfiguration] &&
          accessories[checkedConfiguration.idConfiguration][keyAccessory]
            ? "Sửa"
            : " Chọn"}
        </span>
      </div>

      {isModalOpenAccessory && (
        <ModalAccessory
          checkedConfiguration={checkedConfiguration}
          setAccessories={setAccessories}
          keyAccessory={keyAccessory}
          optionFilter={optionFilter}
          setIsModalOpenAccessory={setIsModalOpenAccessory}
          isModalOpenAccessory={isModalOpenAccessory}
          nameAccessory={nameAccessory}
          item={item}
        />
      )}
    </>
  );
};

export default ButtonChooseAccessory;
