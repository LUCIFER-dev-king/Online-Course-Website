const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const PublitioAPI = require("publitio_js_sdk").default;
const publitioCredentials = require("./publitio_credentials.json");
const { Storage } = require("@google-cloud/storage");

exports.uploadNewVideo = functions.firestore
  .document("courses/{coursesId}/videos/{videoId}")
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
    const url = await bucket.file(videoName).download();

    console.log(url);

    //------------------------------publitio-----------------------------------------
    const publitio = new PublitioAPI(
      publitioCredentials.key,
      publitioCredentials.secret
    );
    var data;
    try {
      data = await publitio.uploadFile(url[0], "file");
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
