const scrap = require('../model/scrap')

const scrapList = async (req,res)=>{
    try {
        const scrapItem = await scrap.find({})
        if(scrapItem){
            res.status(200).json({scrapItem})
        }
        else res.status(404).json({message: 'NO ITEM FOUND'})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch Item' });
    }
}

module.exports = {scrapList};