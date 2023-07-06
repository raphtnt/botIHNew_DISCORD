const axios = require("axios");
const ytdl = require("ytdl-core");

module.exports = async (bot, e) => {
    if(e.t === "INTERACTION_CREATE") {
        const url = `https://discord.com/api/v8/interactions/${e.d.id}/${e.d.token}/callback`;

        if(e.d.data.id === "855499495911718952") { // CMD /STOP
            const body = {
                "type": 4,
                "data": {
                    "content": "test"
                }
            }
            await axios.post(url, body, null);
            // console.log(bot.voice.destroy);
            bot.voice.disconnect
            // bot.voice.delete();

        }

        const body = {
            "type": 4,
            "data": {
                "content": "test"
            }
        }
        await axios.post(url, body, null);

        for (let i = 0; i < 9; i++) {
            console.log("---------------------")
        }
        console.log(e.d.data)

        const channel = bot.channels.cache.get("853340219826634772");
        if (!channel) return console.error("The channel does not exist!");
        channel.join().then(connection => {
            console.log("Successfully connected.");
            const broadcast = bot.voice.createBroadcast();
            broadcast.play(`${e.d.data.options[0].value}`); // http://streamingp.shoutcast.com/NRJ || http://radios.rtbf.be/pure-128.mp3
            connection.play(broadcast);
            broadcast.on('subscribe', dispatcher => {
                console.log("subscribe");
            });

            broadcast.on('unsubscribe', dispatcher => {
                connection.play(broadcast);
            });

        }).catch(e => {
            console.error(e);
        });

/*        const channel = bot.channels.cache.get("853340219826634772");
        if (!channel) return console.error("The channel does not exist!");
        channel.join().then(connection => {
            connection.play(ytdl(`https://www.youtube.com/watch?v=Cj25UpcBDt0`, { filter: 'audioonly' }));
            // connection.play(ytdl(`${e.d.data.options[0].value}`, { filter: 'audioonly' }));
            console.log(e.d.data.options[0].value);
            const broadcast = bot.voice.createBroadcast();
            connection.play(broadcast);
        })*/


// https://www.youtube.com/watch?v=Cj25UpcBDt0
    }
}