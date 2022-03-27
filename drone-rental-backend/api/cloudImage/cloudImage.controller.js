const cloudinary = require('cloudinary').v2;
const CloudImage = require('./cloudImage.model');

async function loadImage(req, res) {
  const { imagePath, fileName, tags } = req.body;
  try {
    const response = await cloudinary.uploader.upload(
      imagePath,
      { tags, public_id: fileName },
      (err, image) => {
        if (err) {
          console.warn(err);
        }
        return image;
      },
    );

    const image = await CloudImage.create({
      public_id: response.public_id,
      secure_url: response.secure_url,
      asset_id: response.asset_id,
    });
    res.status(200).json(image);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function getAllImages(req, res) {
  try {
    const images = await CloudImage.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(400).json({ error });
  }
}

module.exports = {
  loadImage,
  getAllImages,
};
