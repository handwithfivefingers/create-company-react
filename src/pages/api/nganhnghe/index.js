import { Career } from "@/server/models";
import connectDB from "@/config/connectDB";
import { authenticated, createdHandler, errHandler, existHandler, successHandler } from "@/api/authenticate";
connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await createCareer(req, res);
      break;
    case "GET":
      await fetchCareer(req, res);
  }
}

const fetchCareer = (req, res) => {
  Career.find().exec((err, career) => {
    if (err) return errHandler(err, res);
    if (career) return successHandler(career, res);
  });
};

const createCareer = authenticated(async (req, res) => {
  
  const career = await Career.findOne({
    code: req.body.code,
  });

  if (career) return existHandler(career, res);

  const obj = {
    name: req.body.name,
    code: req.body.code,
  };

  const _career = new Career(obj);
  const data = await _career.save();

  try {
    return createdHandler(data, res);
  } catch (err) {
    return errHandler(err, res);
  }
});
