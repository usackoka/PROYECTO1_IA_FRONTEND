class RouteGenerator{
    static generateRoutes(config){
        let routes = []
        config.forEach((config)=>{
            routes = [...routes,...config.routes]
        })
        return routes;
    }
}

export default RouteGenerator;