import React from 'react';
import { connect } from 'react-redux'
import PhonesList from '../../components/PhonesList/PhonesList'
import * as actionCreators from '../../store/actions/index'

class PhonesPage extends React.Component {

    componentDidMount() {
        // this.props.onLoadPhones()
    }
    render() {
        return (
            <section>
                <PhonesList phones={this.props.phones} />
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        phones: state.phoneReducer.phones
    }
}

const mapStateToDispatch = dispatch => {
    return {
        // onLoadPhones: () => dispatch(actionCreators.loadPhones())
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(PhonesPage)
