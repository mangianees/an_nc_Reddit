const seed = require('../db/seeds/seed')
const db = require('../db/connection')
const app = require('../app')
const request = require('supertest')
const testData = require('../db/data/test-data')

beforeAll(()=> seed(testData))
afterAll(()=> db.end())


describe.only('GET /api/topics', () => {
    test('This will respond with properties slug and description', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({body})=>{
            const topics = body;
            expect(topics).toHaveLength(3)
        })
        
        
    });
});

describe.only('GET /api', () => {
    test('This will respond describing all the available endpoints on our API', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then(({body})=>{
            expect(body).toHaveProperty('/api')
            expect(body).toHaveProperty('/api/topics')
            expect(body).toHaveProperty('/api/articles')
        })
        
        
    });
});