const express = require('express') 
const router = new express.Router() 
const ExpressError = require('../expressError') 
const items = require('../fakeDb') // start empty [] 

// ROUTER ROUTES

// GET / 
router.get('/', (req, res) => {
    res.json({ items }) // send JSON with items DB
})

// POST /items 
router.post('/', (req, res, next) => {
    try{
        // if(!req.body.name) {
        //     throw new ExpressError('Name is required', 400) 
        // } else if(!req.body.price) {
        //     throw new ExpressError('Price is required', 400) 
        // }
        const newItem = { name: req.body.name, price: req.body.price }
        items.push(newItem) 
        return res.status(201).json({ item: newItem }) 
    } catch(e) {
        return next(e)
    }
})

// GET /items/:name
router.get('/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name) 
    if(foundItem === undefined) {
        throw new ExpressError('Item not found', 404) 
    }
    res.json({ item: foundItem })
})

// PATCH /items/:name 
router.patch('/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name) 
    if(foundItem === undefined) {
        throw new ExpressError('Item not found', 404) 
    }
    foundItem.name = req.body.name
    foundItem.price = req.body.price
    res.json({ item: foundItem })
})

// DELETE /items/:name 
router.delete('/:name', (req, res) => {
    const foundItem = items.findIndex(item => item.name === req.params.name) 
    if(foundItem === -1) {
        throw new ExpressError('Item not found', 404) 
    }
    items.splice(foundItem, 1) 
    res.json({ message: 'Deleted' })
})

module.exports = router 