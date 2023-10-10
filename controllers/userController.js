const { User } = require('../models');

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ success: false });
    }

    const newUser = await User.create({ name });

    res.json({ success: true, data: newUser });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = userController;