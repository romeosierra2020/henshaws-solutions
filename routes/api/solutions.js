const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Solution = require('../../models/Solutions.js');
router.use(express.urlencoded({extended: true}));
router.use(express.json());
// @route GET api/items
// @desc Get all Items
// @access Public

router.get('/', async (req, res) => {

    try {
        let solutions = await Solution.find({}).sort({name: 1});
        res.json(solutions);
    } catch (err) {
        console.log(err)
    }
})

router.get('/one', async (req, res) => {
    var objectId = mongoose.Types.ObjectId(req.query.id);
    try {
        let solution = await Solution.findOne( _id = objectId );
        res.json(solution);
    } catch (err) {
        console.log(err)
    }
})
// @route POST api/items
// @desc Create new item
// @access Public

router.post('/', async (req, res) => {
    


    let tempSolution = (({
        name, 
        category, 
        subCategory,
        shortDescription,
        longDescription,
        pictureURI,
        pictureAltText,
        kvVideoTitle,
        kvVideoSrc,
        kvVideoId,
        blogTitle,
        blogLink,
        appStoreLink,
        playStoreLink,
        shopLink

    }) => ({
        name,
        category, 
        subCategory,
        shortDescription,
        longDescription,
        pictureURI,
        pictureAltText,
        kvVideoTitle,
        kvVideoSrc,
        kvVideoId,
        blogTitle,
        blogLink,
        appStoreLink,
        playStoreLink,
        shopLink
    }))(req.body);


    let tagsArray = [];
    for(let i = 0; i< Object.keys(req.body).length; i++) {
        if(Object.values(req.body)[i] === 'true') {
            tagsArray.push(Object.keys(req.body)[i])
        }
    }
    if(tagsArray.includes("techIntermediate")) {
        tagsArray.push("techAdvanced");

    }
    if(tagsArray.includes("techNovice")) {
        tagsArray.push("techIntermediate");

    }
    if(tagsArray.includes("techBasic")) {
        tagsArray.push("techNovice");

    }
    

    tempSolution.tags = [...tagsArray];

    const newSolution = new Solution(tempSolution);

    res.json(newSolution)
    
    try {
        let result = await newSolution.save();
        res.json(result);
    } catch (err) {
        console.log(err)
    }
})

// @route DELETE api/items/:id
// @desc Delete an item
// @access Public

router.delete('/:id', async (req, res) => {
    try {
        let solution = await Solution.findById(req.params.id);
        let result = await solution.remove();
        res.json(result);
    } catch (err) {
        res.status(404).send("ID not found");
        console.log(err)
    }
})
module.exports = router;