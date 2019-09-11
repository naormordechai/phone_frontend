import React from 'react';
import { connect } from 'react-redux'
import PhonesList from '../../components/PhonesList/PhonesList'

class PhonesPage extends React.Component {
    render() {
        const { phones } = this.props;
        return (
            <section>
                <PhonesList phones={phones} />
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        phones: state.phoneReducer.phones
    }
}

export default connect(mapStateToProps)(PhonesPage)
