import appsConfig from '../modules/apps.config'
import { RouteGenerator } from '../utils'

const routes = [
    ...RouteGenerator.generateRoutes(appsConfig)
]

export default routes;