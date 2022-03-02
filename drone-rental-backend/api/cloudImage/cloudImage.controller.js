const cloudinary = require('cloudinary').v2;
const CloudImage = require('./cloudImage.model');

async function loadImage(req, res) {
  const { imagePath } = req.body;
  try {
    const response = await cloudinary.uploader.upload(
      imagePath,
      { tags: 'drones', use_filename: true },
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

module.exports = {
  loadImage,
};
