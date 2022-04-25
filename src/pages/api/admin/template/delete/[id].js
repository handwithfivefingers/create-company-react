import connectDB from '@/config/connectDB';
import {
	authenticated,
	authFailedHandler,
	errHandler,
	existHandler,
	successHandler,
	updatedHandler,
	deletedHandler,
} from '@/api/authenticate';
import { TemplateMail } from '@/server/models';

const secret = process.env.SECRET;

connectDB();
export default async function handler(req, res) {
	switch (req.method) {
		case 'POST':
			return await deleteTemplate(req, res);
		// case "GET":
		//   return await getOrders(req, res);
	}
}
const admin = 'admin';

const deleteTemplate = authenticated(async (req, res) => {
	let { id } = req.query;
	// console.log(id);

	await TemplateMail.findOneAndDelete({ _id: id });

	try {
		return deletedHandler('', res);
	} catch (e) {
		return errHandler(e, res);
	}
}, admin);
