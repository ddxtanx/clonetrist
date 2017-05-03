var info = {
    github:{
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret,
        callback: "https://free-code-school-ddxtanx.c9users.io/auth/github/callback"
    },
    twitter:{
        CONSUMER_KEY: process.env.CONSUMER_KEY,
        CONSUMER_SECRET: process.env.CONSUMER_SECRET,
        callback: "https://clonetrist-ddxtanx.herokuapp.com/auth/twitter/callback"
    }
};
module.exports = info