var ipfs = require('./ipfsService.js');
var mam = require('./mamService.js');
//var appdb = require('./dbService.js');
var mdb = require('./models');
mam.initialize();

//var db = new appdb();
//var mdbam = require('./dbService.js');
module.exports = {
    addChallan: async (platenum, buffer, geoLat, geoLng, desc) => {
        const ipfsResult = await ipfs.addFile(platenum, buffer);
        let mamrec = {
            challandate: new Date(), challanNum: platenum + (new Date().getMilliseconds().toString()),
            platenum: platenum, ipfshash: ipfsResult[0].hash,//'QmRuDCUrEx3FTLLebdmC71TySwcXaWJCxzioWzoeSnHHSv',
            geoLat: geoLat, geoLng: geoLng, locationName: "", description: desc, isAppealed: null,
            applCmnts: null, isApplAprvd: null, isApplAprvCmnts: null, isPaid: false, challanAmount: 0,
            payTransHash: null
        };
        const mamresult = await mam.publish(mamrec, true);
        const dbchallan = mdb.addChallan(mamrec.challanNum, mamrec.platenum, mamrec.challandate, mamresult.mamMsg.root, mamresult.mamMsg.state.seed, mamrec.ipfshash, desc, geoLat, geoLng);

        console.log(dbchallan);
        return {
            iotaroot: mamresult.mamMsg.root,
            ipfshash: ipfsResult[0].hash//'QmRuDCUrEx3FTLLebdmC71TySwcXaWJCxzioWzoeSnHHSv'
        };

    },
    getMChallans: async (platenum, date, isAppealed, isPaid) => {
        try {
            let dbchallans = await mdb.getChallans(platenum, date, isAppealed, isPaid);
            dbchallans.forEach(dbchallan => {
                dbchallan.IOTA_Seed = "";
            });
            return dbchallans;
        } catch (e) {
            throw `failed to get Challans: ${e}`
        }
    },

    getImage: async (hash) => {
        try {
            const result = await ipfs.get(hash);
            return new Buffer(result[0].content, 'base64');
        } catch (e) {
            throw `failed to get file: ${e}`
        }
    },
    getChannel: async (root) => {
        try {
            const result = await mam.fetch(root);
            return result;
        } catch (e) {
            throw `failed to get Channel: ${e}`
        }
    },

    appealChallan: async (challanNum, commnts) => {
        try {
            const dbChallan = await mdb.getChallan(challanNum);
            const mamPrevChallan = await mam.fetch(dbChallan.IOTA_Hash);//this.getChannel(dbChallan.IOTA_Hash);
            let msg = {};
            mamPrevChallan.messages.forEach(message => {
                msg = message;
            });
            msg.isAppealed = true,
                msg.applCmnts = commnts;
            const mamres = await mam.updateChannel(msg, { start: dbChallan.IOTA_Channel_Start, seed: dbChallan.IOTA_Seed })
            const result = await mdb.appealChallan(challanNum);
            return result;
        } catch (e) {
            throw `failed to get appealChallan: ${e}`
        }
    },
    appealAction: async (challanNum, accept, commnts) => {
        try {
            const dbChallan = await mdb.getChallan(challanNum);
            const mamPrevChallan = await mam.fetch(dbChallan.IOTA_Hash);//this.getChannel(dbChallan.IOTA_Hash);
            let msg = {};
            mamPrevChallan.messages.forEach(element => {
                msg = element;
            });
            msg.isApplAprvd = accept,
                msg.isApplAprvCmnts = commnts;
            const mamres = await mam.updateChannel(msg, { start: dbChallan.IOTA_Channel_Start, seed: dbChallan.IOTA_Seed })

            const result = await mdb.appealAction(challanNum, accept);
            return result;
        } catch (e) {
            throw `failed to get appealAction: ${e}`
        }
    },
    getAppealComment: async (challanNum) => {
        var cmts = ''
        const dbChallan = await mdb.getChallan(challanNum);
        const mamPrevChallan = await mam.fetch(dbChallan.IOTA_Hash);//this.getChannel(dbChallan.IOTA_Hash);
        mamPrevChallan.messages.forEach(element => {
            if (element.isAppealed)
                cmts = element.applCmnts;
        });
        return cmts;
    },
    getAppealActionComment: async (challanNum) => {
        var cmts = ''
        const dbChallan = await mdb.getChallan(challanNum);
        const mamPrevChallan = await mam.fetch(dbChallan.IOTA_Hash);//this.getChannel(dbChallan.IOTA_Hash);
        mamPrevChallan.messages.forEach(element => {
            if (element.isApplAprvd)
                cmts = element.isApplAprvCmnts;
        });
        return cmts;
    }
}