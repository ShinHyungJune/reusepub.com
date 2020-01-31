import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {setFlash} from '../actions/commonActions';
import Form from '../components/common/Form';

const SendResetPasswordMail = ({user, setFlash, history}) => {
	
	let [loading, setLoading] = useState(false);
	
	useEffect(() => {
		if(user)
			history.replace("/");
		
	}, []);
	
	return (
		<div id="sendResetPasswordMail">
			<div className="wrap-mobile">
				<Form method="post" url="/api/passwordReset/send" setLoading={setLoading} loading={loading}
				      then={data => {
					      setFlash(data.message);
					
					      history.push("/login");
				      }}
				      catchError={error => {
					      setFlash(error.message);
				      }}
				>
					<input type="email" name="email" placeholder="이메일 아이디"/>
					
					<button className="btn-middle btn-full bg-primary">
						{loading
							? <p className="animated flash infinite">진행중</p>
							: "비밀번호 초기화 메일 발송"
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
export default connect(mapState, mapDispatch)(SendResetPasswordMail);
