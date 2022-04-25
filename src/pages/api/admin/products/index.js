import { authenticated, errHandler, successHandler } from '@/api/authenticate';
import connectDB from '@/config/connectDB';
import { Product } from '@/server/models';

import _ from 'lodash';
connectDB();

export default async function handler(req, res) {
	switch (req.method) {
		case 'POST':
			return res.status(200).json({ message: 'Method doesnt support' });
		case 'GET':
			return await getProduct(req, res);
	}
}

// Fetch data
const getProduct = async (req, res) => {
	let _product = await Product.find({})
		.populate('categories', 'name')
		.populate('parentId', 'name');
	try {
		let newData = filterData(_product);

		let lastData = filterCaregories(newData);

		return successHandler(lastData, res);
	} catch (err) {
		return errHandler(err, res);
	}
};

const filterData = (data = null) => {
	if (data) {
		return data.map((item) => ({
			name: item.name,
			price: item?.price,
			type: item?.type,
			_id: item?._id,
			slug: item?.slug,
			categories: filterData(item?.categories),
			parentId: item?.parentId || [],
		}));
	}
	return null;
};

const filterCaregories = (prevData) => {
	let data = [];

	let parent;
	let children;

	parent = prevData.filter((item) => item.parentId.length == 0);
	children = prevData.filter((item) => item.parentId.length > 0);

	for (let p of parent) {
		data.push({
			name: p?.name,
			price: p?.price,
			type: p?.type,
			_id: p?._id,
			slug: p?.slug,
			categories: p?.categories,
			children: [],
		});
	}

	if (children.length > 0) {
		children.map((child) => {
			const current = handleCheckChildren(child, data);
			data = current;
		});
	}
	return data;
};

const handleCheckChildren = (child, data) => {
	return data.map((item) => {
		if (_.some(child.parentId, { _id: item._id })) {
			item.children.push({ ...child });
			return item;
		} else {
			return item;
		}
	});
};
