const Mam = require('@iota/mam');
const { asciiToTrytes, trytesToAscii } = require('@iota/converter');

var mamState = {};
var seed = '';
const publish= async (data, isJSON) => {
    try {
        const trytes = asciiToTrytes(isJSON ? JSON.stringify(data) : data);
        //console.log(trytes)
        const message = Mam.create(mamState, trytes);
        //console.log(message)
        mamState = message.state;
        console.log(message)
        let attachResult = await Mam.attach(message.payload, message.address,3,9);
        return { transArr: attachResult, mamMsg: message, mamState: mamState };
    } catch (error) {
        console.log('MAM publish error', error);
        return null;
    }
};
const initialize = () => {

    if (seed.length == 0)
        mamState = Mam.init({ provider: 'https://nodes.devnet.iota.org:443' });
    else {
        mamState = Mam.init({ provider: 'https://nodes.devnet.iota.org:443' }, seed, null);
    }
    console.log(mamState)
};
const updateMamState= (newMamState) => { mamState = newMamState };
const fetch= async (root, key = "") => {
    try {
        var resp = await Mam.fetch(root,
            (key.length > 0 ? 'restricted' : 'public'), (key.length == 0 ? null : key));
        console.log(resp);
        for (let i = 0; i < resp.messages.length; i++) {
            resp.messages[i] = JSON.parse(trytesToAscii(resp.messages[i]));
        }
        return resp;
    } catch (error) {
        console.log('MAM publish error', error);
        return null;
    }
};
const updateChannel= async (data, prevData) => {

    const mamNewState = {
        subscribed: [],
        channel: {
            side_key: null, mode: 'public', next_root: null, security: 2,
            start: prevData.start, count: 1, next_count: 1, index: 0,
        },
        seed: prevData.seed,
    };
    try {
        mamState = mamNewState;
        const mamData = await publish(data, true);
        return mamData;
    } catch (error) {
        console.log('MAM append error', error);
        return null;
    }
};
const  generateSeed= () => {
    var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9";
    var seedLen = 81;
    var seed = '';
    var i = 1;
    while (i <= seedLen) {
        seed += charset.charAt(Math.floor(Math.random() * charset.length));
        i++;
    }
    return seed;
}
module.exports = { generateSeed, updateChannel, fetch, updateMamState, initialize, publish }