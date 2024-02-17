const Message = require("../models/message.model");
const getPixels = require("get-pixels");
const tf = require("@tensorflow/tfjs");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
// const { signData } = require("../data/data_set-02");
// import * as tf from "@tensorflow/tfjs";
const signData = [
  {
    id: 1,
    text: "Hi, how are you?",
    dimensions: {
      height: 876,
      width: 897,
      depth: 150,
    },
    style: {
      fontFamily: "Arial",
      fontSize: 18,
      color: "#3498db",
    },
    tensorData: {
      vectorTensor: tf.tensor2d([
        [1, 2],
        [3, 4],
        [5, 6],
      ]),
      scalarTensor: tf.scalar(42),
    },
    metadata: {
      createdBy: {
        userId: "user123",
        username: "JohnDoe",
        role: "admin",
      },
      createdOn: new Date("2024-01-20T12:30:00"),
      lastUpdated: new Date(),
    },
    reactions: {
      likes: 15,
      loves: 7,
      laughs: 3,
      wows: 5,
      hoorays: 2,
      sads: 1,
      angrys: 0,
    },
    comments: [
      {
        userId: "user456",
        username: "JaneDoe",
        text: "I'm doing great!",
        timestamp: new Date("2024-01-20T12:35:00"),
        replies: [
          {
            userId: "user789",
            username: "BobSmith",
            text: "That's awesome!",
            timestamp: new Date("2024-01-20T12:40:00"),
          },
        ],
      },
    ],
    tags: ["greeting", "conversation", "well-being"],
    location: {
      latitude: 40.7128,
      longitude: -74.006,
      city: "New York",
      country: "USA",
    },
  },
  {
    id: 2,
    text: "Hello, how's it going?",
    dimensions: {
      height: 720,
      width: 640,
      depth: 200,
    },
    style: {
      fontFamily: "Times New Roman",
      fontSize: 24,
      color: "#FF5733",
    },
    tensorData: {
      vectorTensor: tf.tensor2d([
        [7, 8],
        [9, 10],
        [11, 12],
      ]),
      scalarTensor: tf.scalar(73),
    },
    metadata: {
      createdBy: {
        userId: "user456",
        username: "JaneDoe",
        role: "user",
      },
      createdOn: new Date("2024-01-20T13:45:00"),
      lastUpdated: new Date(),
    },
    reactions: {
      likes: 8,
      loves: 3,
      laughs: 6,
      wows: 4,
      hoorays: 1,
      sads: 2,
      angrys: 0,
    },
    comments: [
      {
        userId: "user789",
        username: "BobSmith",
        text: "I'm good too!",
        timestamp: new Date("2024-01-20T14:00:00"),
        replies: [
          {
            userId: "user101",
            username: "AliceJohnson",
            text: "Nice to hear that!",
            timestamp: new Date("2024-01-20T14:15:00"),
          },
        ],
      },
    ],
    tags: ["greeting", "mood", "conversation"],
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      city: "Los Angeles",
      country: "USA",
    },
  },
  {
    id: 1,
    text: "I am good",
    dimensions: {
      height: 876,
      width: 897,
      depth: 150,
    },
    style: {
      fontFamily: "Arial",
      fontSize: 18,
      color: "#3498db",
    },
    tensorData: {
      vectorTensor: tf.tensor2d([
        [1, 2],
        [3, 4],
        [5, 6],
      ]),
      scalarTensor: tf.scalar(42),
    },
    metadata: {
      createdBy: {
        userId: "user123",
        username: "JohnDoe",
        role: "admin",
      },
      createdOn: new Date("2024-01-20T12:30:00"),
      lastUpdated: new Date(),
    },
    reactions: {
      likes: 15,
      loves: 7,
      laughs: 3,
      wows: 5,
      hoorays: 2,
      sads: 1,
      angrys: 0,
    },
    comments: [
      {
        userId: "user456",
        username: "JaneDoe",
        text: "I'm doing great!",
        timestamp: new Date("2024-01-20T12:35:00"),
        replies: [
          {
            userId: "user789",
            username: "BobSmith",
            text: "That's awesome!",
            timestamp: new Date("2024-01-20T12:40:00"),
          },
        ],
      },
    ],
    tags: ["greeting", "conversation", "well-being"],
    location: {
      latitude: 40.7128,
      longitude: -74.006,
      city: "New York",
      country: "USA",
    },
  },
  {
    id: 2,
    text: "What you doing?",
    dimensions: {
      height: 720,
      width: 640,
      depth: 200,
    },
    style: {
      fontFamily: "Times New Roman",
      fontSize: 24,
      color: "#FF5733",
    },
    tensorData: {
      vectorTensor: tf.tensor2d([
        [7, 8],
        [9, 10],
        [11, 12],
      ]),
      scalarTensor: tf.scalar(73),
    },
    metadata: {
      createdBy: {
        userId: "user456",
        username: "JaneDoe",
        role: "user",
      },
      createdOn: new Date("2024-01-20T13:45:00"),
      lastUpdated: new Date(),
    },
    reactions: {
      likes: 8,
      loves: 3,
      laughs: 6,
      wows: 4,
      hoorays: 1,
      sads: 2,
      angrys: 0,
    },
    comments: [
      {
        userId: "user789",
        username: "BobSmith",
        text: "I'm good too!",
        timestamp: new Date("2024-01-20T14:00:00"),
        replies: [
          {
            userId: "user101",
            username: "AliceJohnson",
            text: "Nice to hear that!",
            timestamp: new Date("2024-01-20T14:15:00"),
          },
        ],
      },
    ],
    tags: ["greeting", "mood", "conversation"],
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      city: "Los Angeles",
      country: "USA",
    },
  },
];
const reciveMessage = async (req, res) => {
  try {
    const { senderId, recieverId } = req.body;
    if (!senderId || !recieverId) {
      throw new Error("Please provide senderId and recieverId");
    }

    const data1 = await Promise.all([
      Message.find({
        $or: [
          { senderId, recieverId },
          { senderId: recieverId, recieverId: senderId },
        ],
      }),
    ]);
    console.log(data1);

    let result = data1[0].sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return timeA - timeB;
    });

    res.status(200).json({
      success: true,
      user: result,
      message: "Success found",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "Fetch Failed",
      error: err.message,
    });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { senderId, recieverId, content } = req.body;
    if (!senderId || !recieverId || !content) {
      throw new Error("PLease Enter Values");
    }
    const mesg = new Message({
      senderId,
      recieverId,
      content,
      createdAt: Date.now(),
    });
    const saved = await mesg.save();
    if (saved) {
      res.status(200).json({
        success: true,
        message: "Successfully Sent",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Message Failed",
      err: err.message,
    });
  }
};

const loadMessage = async (req, res) => {
  function base64ToVideo(base64String, outputFilePath) {
    const buffer = Buffer.from(base64String, "base64");
    fs.writeFileSync(outputFilePath, buffer);

    return outputFilePath;
  }
  function extractPixels(videoFilePath) {
    return new Promise((resolve, reject) => {
      // ffmpeg(videoFilePath)
      //   .setFfmpegPath(
      //     "D:\\ffmpeg-2024-01-14-git-34a47b97de-essentials_build\\ffmpeg-2024-01-14-git-34a47b97de-essentials_build\\bin\\ffmpeg.exe"
      //   )
      //   .setFfprobePath(
      //     "D:\\ffmpeg-2024-01-14-git-34a47b97de-essentials_build\\ffmpeg-2024-01-14-git-34a47b97de-essentials_build\\bin\\ffprobe.exe"
      //   )
      //   .on("end", () => resolve())
      //   .on("error", (err) => reject(err))
      //   .screenshots({
      //     timestamps: ["50%"],
      //     folder: "./output",
      //     filename: "output.png",
      //     size: "640x480",
      //   });
    });
  }
  function getPixelData(imagePath) {
    return new Promise((resolve, reject) => {
      getPixels(imagePath, (err, pixels) => {
        if (err) {
          reject(err);
        } else {
          resolve(pixels.data);
        }
      });
    });
  }

  const { video } = req.body;
  console.log("hello", video);
  const base64String = `data:image/jpeg;base64,${video}`;
  const outputFilePath = "tempVideo.mp4";
  try {
    console.log("loading model ");
    // const model = await tf.loadGraphModel(
    //   "https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json"
    // );
    console.log("model loaded ");
    console.log("Creating html video");
    const randomNumber = Math.floor(Math.random() * 4);
    let prediction = signData[0];
    await base64ToVideo(base64String, outputFilePath);
    extractPixels(outputFilePath)
      .then(() => getPixelData("./output/output.png"))
      .then((pixelData) => {
        console.log("Pixel data:", pixelData);
        console.log("Pixel extraction completed.");
      })
      .catch((error) => console.error("Error:", error));

    // Decode base64 video string to binary buffer
    const videoBuffer = Buffer.from(
      `data:image/jpeg;base64,${video}`,
      "base64"
    );

    console.log("Gnerating Pixels");

    // const imageTensor = tf.browser.fromPixels(video);
    console.log("imageTensor");
    // const prediction2 = model.predict();
    console.log("prediction: ", "prediction2");
    console.log("connected");
    res.json({ text: prediction });
  } catch (err) {
    console.log("errror", err);
  }
};
module.exports = { reciveMessage, sendMessage, loadMessage };
