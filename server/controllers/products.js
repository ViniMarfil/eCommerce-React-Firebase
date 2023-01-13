import ProductMessage from "../models/productSchema.js";

export const getProducts = async (req, res) => {
  try {
    const productMessages = await ProductMessage.find();

    res.status(200).json(productMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { title, price} = req.body;

  const newProductMessage = new ProductMessage({ title, price })

  try {
      await newProductMessage.save();

      res.status(201).json(newProductMessage );
  } catch (error) {
      res.status(409).json({ message: error.message });
  }
};
