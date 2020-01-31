import React, {Fragment} from 'react';
import {setPop} from "../../actions/commonActions";
import {connect} from 'react-redux';

const PopUtil = ({name = "", buttons = [], cancelActivated = true, contents = null, pop, setPop, className = ""}) => {

    if(pop === name)
        return (
        <Fragment>
            <div className="black animated fadeIn"></div>

            <div className={`pop-util animated fadeIn ${className}`}>
                <p className="pop-util-title">{name}</p>

                <div className="pop-util-contents">
                    {contents}
                </div>

                <div className="pop-util-btns">
                    {buttons.map((button, index) =>(
                        <button className="pop-util-btn btn-middle" key={index} onClick={button.method}>{button.name}</button>
                    ))}
                    {cancelActivated ? <button className="pop-util-btn btn-middle bg-gray" onClick={() => setPop("")}>취소</button> : null}
                </div>
            </div>
        </Fragment>
        );

    return null;
};

const mapState = (state) => {
    return {
        pop: state.commonStates.pop
    }
};

const mapDispatch = (dispatch) => {
    return {
        setPop: (data) => {
            dispatch(setPop(data));
        }
    }
};

export default connect(mapState, mapDispatch)(PopUtil);
