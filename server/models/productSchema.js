import mongoose from "mongoose";

/*
const productSchema = mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  image: Buffer,
  rating: {
    rate: Number,
    count: Number
  }
});
*/

const productSchema = mongoose.Schema({
  title: String,
  price: Number
});

var ProductMessage = mongoose.model("ProductMessage", productSchema);

export default ProductMessage;