var errorHandler = require('error.notify');

module.exports = {
  display: function name(roomName, message, posX, posY, foregroundColor, font, backgroundColor) {
    try {
      new RoomVisual(roomName).text(message, posX, posY, {
        color: foregroundColor,
        font: font,
        backgroundColor: backgroundColor
      });
    } catch (err) {
      errorHandler.notify("Error in room.visual: " + err);
    }
  }
};
