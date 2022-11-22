const express = require('express')
const routes = express.Router()

const { userControllers, serieControllers,chapterControllers } = require('../controllers')
const { userSchema, seriesSchema, chapterSchema } = require('../controllers/schemas')
const { isAuth } = require('../middlewares')

// routes/user 
routes.post("/register", userSchema, userControllers.register)
routes.post("/login",userSchema, userControllers.login)

// routes/serie 
routes.get("/serie/:ID", isAuth, serieControllers.getSerie)
routes.get("/serie", isAuth, serieControllers.getSeries)   
routes.post("/serie", isAuth, seriesSchema, serieControllers.createSerie)
routes.put("/serie/:ID", isAuth, seriesSchema, serieControllers.updateSerie) 
routes.delete("/serie/:ID", isAuth, serieControllers.deleteSerie)    
 
// routes/chapter 
routes.get("/chapter/:ID", isAuth, chapterControllers.getChapter)
routes.post("/chapter", isAuth, chapterSchema, chapterControllers.createChapter)
routes.put("/chapter/:ID", isAuth, chapterSchema, chapterControllers.updateChapter)
routes.delete("/chapter/:ID", isAuth, chapterControllers.deleteChapter)

module.exports = routes




