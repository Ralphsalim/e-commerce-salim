function CategoryProducts(state = {}, action) {
  switch (action.type) {
    case "SET-CATEGORY-PRODUCTS":
      const category = action.payload.category;
      const products = action.payload.products;
      return { ...state, [category]: products };

    default:
      return state;
  }
}

export default CategoryProducts;
