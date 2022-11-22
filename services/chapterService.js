const Chapter = require('../models/chapter')
const Serie = require('../models/serie')

const getChapter = (serieId) => {

    return new Promise((resolve, reject) => {
        
        Serie.findById({_id: serieId}, {"title": 1, "description": 1, "chaptersId": 1}, (error, serie) => {
            if(error)    reject({ status:500, message: `Se produjo un error al buscar los capitulos de la serie ${error}`})
            Chapter.populate(serie, {path: "chaptersId"}, (error, serie) => {
                if(error)    reject({ status:500, message: `Se produjo un error al buscar os capitulos de la serie ${error}`})
                if(!serie)   reject({ status:403, message: `La serie no se encuentra en la base de datos.`})
                resolve({status: 200, message:"Busqueda exitosa", serie})  
            })
        })
    }) 
}

const createChapter = (title, description, videoUrlCharter, seriesIdBelongs) => {
   
    return new Promise((resolve, reject) => {

        const newchapter = new Chapter({ title, description, videoUrlCharter, seriesIdBelongs })
        
        Chapter.findOne({title: newchapter.title}, (error, chapter) => {
            if(error)      return reject({ status:500, message: `Se produjo un error al guardar el capitulo ${error}`})
            if(chapter)    return reject({ status:403, message: `El capitulo ya se encuentra en la base de datos.`})

            newchapter.save((error) => {
                if(error)  return reject({ status:500, message: `Se produjo un error al guardar el capitulo ${error}`})
                resolve({status: 200, message: "El capitulo fue creado exitosamente", newchapter}) 
            })

            Serie.findOne({_id: seriesIdBelongs}, (error, serie) => {
                if(error)   return reject({ status:500, message: `Se produjo un error al guardar el capitulo ${error}`})
                if(serie){
                    serie.chaptersId.push(newchapter._id)
                    serie.save()
                }
            })
        })
    })
}

const updateChapter = (chapterId, title, description, videoUrlCharter, seriesIdBelongs) => {

    return new Promise((resolve, reject) => {
        
        Chapter.updateOne({_id: chapterId}, {title, description, videoUrlCharter, seriesIdBelongs}, (error, chapter) => {
            if(!chapter)   reject({ status:403, message: `El ID ingresado no corresponde a un capitulo guardado en la base de datos.`})
            if(error)    reject({ status:500, message: `Se produjo un error al editar la capitulo ${error}`})

            Chapter.findById({_id: chapterId}, (error, chapterId) => {
                const chapter = chapterId
                resolve({status: 200, message:"El capitulo fue edito con exito", chapter})  
            })
        })
    })
}

const deleteChapter = (chapterId) => {

    return new Promise((resolve, reject) => {
        
        Chapter.remove({_id: chapterId}, (error , chapter) => {
            if(chapter === undefined)   reject({ status:403, message: `El ID ingresado no corresponde a un capitulo guardado en la base de datos.`})
            if(error)                   reject({ status:500, message: `Se produjo un error al eliminar el capitulo ${error}`})
            resolve({status: 200, message:"El capitulo se elimino de la base de datos"}) 
        })
    })
}

module.exports = { 
    getChapter, 
    createChapter, 
    updateChapter, 
    deleteChapter 
}