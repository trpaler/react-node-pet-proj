const request = require('supertest');
const express = require('express');
const personController = require('../../src/controllers/person.controller');

const app = express();
app.use(express.json());

// Mock database interaction
jest.mock('../../src/models/person', () => ({
  findAll: jest.fn(),
  create: jest.fn(),
}));

const Person = require('../../src/models/person');

app.get('/api/people', personController.getAllPeople);
app.post('/api/people', personController.createPerson);

describe('Person Controller', () => {
  describe('GET /api/people', () => {
    it('should return all people', async () => {
      const mockPeople = [{ id: 1, name: 'John', age: 30, city: 'Cebu' }];
      Person.findAll.mockResolvedValue(mockPeople);

      const res = await request(app).get('/api/people');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(mockPeople);
    });

    it('should handle errors', async () => {
      Person.findAll.mockRejectedValue(new Error('Database error'));

      const res = await request(app).get('/api/people');

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({ message: 'Database error' });
    });
  });

  describe('POST /api/people', () => {
    it('should create a new person', async () => {
      const mockPerson = { id: 1, name: 'Jane', age: 25, city: 'Manila' };
      Person.create.mockResolvedValue(mockPerson);

      const res = await request(app)
        .post('/api/people')
        .send({ name: 'Jane', age: 25, city: 'Manila' });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual(mockPerson);
    });

    it('should return 400 for invalid data', async () => {
      Person.create.mockRejectedValue(new Error('Invalid data'));

      const res = await request(app)
        .post('/api/people')
        .send({ name: '', age: '', city: '' });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toEqual({ message: 'Invalid data' });
    });
  });
});
