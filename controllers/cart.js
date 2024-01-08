const cart = require("../model/cart");

const CartItems = async(req,res) =>{
    const {mobile:mobile} = req.params;
    // console.log(mobile);
    try {
        const Items = await cart.findOne({mobile})
        if(!Items){
            res.status(404).json({message: 'NO Items FOUND'})
        }
        else if(Items.cartItems.length === 0){
            res.status(404).json({message: 'NO Items FOUND'})
        }
        else res.status(200).json({Items})
    } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to fetch user' });
    }
};
    
// const addItem = async (req, res)=>{
//     const {mobile: mobile} = req.params;
//     try {
//         const item = await cart.findOneAndUpdate({mobile},{"$push": {cartItems: req.body}}, {upsert: true})
//         if(item) res.status(204).json({message: "Added Successfully"})
//     } catch (error) {
//         res.status(500).json({error: 'Internal Server Error '})
//     }
// }

const addItem = async (req, res) => {
    const { mobile } = req.params;
  
    try {
      // Check if the cart with the specified mobile number exists
      const existingCart = await cart.findOne({ mobile });
  
      if (existingCart) {
        // If the cart exists, push the new item to the cartItems array
        existingCart.cartItems.push(req.body);
        // Save the updated cart document
        await existingCart.save();
  
        res.status(204).json({ message: 'Added Successfully' });
      } else {
        const newCart = new cart({ mobile, cartItems: [req.body] });
        await newCart.save();
        res.status(204).json({ message: 'Added Successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };



const deleteItem = async (req, res) => {
    const {mobile} = req.params;
    const {scrapName} = req.body;
    console.log(mobile, scrapName);
    try {
        const items = await cart.findOneAndUpdate(
        { mobile },
        { $pull: { cartItems: { scrapName: scrapName } } },
        { new: true } // Return the modified document
    );
    if(!items){
        res.status(404).json({message: 'NO Items FOUND'})
    }
    else if (items) {
            res.status(200).json({ message: 'Deleted Successfully', items });
      } else {
            res.status(404).json({ message: 'Item not found in the cart' });
      }
    } catch (error) {
            console.log(error);
            res.status(500).json({error: "internal server error"})
    }
}

const clearCartList = async (req, res) =>{
    const {mobile} = req.params;
    try {
        const result = await cart.updateOne(
            { mobile },
            { $set: { cartItems: [] } }
        );
    
        if (result.modifiedCount > 0) {
            res.status(204).json({ message: 'CartItems cleared successfully', result});
        } else {
            res.status(404).json({ message: 'CartItems array is already empty'});
        }
      } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {CartItems, addItem, deleteItem, clearCartList}