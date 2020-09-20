import React from 'react';

const SearchComponent = React.lazy(() => import('./components/Search/search.component'))
const LISTComponent = React.lazy(() => import('./components/List/list.component'))

export const routeConfig = {
    routes: [
        {
            path: '/',
            render: () => <LISTComponent/>,
            exact: true,
        },
        {
            path: '/search',
            render: () => <SearchComponent/>,
            exact: true,
        }
    ]
};
