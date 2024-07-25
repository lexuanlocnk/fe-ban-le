export const cartReducer = (state, action) => {
  const key = action?.payload?.statusProducts;

  switch (action.type) {
    case "INCREASE_NUMBER_PRODUCT":
      return {
        ...state,
        [key]: state[key].map((item) => {
          return item.ProductId === action.payload.id && item.quantity >= 0
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        }),
      };
    case "REDUCE_NUMBER_PRODUCT":
      return {
        ...state,
        [key]: state[key].map(
          (item) =>
            item.ProductId === action.payload.id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 } // Nếu là sản phẩm cần tăng số lượng, thay đổi quantity
              : item // Ngược lại, giữ nguyên item không thay đổi
        ),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        [key]: state[key].filter((c) => c.ProductId !== action.payload.id),
      };
    case "REMOVE_ALL_CART":
      return {
        ...state,
        [key]: state[key].filter(
          (c) => !action.payload.ids.includes(c.ProductId)
        ),
      };

    case "CHECKED_PRODUCTS":
      return {
        ...state,
        stateCheckedProducts: state[action.payload.statusProducts].filter((c) =>
          action.payload.checkedProducts.idsProduct.includes(c.ProductId)
        ),
      };

    case "CALCULATE_TOTAL_COST":
      const { checkedProducts, points } = action.payload;
      let totalCost = 0;

      if (state[key] && state[key].length > 0) {
        totalCost = state[key]
          .filter((product) =>
            checkedProducts.idsProduct.includes(product.ProductId)
          )
          .reduce((total, product) => {
            const price = product.PriceOld;
            return total + price * product.quantity;
          }, 0);
      }

      const voucherValue = state?.valueVoucher?.valueVoucher || 0;
      const total = totalCost - points * 5000 - voucherValue;
      return {
        ...state,
        total: Math.max(total, 0),
      };

    case "REWARD_POINT":
      return {
        ...state,
        orderPoints: Math.floor(state.total / 1000000),
      };

    case "ADD_TO_CART_NOT_ACCOUNT":
      const existingProductIndex = state?.productNotAccount?.findIndex(
        (item) => item.ProductId === action.payload.ProductId
      );

      if (existingProductIndex >= 0) {
        // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên
        const updatedCart = state.productNotAccount.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          productNotAccount: updatedCart,
        };
      }
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới vào giỏ hàng với số lượng là 1
      return {
        ...state,
        productNotAccount: [
          ...state.productNotAccount,
          { ...action.payload, quantity: 1 },
        ],
      };

    case "ADD_TO_PRODUCT_TO_CART":
      const existingProduct = state?.products?.findIndex(
        (item) => item.ProductId === action.payload.ProductId
      );

      if (existingProduct >= 0) {
        // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên
        const updatedCart = state.products.map((item, index) =>
          index === existingProduct
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          products: updatedCart,
        };
      }
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới vào giỏ hàng với số lượng là 1
      return {
        ...state,
        products: [...state.products, { ...action.payload, quantity: 1 }],
      };

    case "ADD_TO_PRODUCT_MULTIPLE_TO_CART":
      const newProducts = action.payload;

      // Create a map to track existing products and their quantities
      const productMap = new Map(
        state.products.map((product) => [product.ProductId, { ...product }])
      );

      // Loop through each product in the newProducts array
      newProducts.forEach((newProduct) => {
        if (productMap.has(newProduct.ProductId)) {
          // If product already exists in the cart, update its quantity
          const existingProduct = productMap.get(newProduct.ProductId);
          existingProduct.quantity = newProduct.quantity;
          productMap.set(newProduct.ProductId, existingProduct);
        } else {
          // If product does not exist in the cart, add it with the specified quantity
          productMap.set(newProduct.ProductId, { ...newProduct });
        }
      });

      // Convert the map back to an array
      const updatedProducts = Array.from(productMap.values());

      return {
        ...state,
        products: updatedProducts,
      };

    case "ADD_TO_PRODUCT_MULTIPLE_TO_CART_NOT_ACCOUNT":
      const newItemsCart = action.payload;

      // Create a map to track existing products and their quantities
      const productMapNotAccount = new Map(
        state.productNotAccount.map((product) => [
          product.ProductId,
          { ...product },
        ])
      );

      // Loop through each product in the newItemsCart array
      newItemsCart.forEach((newProduct) => {
        if (productMapNotAccount.has(newProduct.ProductId)) {
          // If product already exists in the cart, update its quantity

          const existingProduct = productMapNotAccount.get(
            newProduct.ProductId
          );
          existingProduct.quantity = newProduct.quantity;
          productMapNotAccount.set(newProduct.ProductId, existingProduct);
        } else {
          // If product does not exist in the cart, add it with the specified quantity
          productMapNotAccount.set(newProduct.ProductId, { ...newProduct });
        }
      });

      // Convert the map back to an array
      const updatedProductsNotAccount = Array.from(
        productMapNotAccount.values()
      );

      return {
        ...state,
        productNotAccount: updatedProductsNotAccount,
      };

    case "TOTAL_COST_ALL_PRODUCTS":
      return {
        ...state,
        total:
          state[action.payload] &&
          state[action.payload].length &&
          state[action.payload].reduce(
            (total, product) => total + product.PriceOld * product.quantity,
            0
          ),
      };
    case "FETCH_PRODUCT_CART":
      return {
        ...state,
        products: action.payload,
      };

    case "ADD_VOUCHER":
      if (action?.payload?.status == "add") {
        return {
          ...state,
          total:
            state.total +
            (action?.payload?.valueVoucherOld || 0) -
            (action?.payload?.valueVoucher || 0),
          valueVoucher: action.payload,
        };
      } else if (action?.payload?.status == "order") {
        return {
          ...state,
          total: 0,
          valueVoucher: null,
        };
      } else {
        return {
          ...state,
          total: state.total + (action?.payload?.valueVoucherOld || 0),
          valueVoucher: null,
        };
      }

    case "ADD_VOUCHER_DETAIL":
      if (action?.payload?.status == "add") {
        return {
          ...state,

          valueVoucherDetail: action.payload,
        };
      } else if (action?.payload?.status == "order") {
        return {
          ...state,

          valueVoucherDetail: null,
        };
      } else {
        return {
          ...state,
          valueVoucherDetail: null,
        };
      }

    case "CLICK_BUY_NOW":
      return {
        ...state,
        idClickBuyNow: {
          status: action.payload.status,
          idCart: action.payload.idCart,
          idProduct: action.payload.idProduct,
        },
      };
    default:
      return state;
  }
};
