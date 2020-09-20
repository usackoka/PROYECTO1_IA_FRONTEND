import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { MenuBar, PageNotFound } from '../components'
import routes from '../system-config/routes.config'

const DefaultLayout = props => {

    return (
        <div>
            <MenuBar children={
                <React.Suspense fallback={<div>loading...</div>}>
                    <Switch>
                        {
                            routes.map((value, key) => (
                                <Route
                                    key={key}
                                    path={value.path}
                                    exact={value.exact}
                                    render={value.render}
                                />
                            ))
                        }
                        <Route
                            key={routes.length + 1}
                            component={PageNotFound}
                        />
                    </Switch>
                </React.Suspense>
            }/>
        </div>
    );
}

export default DefaultLayout;