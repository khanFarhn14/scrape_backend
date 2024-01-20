const Pincode = require('../model/pincode')


const getPincodes = async (req,res)=>{
    try {
        const allPincodes = await Pincode.find({}).sort({ pincode: 1 });
        if (allPincodes) {
            // Extract relevant data and send as JSON
            res.status(200).json({pincodes: allPincodes});
        } else {
            res.status(404).json({ message: 'No Pincodes Found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'})
    }
}

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

const deletePincode = async(req,res) => {
    const {pincode} = req.body;
    try{
        let existingPincode = await Pincode.findOneAndDelete({pincode:pincode});
        
        if(existingPincode){
            res.status(204).json({message: "Deleted Successfully"})
        }
        else res.status(404).json({message: "Pincode Does Not Exist"})
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error"})
    }
}


module.exports = {
    addPincode,
    deletePincode,
    getPincodes
}