import ComponentFilter from "../../../components/componentFilter";

const FilterProducts = ({ dataProperties, searchParams }) => {
  console.log("Filter Products", dataProperties);

  return (
    <div className="  box_filter_products bg-white mt-2 mb-3">
      <ComponentFilter
        getValueParams={searchParams}
        dataProperties={dataProperties}
      />
    </div>
  );
};

export default FilterProducts;
