const PORT = process.env.PORT || 3000;
const mongoURI = 'mongodb+srv://user:qwert12345@cluster0.prqep.mongodb.net/lesson-13';
const mongoConnectConfig = { useNewUrlParser: true, useUnifiedTopology: true };

module.exports = {
  PORT: PORT,
  mongoURI: mongoURI,
  mongoConnectConfig: mongoConnectConfig
}