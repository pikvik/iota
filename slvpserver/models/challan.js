var mongoose = require('mongoose');

const challanSchema = new mongoose.Schema({
    challanNum: { type: String, unique: true },
    platenum: { type: String },
    challanDate: { type: Date },
    description: { type: String },
    IOTA_Hash: { type: String },
    IOTA_Hash: { type: String },
    IOTA_Seed: { type: String },
    IOTA_Channel_Start: { type: Number },
    IPFS_Hash: { type: String },
    geoLat: { type: String },
    geoLng: { type: String },
    isAppealed: { type: Boolean },
    isAppealAccepted: { type: Boolean },
    isPaid: { type: Boolean },
    challanAmount: { type: Number }
});

challanSchema.statics.findByNum = async function (num) {
    let challan = await this.findOne({
        challanNum: num,
    });

    return user;
};


// challanSchema.pre('remove', function (next) {
//     this.model('Message').deleteMany({ user: this._id }, next);
// });
var Challan = mongoose.model('Challan', challanSchema)

module.exports = Challan;
;
