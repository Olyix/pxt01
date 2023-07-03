const Royalty = require('../models/Royalty');
const auth = require('../middleware/auth'); // Assuming you have auth middleware

exports.getAll = async (req, res) => {
  try {
    const royalties = await Royalty.find();
    res.status(200).json(royalties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while fetching the royalties" });
  }
};

exports.create = [auth, async (req, res) => { // Middleware function to check authentication
  const newRoyalty = new Royalty({
    ...req.body,
    userId: req.user.id // Assuming auth middleware adds user info to request
  });

  try {
    const royalty = await newRoyalty.save();
    res.status(201).json(royalty);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "An error occurred while creating the royalty" });
  }
}];

exports.getOne = async (req, res) => {
  try {
    const royalty = await Royalty.findById(req.params.id);
    if (royalty == null) {
      return res.status(404).json({ message: 'Cannot find royalty' });
    }
    res.json(royalty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while fetching the royalty" });
  }
};

exports.update = [auth, async (req, res) => { // Middleware function to check authentication
  try {
    const royalty = await Royalty.findById(req.params.id);
    if (royalty == null) {
      return res.status(404).json({ message: 'Cannot find royalty' });
    }

    // Check if the user owns the royalty
    if (royalty.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You do not have permission to update this royalty' });
    }

    const updatedRoyalty = await Royalty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRoyalty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while updating the royalty" });
  }
}];

exports.delete = [auth, async (req, res) => { // Middleware function to check authentication
  try {
    const royalty = await Royalty.findById(req.params.id);
    if (royalty == null) {
      return res.status(404).json({ message: 'Cannot find royalty' });
    }

    // Check if the user owns the royalty
    if (royalty.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You do not have permission to delete this royalty' });
    }

    await royalty.remove();
    res.json({ message: 'Deleted Royalty' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while deleting the royalty" });
  }
}];
