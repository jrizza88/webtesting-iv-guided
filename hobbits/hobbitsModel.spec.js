const Hobbits = require('./hobbitsModel.js');

const db = require('../data/dbConfig.js');


describe('The Hobbit Model', () => {

    beforeEach(() => {
      return db('hobbits').truncate();
    });

    describe('the insert FN', () => {
        it('should insert a hobbit into the db', async () => {
            await Hobbits.insert({ name: 'sam'});

            const hobbits = await db('hobbits');
            expect(hobbits.length).toBe(1);
            expect(hobbits[0].name).toBe('sam');
        })

        it('should return the inserted hobbit by its id', async () => {
            const hobbit = await Hobbits.insert({ name: 'frodo'})

            expect(hobbit.id).toBe(1);
            expect(hobbit.name).toBe('frodo');
        })
    });

    describe('the insert FN', () => {
        it('should retrieve all hobbits in the db', async () => {
            await db('hobbits').insert([
                {name: 'sam'},
                {name: 'frodo'}
            ]);

            const hobbits = await Hobbits.getAll();

            expect(hobbits.length).toBe(2);
            expect(hobbits[0].name).toBe('sam');
        });
    });

    describe('the update function', () => {
        it('should update existing hobbit', async () => {
            // to insert something
            const [id] = await db('hobbits').insert({ name: 'same'});
            // update it
            await Hobbits.update(id, {name: 'sam'})
            // make sure its been updated
            const { name } = await db('hobbits').where({ id }).first();
            // the old version does not remain 
            expect(name).not.toBe('same');
            expect(name).toBe('sam');
         });
         it('should return updated hobbit', async () => {
            const [id] = await db('hobbits').insert({ name: 'same'});
            // update it
            await Hobbits.update(id, {name: 'sam'})


            expect(hobbits.id).toBe(id);
            expect(hobbits.name).toBe('same');
         })
    });
});