const { serieService } = require('../services')
const { validationResult } = require('express-validator')

const getSerie = async (req, res) => {

    try{
        const serieId = req.params.ID.trim()

        const serie = await serieService.getSerie(serieId)
        res.status(200).send(serie)
    }catch(error){
        res.status(500).send(error)
    }
}

const getSeries = async (req, res) => {

    try{
        const seriesList = await serieService.getSeries()
        res.status(200).send(seriesList)
    }catch(error){
        res.status(500).send(error)
    }    
}

const createSerie = async (req, res) => {

    try{
        const resultValidationReq = validationResult(req)
        const hasErrors = !resultValidationReq.isEmpty()
        const { title, description, coverImageUrl, category } = req.body

        if(hasErrors){
            return res.status(400).send(resultValidationReq)
        }

        const serieCreated = await serieService.createSerie(title, description, coverImageUrl, category).catch()
        res.status(200).send(serieCreated)

    }catch(error){
        res.status(500).send(error)
    }
}

const updateSerie = async (req, res) => {

    try{
        const resultValidationReq = validationResult(req)
        const hasErrors = !resultValidationReq.isEmpty()
        const serieId = req.params.ID.trim()
        const { title, description, coverImageUrl, category } = req.body

        if(hasErrors){
            return res.status(400).send(resultValidationReq)
        }
        
        const editedSeries = await serieService.updateSerie(serieId, title, description, coverImageUrl, category)
        res.status(200).send(editedSeries)
    }catch(error){
        res.status(500).send(error)
    }
    
}

const deleteSerie = async (req, res) => {

    try{
        const serieId = req.params.ID.trim()

        const deletedSerie = await serieService.deleteSerie(serieId)
        res.status(200).send(deletedSerie)
    }catch(error){
        res.status(500).send(error)
    }
} 

module.exports = { getSerie, getSeries, createSerie, updateSerie, deleteSerie }