const models = {
  informationStoragesModels: require("./nosql/informationStorage"),
  storagesModels: require("./nosql/storages"),
  userModel: require("./nosql/users"),
  postModel: require("./nosql/posts"),
};

module.exports = models;
