const user = require('../model/user') 
const cart = require('../model/cart')
const order = require('../model/order')

const getAllUsers = async (req,res)=>{
    try {
        const users = await user.find({})
        if(users){
            res.status(200).json({users})
        }
        else res.status(404).json('NO USER FOUND')
    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }   
}

const createUser = async (req,res) => {
    const {name, mobile, email, address} = req.body;
    // console.log(mobile);
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    let alreadyExist = await user.findOne({mobile});
    if(alreadyExist){
        res.status(409).json({message: "User Already Exists"})
    }
    else{
        if(req.body.name.lenght < 2 || req.body.name.length > 20){
            res.status(400).json({message: "The name cannot be less than 2 and greater than 20"})
        }
        else if(!emailRegex.test(req.body.email)) {
                return res.status(400).json({ error: 'Invalid email format. Please provide a valid email address.' });
        }
        else {
            try{
                const newuser = new user({
                    name: req.body.name,
                    mobile: req.body.mobile,
                    email: req.body.email,
                    address: req.body.address,
                    isAdmin: false,
                });
                await newuser.save();
                res.status(201).json({message: "User Created Successfully"})
            } catch(error){
                console.log(error);
                res.status(500).json({message: "Internal Server Error"})
            }
        }
    }
}
const updateUser = async (req,res)=>{
    const {mobile:mobile} = req.params
    // console.log(mobile);
    try{
        const Updateuser = await user.findOneAndUpdate({mobile:mobile}, req.body, {
            new:true,
            runValidators:true,
            useFindAndModify:false
        })
        if(!Updateuser){
            res.status(404).json({message: "User Does Not Exist"})
        }
        else res.status(202).json({message: "SEE YOUR UPDATED DETAILS AT THE FOLLOWING LINK",href: "http://localhost:3000/api/v1/users"})
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error"})
    }
}

const userDetails = async (req,res)=>{
    
    const {mobile:mobile} = req.params;
    try {
        let singleUser = await user.findOne({mobile:mobile});
        if(singleUser){
            res.status(200).json({singleUser});
        }
        else res.status(404).json({message: "User Does Not Exist"})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
    
}

const deleteUser = async(req,res) => {
    const {mobile} = req.body;
    try{
        let existingUser = await user.findOneAndDelete({mobile:mobile});
        await cart.findOneAndDelete({mobile: mobile});
        await order.findOneAndDelete({mobile: mobile});
        if(existingUser){
            res.status(204).json({message: "Deleted Successfully"})
        }
        else res.status(404).json({message: "User Does Not Exist"})
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    userDetails,
    deleteUser
}