import { authenticated, updatedHandler } from '@/api/authenticate';
import connectDB from '@/config/connectDB';
// import { Product } from '../../../../../';
import { Product } from '@/server/models';

connectDB();

export default async function handler(req, res) {
	switch (req.method) {
		case 'POST':
			return await updatedProduct(req, res);
		case 'GET':
			return res.status(400).json({ message: 'Does not support GET' });
	}
}

const updatedProduct = authenticated(async (req, res) => {
	const { id } = req.query;
	const obj = {
		name: req.body.name,
		price: req.body.price,
		type: req.body.type,
		categories: req.body.categories,
	};

	if (req.body.parentId) {
		obj.parentId = req.body.parentId;
	}

	res.send(200);
	const product = await Product.findOneAndUpdate(
		{
			_id: id,
		},
		obj,
		{ new: true }
	);

	return updatedHandler(product, res);
});
