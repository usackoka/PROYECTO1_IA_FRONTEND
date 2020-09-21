import React from 'react';

const LISTComponent = React.lazy(() => import('./components/List/list.component'))

export const routeConfig = {
    routes: [
        {
            path: '/',
            render: () => <LISTComponent/>,
            exact: true,
        },
    ]
};
