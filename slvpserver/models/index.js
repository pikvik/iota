var mongoose = require('mongoose');

var Challan = require('./challan');

const connectDb = () => {
    return mongoose.connect('mongodb://localhost:27017/slvp');
};

const getChallans = async (platenum, date, isAppealed, isPaid) => {
    try {
        let condition = {};
        if (platenum) {
            condition.platenum = platenum;
        } 
        if (date) {            
            var dt = new Date(date);
            var d = dt.getDate();
            var m = dt.getMonth();
            var y = dt.getFullYear();
            condition.challanDate = {
                $gte: new Date(y, m, d), $lte: new Date(y, m, d, 23, 59, 59, 999)
            };


        }
        if (isAppealed)
            condition.isAppealed = isAppealed;
        if (isPaid)
            condition.isPaid = isPaid;
        let res = await Challan.find(condition)
        return res;
    } catch (err) {
        throw `failed to get Challans: ${err}`
    }
};
const getChallan = async (challanNum) => {
    console.log({ 'challanNum': challanNum });
    let res = await Challan.findOne({ 'challanNum': challanNum });
    return res;
};
const addChallan = async function
    (challanNum, platenum, challanDate, IOTA_Hash, IOTA_Seed, IPFS_Hash, desc, lat, lng) {
    const newChallan = new Challan(
        {
            challanNum: challanNum, platenum: platenum, challanDate: challanDate, description: desc, geoLat: lat, geoLng: lng,
            IOTA_Hash: IOTA_Hash, IOTA_Seed: IOTA_Seed, IOTA_Channel_Start: 1,
            IPFS_Hash: IPFS_Hash, isAppealed: false, isAppealAccepted: false, isPaid: false
        });
    return await newChallan.save();
};
const appealChallan = async (challanNum) => {
    try {

        const result = await Challan.findOne({ "challanNum": challanNum });
        result.isAppealed = true;
        result.IOTA_Channel_Start = result.IOTA_Channel_Start + 1;//,IOTA_Hash:mamres.mamMsg.root
        return (await result.save()) != null;
    } catch (e) {
        throw `failed to get Challans: ${e}`
    }
    finally {
        //db.close();
    }
};
const appealAction = async (challanNum, accept) => {
    try {
        const result = await Challan.findOne({ "challanNum": challanNum });
        result.isAppealAccepted = accept;
        result.IOTA_Channel_Start = result.IOTA_Channel_Start + 1;//,IOTA_Hash:mamres.mamMsg.root
        return (await result.save()) != null;
    } catch (e) {
        throw `failed to get Challans: ${e}`
    }
    finally {
        //db.close();
    }
}


const models = { Challan };

module.exports = { connectDb, getChallan, getChallans, addChallan, appealChallan, appealAction, models };
