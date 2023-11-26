const cart = require("../model/cart");

const CartItems = async(req,res) =>{
    const {mobile:mobile} = req.params;
    console.log(mobile);
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
}

module.exports = {CartItems}