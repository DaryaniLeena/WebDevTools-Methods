const chatWeb = {
  chatPage: function(chat) {
    // Fill in anything below!
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link rel="stylesheet" href="/chat.css"/>
        </head>
        <body>
          <div id="chat-app">
            <div class="display-panel">
              <div class="user-header">
              ${chatWeb.getUserList(chat)}
              </div>
              <div class="message-window">
              ${chatWeb.getMessageList(chat)}
              </div>
            </div>
            <div class="sender-window">
            ${chatWeb.getOutgoing(chat)}
            </div>
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {
    return `<ol class="messages">` +
    Object.values(chat.messages).map( message => `
      <li class="message-list">
        <div class="message">
          <div class="meta-info">
            <div class="sender-info">
              <span class="username">${message.sender}</span>
            </div>
            <div class="timestamp-info">
              <span class="timestamp">${message.timestamp}</span>
            </div>
          </div>
          <p class="message-text">${message.text}</p>
        </div>
      </li>
    `).join('')+
    `</ol>`;
  },
  getUserList: function(chat) {
    return `<ul class="users">` +
    Object.values(chat.users).map( user => `
      <li class="userAlignment">
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `).join('') +
    `</ul>`;
  },
  getOutgoing: function(chat) {
    return `
      <div class="outgoing">
            <form action="/chat" method="POST">
            <span class="input-message">
              <input type="hidden" name="username" value="Amit" />
              <input class="message, message-field" name="text" value="" placeholder=" Send a message... " autocomplete="off" required />
            </span>
            <span class="send-message">
              <button class="submit-button" type="submit"><img class="sendmessage-image" src="/images/sendIcon.png"/></button>
            </span>
            </form>
        </div>
      </div>
    `;
  }
};
module.exports = chatWeb;
