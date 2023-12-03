const cart = require("../model/cart");

const CartItems = async(req,res) =>{
    const {mobile:mobile} = req.params;
    // console.log(mobile);
    try {
        const Items = await cart.findOne({mobile})
        if(!Items){
            res.status(404).json('NO Items FOUND')
        }
        else res.status(200).json({Items})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};
    
const addItem = async (req, res)=>{
    const {mobile: mobile} = req.params;
    try {
        const item = await cart.findOneAndUpdate({mobile},{"$push": {cartItems: req.body}}, {upsert: true})
        if(item) res.status(204).json({message: "Added Successfully"})
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error '})
    }
}


const deleteItem = async (req, res) => {
    const {mobile} = req.params;
    const {scrapName} = req.body;
    console.log(mobile, scrapName);
    try {
        const item = await cart.findOneAndUpdate(
        { mobile },
        { $pull: { cartItems: { scrapName: scrapName } } },
        { new: true } // Return the modified document
    );
    if (item) {
            res.status(204).json({ message: 'Deleted Successfully' });
      } else {
            res.status(404).json({ message: 'Item not found in the cart' });
      }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "internal server error"})
    }
}



module.exports = {CartItems, addItem, deleteItem}