const scrap = require('../model/scrap')

const scrapList = async (req,res)=>{
    try {
        const scrapItem = await scrap.find({})
        if(scrapItem.length !== 0){
            res.status(200).json({scrapItem})
        }
        else res.status(404).json({message: 'NO ITEM FOUND'})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch Item' });
    }
}

const wires = async (req, res) =>{
    try {
        const wireCategory = await scrap.find({scrapCategory: "Wire"})
        if(wireCategory.length !== 0){
            res.status(200).json({wireCategory})
        }
        else res.status(404).json({message: 'NO ITEM FOUND'})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Failed to Fetch'})
    }
}


const eWastes = async (req, res) =>{
    try {
        const eWasteCategory = await scrap.find({scrapCategory: "E-waste"})
        if(eWasteCategory.length !== 0){
            res.status(200).json({eWasteCategory})
        }
        else res.status(404).json({message: 'NO ITEM FOUND'})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Failed to Fetch'})
    }
}


const metals = async (req, res) =>{
    try {
        const metalCategory = await scrap.find({scrapCategory: "Metal"})
        if(metalCategory.length !== 0){
            res.status(200).json({metalCategory})
        }
        else res.status(404).json({message: 'NO ITEM FOUND'})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Failed to Fetch'})
    }
}


const papers = async (req, res) =>{
    try {
        const paperCategory = await scrap.find({scrapCategory: "Paper"})
        if(paperCategory.length !== 0){
            res.status(200).json({paperCategory})
        }
        else res.status(404).json({message: 'NO ITEM FOUND'})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Failed to Fetch'})
    }
}


const singleScrap = async (req,res) =>{
    const {id} = req.params;
    // console.log(id);
    try {
        const item = await scrap.findOne({_id: id});
        if(item){
            res.status(200).json({item});
        }
        else{
            res.status(404).json({message:"Scrap Does Not Exist"})
        }
        
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
}


const updateScrapPrice = async (req, res) => {
    const { id } = req.params;
    const { scrapPrice } = req.body;

    try {
        const item = await scrap.findOne({ _id: id });

        if (item) {
            item.scrapPrice = scrapPrice;
            await item.save();
            res.status(200).json({ message: 'Updated scrap price', item });
        } else {
            res.status(404).json({ message: 'Scrap not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {scrapList, wires, eWastes, metals, papers, singleScrap, updateScrapPrice};