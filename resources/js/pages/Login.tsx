import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {login, setFlash} from '../actions/commonActions';
import Form from '../components/common/Form';
import axios from "axios";

const Login = ({login, setFlash, user, location, history}) => {
    useEffect(() => {
        if(user)
            return history.replace("/");
    }, []);

    let setup = (token) => {
        axios.interceptors.request.use((config) => {

            if(token) {
                config.headers.Authorization = `${token.token_type} ${token.access_token}`;
            }

            return config;
        }, (error) => {
            return Promise.reject(error);
        });
    };

	return (
		<div id="login">
			<div className="wrap-mobile">

				<Form method="post" url="/api/auth/login"
				      then={(data) => {
				          login(data.user, data.token);

				          setup(data.token);

				          history.push("/");
				      }}
				      catchError={(error) => {
				          setFlash(error.message);
				      }}
				>
					<input type="text" name="email" placeholder="아이디"/>
					
					<input type="password" name="password" placeholder="비밀번호"/>
					
					<div className="links align-right">
						<Link to="/sendResetPasswordMail" className="primary">비밀번호 찾기 / </Link>
						<Link to="/register" className="primary">회원가입</Link>
					</div>
					
					<button className="btn-middle btn-full bg-primary">로그인</button>
				</Form>
			</div>
		</div>
	);
};
const mapState = (state) => {
    return {
        user: state.commonStates.user
    }
};

const mapDIspatch = (dispatch) => {
	return {
		login: (user, token) => {
			dispatch(login(user, token));
		},

        setFlash: (data) => {
		    dispatch(setFlash(data));
        }
	}
};

export default connect(mapState, mapDIspatch)(Login);
