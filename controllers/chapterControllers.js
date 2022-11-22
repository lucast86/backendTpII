const { chapterService } = require('../services')
const { validationResult } = require('express-validator')

const getChapter = async (req, res) => {

    try{
        const serieId = req.params.ID.trim()

        const result = await chapterService.getChapter(serieId)
        res.status(200).send(result)
    }catch(error){
        res.status(500).send(error)
    }

}

const createChapter = async (req, res) => {

    try{
        const resultValidationReq = validationResult(req)
        const hasErrors = !resultValidationReq.isEmpty()
        const { title, description, videoUrlCharter, seriesIdBelongs } = req.body

        if(hasErrors){
            return res.status(400).send(resultValidationReq)
        }

        const result = await chapterService.createChapter(title, description, videoUrlCharter, seriesIdBelongs).catch()
        res.status(200).send(result)

    }catch(error){
        res.status(500).send(error)
    }

}

const updateChapter = async (req, res) => {
    
    try{
        const resultValidationReq = validationResult(req)
        const hasErrors = !resultValidationReq.isEmpty()
        const chapterId = req.params.ID.trim()
        const { title, description, videoUrlCharter, seriesIdBelongs } = req.body

        if(hasErrors){
            return res.status(400).send(resultValidationReq)
        }
       

        const editedchapter = await chapterService.updateChapter(chapterId, title, description, videoUrlCharter, seriesIdBelongs)
        res.status(200).send(editedchapter)
    }catch(error){
        res.status(500).send(error)
    }

}

const deleteChapter = async (req, res) => {

    try{
        const chapterId = req.params.ID.trim()

        const deletedChapter = await chapterService.deleteChapter(chapterId)
        res.status(200).send(deletedChapter)
    }catch(error){
        res.status(500).send(error)
    }
}

module.exports = { getChapter, createChapter, updateChapter, deleteChapter }