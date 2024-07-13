import ComponentPagination from "../../../components/componentPagination";
import ContentProductCategory from "../[nameCategory]/contentProductCategory";

const ProductCategory = async ({ dataProducts, page }) => {
  return (
    <div className="  box_product_category bg-white mt-2 ">
      <ContentProductCategory page={page} dataProducts={dataProducts} />

      {dataProducts &&
        dataProducts.listProduct &&
        dataProducts.listProduct.length > 0 && (
          <ComponentPagination
            page={page ?? 1}
            pageSize={16}
            data={dataProducts}
          />
        )}
    </div>
  );
};

export default ProductCategory;
