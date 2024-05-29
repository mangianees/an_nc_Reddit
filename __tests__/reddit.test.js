const seed = require('../db/seeds/seed')
const db = require('../db/connection')
const app = require('../app')
const request = require('supertest')
const testData = require('../db/data/test-data')

beforeAll(()=> seed(testData))
afterAll(()=> db.end())


describe('GET /api/topics', () => {
    test.only('This will respond with properties slug and description', () => {
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
    test.only('This will respond describing all the available endpoints on our API', () => {
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

describe('GET /api/articles/:article_id', () => {
    test.only('should have the properties author,title,article_id,body,topic,created_at,votes,article_img_url', () => {
        return request(app)
        .get('/api/articles?article_id=2')
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

describe('GET /api/articles', () => {
    test.only('article objects, each of which should have the following properties author,title,article_id,topic,created_at,votes,article_img_url,comment_count', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body})=>{
            body.forEach((article)=>{
                expect(article).toEqual(
                    expect.objectContaining({
                        author: expect.any(String),
                        title: expect.any(String),
                        article_id: expect.any(Number),
                        topic: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String),
                        comment_count: expect.any(String) 
                    })
                )
            })
        })
        
        
    })

    
});


describe('CORE: GET /api/articles/:article_id/comments', () => {
    test.only('article objects, each of which should have the following properties author,title,article_id,topic,created_at,votes,article_img_url,comment_count', () => {
        const article_Id =9;
        return request(app)
        .get(`/api/articles/${article_Id}/comments`)
        .expect(200)
        .then(({body})=>{
            body.forEach((comments)=>{
                expect(comments).toEqual(
                    expect.objectContaining({
                        comment_id:expect.any(Number),
                        votes: expect.any(Number),
                        created_at: expect.any(String),
                        author: expect.any(String),
                        body:expect.any(String),
                        article_id:expect.any(Number)
                       
                    })
                )
            })
        })
        
        
    })

    test.only('SORT BY Comment Date desc', () => {
        const article_Id =9;
        return request(app)
        .get(`/api/articles/${article_Id}/comments`)
        .expect(200)
        .then(({body})=>{
            expect(body).toHaveLength(2)
            // expect(body).toBeSortedBy('created_at')
            expect(body).toBeSortedBy('created_at',{ descending: true })
        })
        
        
    })

    
});

