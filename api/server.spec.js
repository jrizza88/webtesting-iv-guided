const server = require('./server.js');

const request = require('supertest');

const db = require('../data/dbConfig');

describe('the server', () => {
    it('should set testing environment', () => {
        const env = process.env.DB_ENV;

        expect(env).toBe('testing');
    });
});



describe('GET /', () => {
    // then catch version
    xit('should return status 200', () => {
        return request(server)
            .get('/')
            .then(res => {
                expect(res.status).toBe(200);
            });
    });

    // async await version
    it('should return status 200', async () => {
        const res = await request(server).get('/');
            
                expect(res.status).toBe(200);
     });

     it('should return JSON', async () => {
         const res = await request(server).get('/');

         expect(res.type).toBe('application/json');
     });

     it('should return { api: "up" }', async () => {
        const res = await request(server).get('/');

        expect(res.body).toEqual({api: 'up' });
     })
});

describe('GET /hobbits', () => {

    beforeEach(() => {
        return db('hobbits').truncate();
      });
    // then catch version
    it('should return status 200', async () => {
        const res = await request(server).get('/hobbits');
            
                expect(res.status).toBe(200);
     });

     it('should return JSON', async () => {
        const res = await request(server).get('/hobbits');

        expect(res.type).toBe('application/json');
    });

    it('should return empty array', async () => {
        const res = await request(server).get('/hobbits');

        expect(res.body).toEqual([]);
    });

    it('should return empty array', async () => {
        /// arrange 

        await db('hobbits').insert([
            {name: 'sam'},
            {name: 'frodo'}
        ]);

        // act 
        const res = await request(server).get('/hobbits');
        const data = res.body;

        expect(res.status).toBe(200);
        expect(res.type).toBe('application/json')
        expect(data.length).toEqual(2);
        expect(data[0].id).toBe(1)
        expect(data[0].name).toBe('sam')
    });

   
});