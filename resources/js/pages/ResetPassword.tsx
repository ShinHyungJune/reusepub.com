import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {setFlash} from '../actions/commonActions';
import Form from '../components/common/Form';

const ResetPassword = ({user, setFlash, history, match}) => {
	
	let [loading, setLoading] = useState(false);
	
	useEffect(() => {
		if(user)
			history.replace("/");
		
	}, []);
	
	return (
		<div id="resetPassword">
			<div className="wrap-mobile">
				<Form method="post" url="/api/passwordReset" setLoading={setLoading} loading={loading}
				      then={data => {
					      setFlash(data.message);
					
					      history.push("/login");
				      }}
				      catchError={error => {
					      setFlash(error.message);
				      }}
				>
					<input type="email" name="email" placeholder="이메일 아이디"/>
					<input type="password" name="password" placeholder="비밀번호"/>
					<input type="password" name="password_confirmation" placeholder="비밀번호 확인"/>
					<input type="hidden" name="token" value={match.params.token}/>
					
					<button className="btn-middle btn-full bg-primary">
						{loading
							? <p className="animated flash infinite">진행중</p>
							: "비밀번호 재설정"
						}
					</button>
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

const mapDispatch = (dispatch) => {
	return {
		setFlash: (data) => {
			dispatch(setFlash(data));
		}
	}
};
export default connect(mapState, mapDispatch)(ResetPassword);
