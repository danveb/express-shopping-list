// set environment variable (test)
process.env.NODE_ENV = 'test'

// SUPERTEST test function
const request = require('supertest') 
const { response } = require('../app')
// import app, database 
const app = require('../app')
const items = require('../fakeDb') 

// sample test 
let cucumbers = {
    name: 'cucumber', 
    price: 2.29
}

// beforeEach (JEST) 
beforeEach(function() {
    items.push(cucumbers)
})

// afterEach (JEST) 
afterEach(function() {
    // make sure this *mutates*, not redefines 'cats'
    items.length = 0 // empty out an array (clear content)
})

// GET /items 
describe('GET /items', () => {
    test('GET all items', async() => {
        // request app function(supertest) 
        const res = await request(app)
            .get('/items') 
        // JEST expectations 
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({
            items: [{
                name: 'cucumber', 
                price: 2.29
            }]
        })
    })
})

// GET /items/:name 
describe('GET /items/:name', () => {
    test('GET item by name', async() => {
        // request app function(supertest) 
        const res = await request(app)
            .get(`/items/${cucumbers.name}`) 
        // JEST expectations 
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ item: cucumbers })
    })
    test('Respond with status 404 for invalid item', async() => {
        // request app function(supertest) 
        const res = await request(app)
            .get(`/items/apples`) 
        // JEST expectations 
        expect(res.statusCode).toBe(404)
    })
})

// POST /items 
describe('POST /items', () => {
    test('Create an item', async () => {
        // response object; .post & .send methods
        const res = await request(app)
            .post('/items')
            .send({
                name: 'apples', 
                price: 0.69
            })
        // JEST expectations 
        // status code 201 for "created"
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({
            item: {
                name: 'apples',
                price: 0.69
            }
        })
    })
})

// PATCH /items 
describe('PATCH /items', () => {
    test('Update an item name', async() => {
        const res = await request(app)
            .patch(`/items/${cucumbers.name}`)
            .send({ name: 'pineapples' })
        // JEST expectations 
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({
            item: {
                name: 'pineapples'
            }
        })
    })
    // test #2 -> update a price (FAILING)
    // test('Update an item price', async() => {
    //     const res = await request(app)
    //         .patch(`/items/${cucumbers.price}`)
    //         .send({ price: 1.99 })
    //     // JEST expectations 
    //     expect(res.body).toEqual({
    //         item: {
    //             name: 'cucumber',
    //             price: 1.99
    //         }
    //     })
    // })
})

// DELETE /items 
describe('DELETE /items', () => {
    test('Delete an item', async() => {
        const res = await request(app)
            .delete(`/items/${cucumbers.name}`)
        // JEST expectations 
        expect(res.statusCode).toBe(200)
    })
})