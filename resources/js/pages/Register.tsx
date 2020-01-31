import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {setFlash} from '../actions/commonActions';
import Form from '../components/common/Form';

const Register = ({user, setFlash, history}) => {
	
	let [email, setEmail] = useState("");
	let [loading, setLoading] = useState(false);
	let [mode, setMode] = useState("sendVerifyNumber");
	let contents = null;
	
	let sendVerifyNumberContents = (
		<Form method="post" url="/api/verifyNumber" setLoading={setLoading}
		      then={(data) => {
			      setMode("checkVerifyNumber");
			
			      setFlash(data.message);
		      }}
		      catchError={(error) => {
			      setFlash(error.message);
		      }}
		>
			<input type="text" name="email" placeholder="이메일 아이디" onChange={(e) => setEmail(e.target.value)}/>
			
			<button className="btn-middle btn-full bg-primary">
				{loading
					? <p className="animated flash infinite">전송중</p>
					: "인증토큰 보내기"
				}
			</button>
		</Form>
	);
	
	let checkVerifyNumberContents = (
		<Form method="patch" url="/api/verifyNumber" setLoading={setLoading}
		      then={(data) => {
			      setFlash(data.message);
			
			      setMode("register")
		      }}
		      catchError={(error) => {
			      setFlash(error.message);
		      }}
		>
			<input type="text" name="email" placeholder="이메일 아이디" value={email} disabled/>
			
			<input type="text" name="number" placeholder="인증번호"/>
			
			<button className="btn-middle btn-full bg-primary">
				{loading
					? <p className="animated flash infinite">인증중</p>
					: "인증하기"
				}
			</button>
		</Form>
	);
	
	let registerContents = (
		<Form method="post" url="/api/auth/signup" setLoading={setLoading} loading={loading}
		      then={data => {
			      setFlash(data.message);
			
			      history.push("/login");
		      }}
		      catchError={error => {
			      setFlash(error.message);
		      }}
		>
			<input type="email" name="email" placeholder="이메일 아이디" value={email} disabled/>
			<input type="password" name="password" placeholder="비밀번호"/>
			<input type="password" name="password_confirmation" placeholder="비밀번호 확인"/>
			<input type="text" name="name" placeholder="이름"/>

			<button className="btn-middle btn-full bg-primary">
				{loading
					? <p className="animated flash infinite">진행중</p>
					: "회원가입"
				}
			</button>
		</Form>
	);
	
	if (mode === "sendVerifyNumber")
		contents = sendVerifyNumberContents;
	
	if (mode === "checkVerifyNumber")
		contents = checkVerifyNumberContents;
	
	if (mode === "register")
		contents = registerContents;

    useEffect(() => {
        if(user)
            history.replace("/");

    }, []);

	return (
		<div id="register">
			<div className="wrap-mobile">
				{contents}
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
export default connect(mapState, mapDispatch)(Register);
