const Url = require("../models/urlModels");
const { v4: uuidv4 } = require("uuid");
const generateUrl = async (req, res) => {
  try {
    let { url } = req.body;
    if (!url) {
      return res
        .status(400)
        .json({ success: false, message: "Mandatory field can not be empty" });
    }

    // check for valid url 
       const validUrl = isValidUrl(url);
        if(!validUrl){
          return res.status(400).json({success:false, message:"Invalid url!"})
        }
    const ShortId = uuidv4();
    let saveData = {
      shortId: ShortId,
      originalUrl:url,
      clickCount: [],
    };

    await Url.create(saveData);
    return res.status(200).json({ id: ShortId });
  } catch (e) {
   // console.log(e, "ee");
    return res.status(500).json({
      success: false,
      message: "Something went wrong!"
    });
  }
};

const getOriginalUrl = async (req, res) => {
  try {
    const result = await Url.findOneAndUpdate(
        { shortId: req.params.shortId },
        {
          $push: {
            clickCount: {
              timeStamp: Date.now(),
            },
          },
        },
      );


      if (!result) {
        return res.status(400).json({ success: false, message: "Unique id does not exist!" });
      }
      
      if (result.originalUrl) {
        res.redirect(result.originalUrl);
      } else {
        res.status(500).json({ success: false, message:"Original URL not found!" });
      }
  } catch (e) {
   // console.log(e, "ee");
    return res.status(500).json({
      success: false,
      message: "Something went wrong!"
    });
  }
};

module.exports = {
  generateUrl,
  getOriginalUrl,
};


function isValidUrl(inputUrl) {
  try {
    const parsedUrl = new URL(inputUrl);
    return  parsedUrl.protocol === 'https:';
  } catch (error) {
       console.log(error)
    return false;
  }
}