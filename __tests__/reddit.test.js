const seed = require('../db/seeds/seed')
const db = require('../db/connection')
const app = require('../app')
const request = require('supertest')
const testData = require('../db/data/test-data')

beforeAll(()=> seed(testData))
afterAll(()=> db.end())


describe('GET /api/topics', () => {
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

describe('GET /api', () => {
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

describe.only('GET /api/articles/:article_id', () => {
    test('should have the properties author,title,article_id,body,topic,created_at,votes,article_img_url', () => {
        return request(app)
        .get('/api/articles/2')
        .expect(200)
        .then(({body})=>{
            body.forEach((article)=>{
                expect(article).toEqual(
                    expect.objectContaining({
                        author: expect.any(String),
                        title: expect.any(String),
                        article_id: expect.any(Number),
                        body: expect.any(String),
                        topic: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String),
                    })
                )
            })
        })
        
        
    });
});
