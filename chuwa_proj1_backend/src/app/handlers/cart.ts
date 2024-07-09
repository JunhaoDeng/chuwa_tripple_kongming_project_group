import { Account, Cart } from "../database/db";

export const getAllProduct = async function (req, res, next) {
    try {
        const user = await Account.findById(req.params.id).populate({
            path: 'cart',
            populate: {
                path: 'items.product',
                select: '_id name price_cent img_link'
            }
        });

        if (!user.cart) {
            res.status(200).json([]);
        }

        console.log("User", user.cart);
        const cartItems = user.cart.items.map(item => ({
            productId: item.product._id,
            name: item.product.name,
            price_cent: item.product.price_cent,
            img_link: item.product.img_link,
            quantity: item.quantity
        }));
        console.log({ cartItems });

        res.status(200).json({ cartItems });
    } catch (err) {
        return next({
            status: 400,
            message: err.message
        })
    }
}

export const increaseCart = async function (req, res, next) {
    try {
        const userId = req.params.id;
        const productId = req.params.productId;
        // step 1: get the user's cart: no cart / has cart
        const user = await Account.findById(userId).populate('cart');
        console.log(user);
        let cart;
        if (!user.cart) {
            // no cart, create cart
            cart = new Cart({
                product: productId,
                quantity: 1,
            });
            await cart.save();

            user.cart = cart._id;
            await user.save();
            console.log('New cart created and product added successfully');
        } else {
            // has cart, update it
            cart = await Cart.findById(user.cart);

            // step 2: check if product already in cart: no product / has product
            const cartItem = cart.items.find(item => item.product.toString() === productId);
            if (cartItem) {
                // has product
                cartItem.quantity += 1;
            } else {
                cart.items.push({ product: productId, quantity: 1 });
            }

            await cart.save();
            console.log('Cart updated successfully');
        }

        return res.status(200).json(cart);

    } catch (err) {
        console.error("Failed to update cart");
        return next(err);
    }
}

export const decreaseCart = async function (req, res, next) {
    try {
        const userId = req.params.id;
        const productId = req.params.productId;

        const user = await Account.findById(userId).populate('cart');
        const cart = await Cart.findById(user.cart);

        const cartItem = cart.items.find(item => item.product.toString() === productId);
        if (cartItem) {
            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1;
            } else {
                cart.items = cart.items.filter(item => item.product.toString() !== productId);
            }

            await cart.save();
            console.log('Product decreasement successfully.');
        } else {
            throw new Error('Product not found in cart');
        }

        // const updatedCart = Cart.findById(user.cart);
        return res.status(200).json(cart);

    } catch (err) {
        console.error("Failed to update cart");
        return next(err);
    }
}

export const removeProduct = async function (req, res, next) {
    try {
        const productId = req.params.productId;
        const userId = req.params.id;

        const user = await Account.findById(userId).populate('cart');
        const cart = await Cart.findById(user.cart);

        // if product not in cart
        const cartItem = cart.items.find(item => item.product.toString() === productId);
        if (cartItem) {
            cart.items = cart.items.filter(item => item.product.toString() !== productId);
            await cart.save();

            console.log('Product delete successfully.');
        } else {
            throw new Error('Product not found in cart');
        }

        return res.status(200).json(cart);

    } catch (err) {
        console.error("Failed to update cart");
        return next(err);
    }
}