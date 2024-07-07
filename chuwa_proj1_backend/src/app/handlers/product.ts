import { Product, Account } from "../database/db";
// POST - /api/users/:id/product
export const createProduct = async function (req, res, next) {
  try {
    console.log("in createProduct");
    const {
      name,
      description,
      category,
      price_cent,
      quantity,
      img_link,
      create_time,
      update_time,
    } = req.body;
    const created_by = req.params.id;
    // create a message with the user id
    const product = await Product.create({
      name,
      description,
      category,
      price_cent,
      quantity,
      img_link,
      created_by,
      create_time,
      update_time,
    });
    // find the user by id
    const foundUser = await Account.findById(req.params.id);
    // push the message id to the user's messages array
    foundUser.products.push(product.id);
    // save the user
    await foundUser.save();
    // send back the message with the user id
    const foundProduct = await Product.findById(product._id).populate(
      "created_by",
      {
        email: true,
        type: true,
      }
    );
    return res.status(200).json(foundProduct);
  } catch (err) {
    return next(err);
  }
};

// GET - /api/users/:id/messages/:product_id
export const getProduct = async function (req, res, next) {
  try {
    const product = await Product.findById(req.params.product_id);
    return res.status(200).json(product);
  } catch (err) {
    return next(err);
  }
};

// DELETE - /api/users/:id/messages/:product_id
export const deleteProduct = async function (req, res, next) {
  try {
    // find the message by id
    console.log(req.params);
    const foundProduct = await Product.findById(req.params.product_id);
    // !! not using findByIdAndRemove because we have the pre remove hook in models/messages.js

    // remove the message
    await foundProduct.deleteOne();
    // return a success message
    return res.status(200).json(foundProduct);
  } catch (err) {
    return next(err);
  }
};

// PUT - /api/users/:id/messages/:product_id
export const updateProduct = async function (req, res, next) {
  try {
    const {
      name,
      description,
      category,
      price_cent,
      quantity,
      img_link,
      update_time,
    } = req.body;

    const productId = req.params.product_id;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $set: {
          name,
          description,
          category,
          price_cent,
          quantity,
          img_link,
          update_time,
        },
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log("updatedProduct", updatedProduct);

    return res.status(200).json(updatedProduct);
  } catch (err) {
    return next(err);
  }
};
