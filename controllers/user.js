const user = require('../model/user') 

const getAllUsers = async (req,res)=>{
    try {
        const users = await user.find({})
        if(users){
            res.status(200).json({users})
        }
        else res.status(404).json('NO USER FOUND')
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }   
}

const createUser = async (req,res) => {
    const {name, mobile, email, address} = req.body;
    console.log(mobile);
    let alreadyExist = await user.findOne({mobile});
    if(alreadyExist){
        res.status(409).json({message: "User Already Exists"})
    }
    try{
        const newuser = new user({
            name: req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
            address: req.body.address,
        });
        await newuser.save();
        res.status(201).json({message: "User Created Successfully"})
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Cannot Create User"})
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
        res.status(202).json({message: "SEE YOUR UPDATED DETAILS AT THE FOLLOWING LINK",href: "http://localhost:3000/api/v1/users"})
    } catch(error){
        console.log(error);
        res.status(500).json({message: "server error"})
    }
}

const userDetails = async (req,res)=>{
    const {mobile:mobile} = req.params;
    let singleUser = await user.findOne({mobile:mobile});
    if(singleUser){
        res.status(200).json({singleUser});
    }
    else res.status(404).json({message: "user Does not exist"})
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    userDetails
}