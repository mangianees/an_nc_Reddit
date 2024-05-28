const seed = require('../db/seeds/seed')
const db = require('../db/connection')
const app = require('../app')
const request = require('supertest')
const testData = require('../db/data/test-data')

beforeAll(()=> seed(testData))
afterAll(()=> db.end())


describe.only('Test to see test data seeded or not', () => {
    test('This will seed the test data in testDb', () => {

        console.log('Just to seed and check data');
        
    });
});