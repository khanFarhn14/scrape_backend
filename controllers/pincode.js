const Pincode = require('../model/pincode')

const addPincode = async (req, res) =>{
    const {pincode, postalOffice} = req.body;

    try {
        // Check if the pincode already exists
        const existingPincode = await Pincode.findOne({ pincode });

        if (existingPincode) {
            res.status(409).json({ error: 'Pincode already exists' });
        }

        else {
            // Create a new pincode
            const newPincode = new Pincode({
                pincode,
                postalOffice,
            });

            // Save the new pincode to the database
            await newPincode.save();
            res.status(201).json({ message: 'Pincode added successfully' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'})
    }
}


module.exports = {
    addPincode
}