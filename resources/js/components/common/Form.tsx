import React, {useState, useEffect, Fragment} from 'react';
import {connect} from "react-redux";
import {setFlash} from "../../actions/commonActions";

// React.cloneElement(element, {attributes(= props});
// React.createElement(태그, {attrivutes(=props)}, children(내부내용))

const Form = ({method, url, then = () => {}, catchError = (error) => {setFlash(error.message);}, setLoading = null, loading = false, defaultData = null, children, setFlash}) => {
    
    let defaultForm = {};
    
    React.Children.map(children, el => {
        // input에 value값을 넣어서 넘겨준 경우.
        defaultForm = el.props.value ? {...defaultForm, [el.props.name] : el.props.value} : {...defaultForm};
    });
    
    // state를 초기화하고 나서 setState로 초가값을 주다보면 루프를 엄청 돌 때가 있어, 이런 경우를 막으려면 초기값을 처음부터 주는게 좋음
    let [form, setForm] = useState(defaultForm);
    
    let [errors, setErrors] = useState({});
    
    // React.Children을 써줘야 children이 1개일 때도 배열을 내뱉어줌(안그럼 오브젝트 내뱉애서 map 사용 시 에러 뜸)
    const renderChildren = React.Children.map(children, el => {
        let className = form[el.props.name] ? `input input-${el.props.type} active` : `input input-${el.props.type}`;
        
        // input에 value값을 넣어서 넘겨준 경우.
        defaultForm = el.props.value ? {...defaultForm, [el.props.name] : el.props.value} : {...defaultForm};
        
        return (
            <Fragment>
                {el.type === "input" || el.type === "select" || el.type === "textarea"
                    ?
                    (<div className={className}>
                        {el.props.title ? React.createElement('p', {className: "input-title"}, el.props.title) : null}
                        {React.cloneElement(el, {
                            onChange: (event) => {changeFormData(event); el.props.onChange ? el.props.onChange(event) : null; },
                            value: form[el.props.name]
                        })}
                        {/*errors가 state니까 현재는 빈 에러문구일지라도 update해주면 렌더링되면서 문구가 화면에 노출됨*/}
                        {React.createElement('p', {className: "input-error"}, errors[el.props.name])}
                    </div>)
                    :
                    React.cloneElement(el, {}) // input 아닌것들은 그냥 그대로 복사해서 화면에 뿌리기
                }
            </Fragment>
        )
    });
    
    const submit = (e) => {
        if(setLoading)
            setLoading(true);
        
        e.preventDefault();
        
        if(!loading)
            axios[method](url, form)
                .then((response) => {
                    if(setLoading)
                        setLoading(false);
                    
                    then(response.data);
                    
                    init(setForm);
                })
                .catch((error) => {
                    if(setLoading)
                        setLoading(false);
                    
                    catchError(error.response.data);
                    
                    let result = {};
                    
                    for(let key in error.response.data.errors){
                        result[key] = error.response.data.errors[key][0];
                    }
                    
                    setErrors(result);
                })
    };
    
    const changeFormData = (event) => {
        setForm({
            ...form,
            [event.target.name] : event.target.value
        });
        
        setErrors({
            ...errors,
            [event.target.name] : ""
        });
    };
    
    // 초기화
    const init = (set, data = null) => {
        let item = {};
        
        React.Children.map(children, el => {
            if(form[el.props.name]) // form 입력했던건 변경하면 안돼, 혹시 select로 다른 타입 클릭시 다른 입력폼이 초기화되는거 방지
                return item[el.props.name] = form[el.props.name];
            
            item[el.props.name] = data && data[el.props.name] ? data[el.props.name] : "";
        });
        
        set(item);
    };
    
    useEffect(() => {
        init(setForm, defaultData);
        
        // init(setErrors);
    }, [children]);
    
    return (
        <form onSubmit={submit}>
            {renderChildren}
        </form>
    );
};

const mapDispatch = (dispatch) => {
    return {
        setFlash: (data) => {
            dispatch(setFlash(data));
        }
    }
};

export default connect(null, mapDispatch)(Form);
