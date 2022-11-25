const mongoose           = require("mongoose");
const {Schema }          = mongoose;

const BalanceSchema      = new Schema({
    name   : String,
    amount : Number
})

const ScheduleSchema   = new Schema({
    start: { type: String, default : "" },
    finish: { type: String, default : "" },
    notes: { type: String, default : "" },
}) 

const EmplyeesSchema = new Schema({
    "name"     : String,
    "age"      : Number,
    "address"  : String,
    "password" : String,
    "email"    : String,
    "skills"   : Array,
    "balances"  : [BalanceSchema],

    "schedules" : { 
        "monday" : {
            type: ScheduleSchema,
            default: () => ({})
        },

        "tuesday" : {
            type: ScheduleSchema,
            default: () => ({})
        },

        "wednesday" : {
            type: ScheduleSchema,
            default: () => ({})
        },

        "thursday" : {
            type: ScheduleSchema,
            default: () => ({})
        },

        "friday" : {
            type: ScheduleSchema,
            default: () => ({})
        },

        "saturday" : {
            type: ScheduleSchema,
            default: () => ({})
        },

        "sunday" : {
            type: ScheduleSchema,
            default: () => ({})
        }
    }
});

module.exports = mongoose.model('emplyees', EmplyeesSchema);