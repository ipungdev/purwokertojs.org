module.exports = function(moment) {
  Object.getPrototypeOf(moment()).toBSON = function() {
    return this.toDate();
  };
};
