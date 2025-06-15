const router = require('express').Router();
const Theatre = require('../models/theatreModel');

// Get all theatres for Admin route
router.get('/get-all-theatres', async (req, res) => {
    try{
        const allTheatres = await Theatre.find().populate('owner');
        res.send({
            success: true,
            message: "All theatres fetched!",
            data: allTheatres
        });
    }catch(err){
        res.send({
            success: false,
            message: err.message
        });
    }
});

// Update theatre
router.put('/update-theatre',  async (req, res) => {
    try{
        await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
        // console.log(req.body.theatreId)
        res.send({
            success: true,
            message: "Theatre has been updated!"
        })
    }catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
})

module.exports = router;