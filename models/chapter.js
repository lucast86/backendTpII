const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChapterSchema = new Schema({
    title: { type: String, unique: true, lowercase: true, requerid: true },
    description: { type: String, requerid: true },
    videoUrlCharter: { type: String, unique: true, requerid: true },
    seriesIdBelongs: { type: Schema.Types.ObjectId, ref: 'Serie' }
})

module.exports = mongoose.model('Chapter', ChapterSchema)

