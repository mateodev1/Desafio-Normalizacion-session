import { Router } from "express"
import controllers from './../controllers/controllers.js'
const { getAll }= controllers
const api = Router()

api.route('/productos-test')
    .get(getAll)

export default api