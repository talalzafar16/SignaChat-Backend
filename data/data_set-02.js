const tf = require("@tensorflow/tfjs");

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

module.export = { signData };
