const health = (req, res) => {
    res.status(200).json('WORKING WELL')
}

const product = (req, res) => {
    res.status(200).json({
        productID: '2',
        productName: 'KOODA SAPAT',
        productPrice: '25Rs',
        productIMG: 'linkfdf'
    })
}


module.exports = {health, product};

