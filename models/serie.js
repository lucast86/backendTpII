const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SerieSchema = new Schema({
    title: { type: String, unique: true, lowercase: true, requerid: true },
    description: { type: String, requerid: true },
    coverImageUrl: { type: String, unique: true, requerid: true },
    category: { type: String, requerid: true },
    chaptersId: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }]
})

module.exports = mongoose.model('Serie', SerieSchema)
