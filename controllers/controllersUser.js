const User = require("../models/user");

const addUser = async (req, res) => {
  const { fullName, status, email } = req.body;
  const newUser = new User({
    fullName,
    status,
    email,
  });
  const findUser = await User.find({ email: email });
  if (!findUser) {
    await newUser.save();
  }
  res.json({
    status: "user add correctly",
  });
};

const validationCompanyExist = async (req, res) => {
  const email = req.params.email;
  console.log(email);
  try {
    const findUser = await User.findOne({ email: email }).populate(
      "companies",
      "nameCompany cuit"
    );
    //const findUser = await User.findOne({ email: email });
    if (findUser) {
      if (findUser.companies.length > 0) {
        res.status(200).json({
          companies: findUser.companies,
        });
        console.log(findUser.companies);
      } else {
        res.status(204).json({
          msg: "Companies not found",
        });
      }
    } else {
      res.status(205).json({
        msg: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  addUser,
  validationCompanyExist
};


