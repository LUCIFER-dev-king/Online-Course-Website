const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const PublitioAPI = require("publitio_js_sdk").default;
const publitioCredentials = require("./publitio_credentials.json");
const { Storage } = require("@google-cloud/storage");
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");

require("dotenv").config();

var instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true }));

app.post("/makepayment", (req, res) => {
  let { amount, orderId } = req.body;
  instance.orders
    .create({
      amount: amount,
      currency: "INR",
      receipt: orderId,
    })
    .then((result) => {
      console.log(result);
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        error: err,
      });
    });
});

app.post("/verifypayment", (req, res) => {
  console.log(req.body);
  const id = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
  var sign = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(id)
    .digest("hex");

  if (sign === req.body.razorpay_signature) {
    console.log("payment succces");
    res.status(200).json("Payment Succesful");
  } else {
    console.log("went wrong");
    res.status(400).json("went wrong");
  }
});

exports.paymentFunctions = functions.https.onRequest(app);

const runtimeOpts = {
  timeoutSeconds: 540,
};

exports.uploadNewVideo = functions
  .runWith(runtimeOpts)
  .firestore.document(
    "courses/{coursesId}/sections/{sectionsId}/videos/{videoId}"
  )
  .onCreate(async (snap, context) => {
    const videoName = snap.data().videoName;
    console.log(videoName);
    const storage = new Storage({
      keyFilename: "./service-account-file.json",
    });
    const options = {
      version: "v2",
      action: "read",
      expires: Date.now() + 1000 * 60 * 60,
    };
    const bucket = storage.bucket("e-learn-website.appspot.com");
    // const url = await bucket.file("sampleVideo.mp4").getSignedUrl(options);
    const url = await bucket.file("compressed.mp4").download();

    console.log(url);

    //------------------------------publitio-----------------------------------------
    const publitio = new PublitioAPI(
      publitioCredentials.key,
      publitioCredentials.secret
    );
    var data;
    try {
      data = await publitio.uploadFile(url[0], "file", {
        option_download: 0,
      });
      console.log(`Uploading finished. status code: ${data.code}`);
    } catch (error) {
      console.error("Uploading error");
      console.error(error);
    }
    //-----------------------------publitio------------------------------------------

    if (data.code === 201) {
      console.log(
        `Setting data in firestore doc: ${context.params.videoId} with publitioID: ${data.id}`
      );
      await admin
        .firestore()
        .collection("courses")
        .doc(context.params.coursesId)
        .collection("sections")
        .doc(context.params.sectionId)
        .collection("videos")
        .doc(context.params.videoId)
        .set(
          {
            finishedProcessing: true,
            videoUrl: data.url_download,
            thumbUrl: data.url_thumbnail,
            aspectRatio: data.width / data.height,
            publitioId: data.id,
          },
          { merge: true }
        );

      console.log("Deleting source file");
      await bucket.file(videoName).delete();
      console.log("Done");
    } else {
      console.log("Upload status unsuccessful. Data:");
      console.log(data);
    }
  });
