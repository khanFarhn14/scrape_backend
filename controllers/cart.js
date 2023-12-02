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

module.exports = {CartItems, addItem}