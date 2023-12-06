const orders = require('../model/order');
const profileDetails = require('../model/user')

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

            if (product.length!==0) {
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
            const product = user.orders.filter(product => product.requestStatus === 'Pending');

            if (product.length !== 0) {
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



// const addOrder = async (req, res) =>{
    
//     const {mobile:mobile} = req.params;
//     // console.log(mobile);
//     const {scrapName, scrapImage, weight, requestDate} = req.body;
//   try {
//     // Check if the document with the given phone number exists
//     const existingOrder = await orders.findOne({ mobile });

//     if (existingOrder) {
//       // Orders with the phone number exists, push the product to the Orders array
//       existingOrder.orders.push({
//         scrapName: scrapName,
//         scrapImage: scrapImage,
//         weight: weight,
//         requestStatus: 'Pending',
//         requestDate: requestDate,
//         confirmationDate: "Not Available",
//       });

//       await existingOrder.save();
//       res.status(200).json({ message: 'Order added to existing List.' });
//     } else {
//       // Document with the phone number doesn't exist, create a new document
//       const newOrder = new orders({
//         mobile:mobile,
//         orders: [{
//             scrapName: scrapName,
//             scrapImage: scrapImage,
//             weight: weight,
//             requestStatus: 'Pending',
//             requestDate: requestDate,
//             confirmationDate: "Not Available",
//         }],
//       });

//       await newOrder.save();
//       res.status(201).json({ message: 'New document created with the product.' });
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

const addOrder = async (req, res) => {
  const { mobile } = req.params;
  const { orders: newOrders } = req.body;

  try {
    // Check if the document with the given phone number exists
    const existingOrder = await orders.findOne({ mobile });

    if (existingOrder) {
      // Orders with the phone number exist, push the products to the Orders array
      existingOrder.orders.push(
        ...newOrders.map(({ scrapName, scrapImage, scrapWeight, requestDate }) => ({
          scrapName,
          scrapImage,
          scrapWeight,
          requestStatus: 'Pending',
          requestDate,
          confirmationDate: 'Not Available',
        }))
      );

      await existingOrder.save();
      res.status(201).json({ message: 'Orders added to existing list.' });
    } else {
      // Document with the phone number doesn't exist, create a new document
      const newOrder = new orders({
        mobile,
        orders: newOrders.map(({ scrapName, scrapImage, scrapWeight, requestDate }) => ({
          scrapName,
          scrapImage,
          scrapWeight,
          requestStatus: 'Pending',
          requestDate,
          confirmationDate: 'Not Available',
        })),
      });

      await newOrder.save();
      res.status(201).json({ message: 'New document created with the products.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const updateRequestStatus = async (req, res) =>{
    const {mobile, requestStatus, scrapName, confirmationDate} = req.body;
    // console.log(mobile, requestStatus, scrapName);
    try {
        // Find the document with the given phone number
        const user = await orders.findOne({ mobile });

        if (user) {
        // Find the product in the products array with the current name
        const order = user.orders.find(order => order.scrapName === `${scrapName}` && order.requestStatus === 'Pending');

        if (order) {
            // Update the product name
            order.requestStatus = requestStatus;
            order.confirmationDate = confirmationDate;

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

const ordersFromUser = async (req, res) => {
    try {
      const result = await orders.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'mobile',
            foreignField: 'mobile',
            as: 'profileDetails',
          },
        },
        {
          $unwind: {
            path: '$profileDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            'profileDetails.name': 1,
            'profileDetails.address': 1,
            'mobile': 1,
            'orders': 1,
          },
        },
        {
          $unwind: {
            path: '$orders',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: {
            'orders.requestStatus': 'pending',
          },
        },
        {
          $group: {
            _id: {
              mobile: '$mobile',
              name: '$profileDetails.name',
              address: '$profileDetails.address',
            },
            orders: {
              $push: '$orders',
            },
          },
        },
        {
          $project: {
            userdetails: '$_id',
            orders: 1,
            _id: 0, // Exclude the default _id field
          },
        },
      ]);
      if(result.length !== 0) res.status(200).json(result);
      else res.status(404).json({message: "NO Incomming Requests"});
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
  

module.exports = {orderHistory, addOrder, recentOrders, updateRequestStatus, ordersFromUser}