var info = {
    github:{
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret,
        callback: "https://free-code-school-ddxtanx.c9users.io/auth/github/callback"
    },
    twitter:{
        CONSUMER_KEY: process.env.CONSUMER_KEY,
        CONSUMER_SECRET: process.env.CONSUMER_SECRET,
        callback: "https://free-code-school-ddxtanx.c9users.io/auth/twitter/callback"
    }
};
console.log(info.github);
module.exports = info;