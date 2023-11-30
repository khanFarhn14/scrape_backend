const orders = require('../model/order');

const orderHistory = async(req,res) =>{
    const {mobile:mobile} = req.params;
    // console.log(mobile);
    try {
        const order = await orders.findOne({mobile})
        if(!order){
            res.status(404).json('NO Items FOUND')
        }
        else {
            const product = order.orders.filter(product => product.requestStatus === 'Accepted' || product.requestStatus === 'Rejected' );

            if (product) {
                res.status(200).json({product});
                // console.log('Product found:', product);
            } else {
                res.status(404).json({message : "Product not found"})
                // console.log('Product not found.');
            } 
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

const recentOrders = async(req,res) =>{
    const {mobile:mobile} = req.params;
    // console.log(mobile);
    try {
        const user = await orders.findOne({mobile})
        if(!user){
            res.status(404).json('NO Items FOUND')
        }
        else {
            const product = user.orders.filter(product => product.requestStatus === 'pending');

            if (product) {
                res.status(200).json({product});
                // console.log('Product found:', product);
            } else {
                res.status(404).json({message : "Product not found"})
                // console.log('Product not found.');
            } 
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};



const addOrder = async (req, res) =>{
    let today = new Date()
    let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    const {mobile:mobile} = req.params;
    // console.log(mobile);
    const {scrapName, scrapImage, weight} = req.body;
  try {
    // Check if the document with the given phone number exists
    const existingOrder = await orders.findOne({ mobile });

    if (existingOrder) {
      // Orders with the phone number exists, push the product to the Orders array
      existingOrder.orders.push({
        scrapName: scrapName,
        scrapImage: scrapImage,
        weight: weight,
        requestStatus: 'pending',
        requestDate: `${date}`
      });

      await existingOrder.save();
      res.status(200).json({ message: 'Order added to existing List.' });
    } else {
      // Document with the phone number doesn't exist, create a new document
      const newOrder = new orders({
        mobile:mobile,
        orders: [{
            scrapName: scrapName,
            scrapImage: scrapImage,
            weight: weight,
            requestStatus: 'pending',
            requestDate: `${date}`
        }],
      });

      await newOrder.save();
      res.status(201).json({ message: 'New document created with the product.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


const updateRequestStatus = async (req, res) =>{
    const {mobile, requestStatus, scrapName} = req.body;
    // console.log(mobile, requestStatus, scrapName);
    try {
        // Find the document with the given phone number
        const user = await orders.findOne({ mobile });

        if (user) {
        // Find the product in the products array with the current name
        const order = user.orders.find(order => order.scrapName === `${scrapName}` && order.requestStatus === 'pending');

        if (order) {
            // Update the product name
            order.requestStatus = `${requestStatus}`;

            // Save the updated document
            await user.save();
            res.status(204).json({ message: 'Product requeste status updated successfully.' });
        } else {
            res.status(404).json({ error: 'Order Not Found' });
        }
        } else {
            res.status(404).json({ error: 'Document not found for the provided phone number.' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



module.exports = {orderHistory, addOrder, recentOrders, updateRequestStatus}