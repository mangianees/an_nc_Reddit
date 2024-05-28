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