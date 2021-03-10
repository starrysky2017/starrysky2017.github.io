import * as React from 'react'
import { Switch, Route, Redirect } from 'dva/router';
import { baseRoute } from '../config';

import './Common.less';

import * as styles from './Main.less';

import App from './App';

class Main extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className={styles.Main}>
            <Switch>
                <Route path="/" component={() => <Redirect to={`${baseRoute}/index`} />} exact />
                <Route path={baseRoute} component={App} />
            </Switch>
        </div>
    }
}

export default Main