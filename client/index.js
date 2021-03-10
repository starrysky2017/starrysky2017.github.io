import React from 'react';
import dva from 'dva';
import createLogger from 'dva-logger';
import { Route, routerRedux } from 'dva/router';
import defineHistory from './history';
import Main from './component/Main';

const { ConnectedRouter } = routerRedux;

const routerConfig = ({ history }) => {
    return (
        <ConnectedRouter history={history}>
            <Route path="/" component={Main} />
        </ConnectedRouter>
    )
}

const app = dva({
    history: defineHistory,
});
if (window.ENV_TYPE === 'DEV') {
    app.use(createLogger());
}
app.router(routerConfig);
app.start('#app');