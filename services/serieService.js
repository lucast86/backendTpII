const Serie = require('../models/serie')

const getSerie = (serieId) => {

    return new Promise((resolve, reject) => {
        
        Serie.findById({_id: serieId}, (error, serieId) => {
            const serie = serieId
            if(error)    reject({ status:500, message: `Se produjo un error al buscar la serie ${error}`})
            if(!serie)   reject({ status:403, message: `La serie no se encuentra en la base de datos.`})
            resolve({status: 200, message:"Busqueda exitosa", serie})  
        })
    }) 
}

const getSeries = () => {

    return new Promise((resolve, reject) => {
        
        Serie.find({}, {"title":1, "description":1, "coverImageUrl":1}, (error, series) => {
            if(error)     reject({ status:500, message: `Se produjo un error al buscar las series ${error}`})
            if(!series)   reject({ status:403, message: `Las series no se encuentran en la base de datos.`})
            resolve({status: 200, message:"Busqueda exitosa", series})
        })
    })
}

const createSerie = (title, description, coverImageUrl, category) => {

    return new Promise((resolve, reject) => {

        const newSerie = new Serie({ title, description, coverImageUrl, category })
        
        Serie.findOne({title: newSerie.title}, (error, serie) => {
            if(error)        reject({ status:500, message: `Se produjo un error al guardar la serie ${error}`})
            if(serie)        reject({ status:403, message: `La serie ya se encuentra en la base de datos.`})
            newSerie.save((error) => {
                if(error)    reject({ status:500, message: `Se produjo un error al guardar la serie ${error}`})
                resolve({status: 200, message: "La serie fue creada exitosamente", newSerie}) 
            })
        })
    })
}

const updateSerie = (serieId, title, description, coverImageUrl, category) => {

    return new Promise((resolve, reject) => {
        
        Serie.updateOne({_id: serieId}, {title, description, coverImageUrl, category}, (error, serie) => {
            if(!serie)   reject({ status:403, message: `El ID ingresado no corresponde a una serie guardada en la base de datos.`})
            if(error)    reject({ status:500, message: `Se produjo un error al editar la serie ${error}`})

            Serie.findById({_id: serieId}, (error, serieId) => {
                const serie = serieId
                resolve({status: 200, message:"La serie fue edita con exito", serie})  
            })
        })
    })

}

const deleteSerie = (serieId) => {

    return new Promise((resolve, reject) => {
        
        Serie.remove({_id: serieId}, (error, serie) => {
            if(serie === undefined)   reject({ status:403, message: `El ID ingresado no corresponde a una serie guardada en la base de datos.`})
            if(error)                 reject({ status:500, message: `Se produjo un error al eliminar la serie ${error}`})
            resolve({status: 200, message:"La serie se elimino de la base de datos"}) 
        })
    })
}

module.exports = { 
    getSerie,
    getSeries, 
    createSerie, 
    updateSerie, 
    deleteSerie 
}
