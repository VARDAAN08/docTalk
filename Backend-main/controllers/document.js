const Document = require("../models/documents");
const User = require("../models/user");

const uploadDoc = async (req, res, next) => {
  try {
    const documentDetails = new Document({
      name: req.headers.name,
      link: `${req.protocol}://${req.get(
        "host"
      )}/images/${req.file.filename.replace(/ /g, "_")}`,
      type: req.headers.type,
    });
    console.log(documentDetails);
    const document = await documentDetails.save();

    const user = await User.findById(req.user.id);
    user.documents.push(document);
    const userDocsUpdate = await user.save();

    if (document && userDocsUpdate) {
      res.status(200).json({
        message: "Document upload successful for the user",
      });
    } else {
      res.status(400).json({
        message: "Document upload failed",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      msg: error.message,
    });
  }
};

const getAll = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id).populate("documents");
    const docs = user.documents;

    res.status(200).json({
      status: "success",
      docs,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      msg: error.message,
    });
  }
};

const getDoc = async (req, res, next) => {
  try {
    const id = req.params.id;
    const doc = await Document.findById(id);

    if (!doc) throw new Error("Couldn't find the document");

    res.status(200).json({
      status: "success",
      doc,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      msg: error.message,
    });
  }
};

const deleteDoc = async (req, res, next) => {
  try {
    const id = req.params.id;
    const docs = await Document.findById(id);
    const user = await User.findById(req.user.id).populate("documents");

    for(var i=0;i<user.documents.length;i++){
      if(user.documents[i]._id==id){
        user.documents.splice(i,1);
      }
    }

    const userUpdate = await user.save();
    await Document.findByIdAndDelete(id);

    if (!docs) throw new Error("Couldn't find the document");

    res.status(200).json({
      status: "success",
      doc: user.documents,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      msg: error.message,
    });
  }
};

const updateDoc = async (req, res, next) => {
  try {
    const id = req.params.id;
    const doc = await Document.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) throw new Error("Couldn't find the document");

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      msg: error.message,
    });
  }
};

module.exports = {
  uploadDoc,
  getAll,
  getDoc,
  deleteDoc,
  updateDoc,
};