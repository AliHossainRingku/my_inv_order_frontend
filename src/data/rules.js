export const rules = {
  nameRules: [
    (v) => !!v || "Name is required",
  ],
  phoneRules: [(v) => !!v || "Phone No is required."],
  categoryRules: [(v) => !!v || "Category is required."],
  brandRules: [(v) => !!v || "Brand is required."],
  sellerRules: [(v) => !!v || "Seller is required."],
  latitudeRules: [(v) => !!v || "Latitude is required."],
  longitudeRules: [(v) => !!v || "Longitude is required."],
  addressRules: [(v) => !!v || "Address is required."],
  productRules: [(v) => !!v || "Product is required."],
  customerRules: [(v) => !!v || "Customer is required."],
  storeRules: [(v) => !!v || "Store is required."],
  userRules: [(v) => !!v || "User is required."],
  statusRules: [(v) => !!v || "Status is required."],
  vatRules: [
    (v) => /^\d*$/.test(v) || "Please Enter Number",
    (v) => v <= 100 || "Vat Cannot be above 100%",
  ],
  priceRules: [
    (v) => !!v || "Price is required.",
    (v) => /^\d*$/.test(v) || "Please Enter Number",
    (v) => v >= 1 || "Price should be above 0",
  ],
  quantityRules: [
    (v) => !!v || "Quantity is required.",
    (v) => /^\d*$/.test(v) || "Please Enter Number",
    (v) => v >= 1 || "Quantity should be above 0",
  ],
}