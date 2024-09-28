const Person = require('../models/person');

exports.getAllPeople = async (req, res) => {
  try {
    const people = await Person.findAll();
    res.json(people);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPerson = async (req, res) => {
  try {
    const person = await Person.create(req.body);
    res.status(201).json(person);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};