import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from 'react-redux';
import AuthRoute from './components/common/AuthRoute';
import store from './store';

import Login from './pages/Login';
import Register from './pages/Register';
import SendResetPasswordMail from './pages/SendResetPasswordMail';
import ResetPassword from './pages/ResetPassword';
import Flash from './components/common/Flash';

function Index() {
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
                    <Flash />
        
					<div className="wrap-contents">
						<Switch>
							<Route exact path="/login" component={Login}/>
							<Route exact path="/register" component={Register}/>
							<Route exact path="/sendResetPasswordMail" component={SendResetPasswordMail} />
							<Route exact path="/passwordReset/:token" component={ResetPassword} />
                            {/*<AuthRoute exact path="/" component={Example} />*/}
                        </Switch>
					</div>
				</Fragment>
			</Router>
		</Provider>
	);
}

export default Index;

if (document.getElementById('app')) {
	ReactDOM.render(<Index/>, document.getElementById('app'));
}
