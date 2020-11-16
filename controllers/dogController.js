const mongoose = require('mongoose');

const Dog = mongoose.model('dogs');

module.exports = {
	async index(req, res) {
		try {
			const dogs = await Dog.find();
			res.status(200).json({ dogs });
		} catch (error) {
			res.status(422).send(error);
		}
	},

	async show(req, res) {
		try {
			const dog = await Dog.findById(req.params.id);
			res.status(200).json({ dog });
		} catch (error) {
			res.status(404).send(error);
		}
	},

	async create(req, res) {
		const timestamp = Date.now();
		const dog = await new Dog({ ...req.body, timestamp });
		try {
			dog.creationDate = Date.now();
			await dog.save();
			res.sendStatus(201);
		} catch (error) {
			res.status(422).send(error);
		}
	},

	async update(req, res) {
		try {
			const lastModificationDate = Date.now();
			const dog = await Dog.findById(req.params.id);
			const updatedDog = await dog.update({ ...req.body.dogChanges, lastModificationDate });
			res.status(200).json({ updatedDog });
		} catch (error) {
			res.status(422).send(error);
		}
	},

	async destroy(req, res) {
		try {
			const dog = await Dog.findById(req.params.id);
			const { name } = dog;
			dog.remove();
			const message = `${name} has been adopted! Hooray!`
			res.status(204).json({ message });
		} catch (error) {
			res.status(404).send(error);
		}
	}
} 