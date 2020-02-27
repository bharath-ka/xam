import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types'


const Landing = ({ auth: { isAuthenticated } }) => {
    if (isAuthenticated) {
        return <Redirect to="/tests"></Redirect>
    }
    return (
        <div className='display-4 text-center'>
            F Indian Education Sytem
        </div>
    )
}
Landing.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Landing);
