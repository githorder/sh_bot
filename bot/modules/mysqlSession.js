const debug = require("debug")("telegraf:session-mysql");

class MySQLSession {
  constructor({ model }) {
    this.model = model;
    this.options = Object.assign({
      property: "session",
      userProperty: "",
      chatProperty: "",
      getSessionKey: (ctx) => {
        if (!ctx.from || !ctx.chat) {
          return;
        }
        return ctx.from.id + ":" + ctx.chat.id;
      },
    });

    this.sessions = {};
  }

  async getSession(userId, chatId) {
    const key = userId + ":" + chatId;
    if (!this.sessions[key]) {
      try {
        const user = await this.model.findOne({ where: { sessionId: key } });
        if (user) {
          try {
            this.sessions[key] = user.session;
          } catch (err) {
            console.error("Can't parse session state", err);
            this.sessions[key] = {};
          }
        } else {
          this.sessions[key] = {};
        }
      } catch (err) {
        console.error("Can't get user session:", err);
        this.sessions[key] = {};
      }
    }
    debug("session state", key, this.sessions[key]);
    return this.sessions[key];
  }

  async saveSession(userId, chatId, session, from) {
    debug("save session", userId + ":" + chatId, session);
    const key = userId + ":" + chatId;
    if (!session || Object.keys(session).length === 0) {
      try {
        await this.model.destroy({ where: { sessionId: key } });
      } catch (err) {
        console.error("Can't delete (save) user session:", err);
        return false;
      }
    }
    try {
      return await this.model.upsert({
        chatId: chatId,
        sessionId: key,
        session: session,
        tgName: `${from.first_name || ""} ${from.last_name || ""}`,
        username: from.username,
      });
    } catch (err) {
      console.error("Can't save user session:", err);
      return false;
    }
  }

  middleware() {
    return async (ctx, next) => {
      const userId = ctx.from.id;
      const chatId = ctx.chat.id;
      if (!userId || !chatId) {
        console.log("no userId or chatId");
        return next();
      }

      let session = null;
      if (this.options.property) {
        session = await this.getSession(userId, chatId);

        Object.defineProperty(ctx, this.options.property, {
          get: function () {
            return session;
          },
          set: function (newValue) {
            session = Object.assign({}, newValue);
          },
        });
      }

      let userSession = null;

      if (this.options.userProperty) {
        userSession = await this.getSession(userId, 0);

        Object.defineProperty(ctx, this.options.userProperty, {
          get: function () {
            return userSession;
          },
          set: function (newValue) {
            userSession = Object.assign({}, newValue);
          },
        });
      }

      let chatSession = null;

      if (this.options.chatProperty) {
        chatSession = await this.getSession(0, chatId);

        Object.defineProperty(ctx, this.options.chatProperty, {
          get: function () {
            return chatSession;
          },
          set: function (newValue) {
            chatSession = Object.assign({}, newValue);
          },
        });
      }

      debug(
        `session snapshot for Chat: ${chatId || "None"} User: ${
          userId || "None"
        } `,
        session
      );

      if (session) {
        await this.saveSession(userId, chatId, session, ctx.from);
      }
      if (userSession) {
        await this.saveSession(userId, 0, userSession, ctx.from);
      }
      if (chatSession) {
        await this.saveSession(0, chatId, chatSession, ctx.from);
      }
      return next();
    };
  }
}

module.exports = MySQLSession;
