import React from 'react';
import { connect } from 'react-redux'
import PhonesList from '../../components/PhonesList/PhonesList'
import classes from './phones-page.css'

class PhonesPage extends React.Component {

    componentDidMount(){
        console.log({classes})
    }

    render() {
        const { phones } = this.props;
        return (
            <section>
                <h1 className={classes.red}>HELLO WORLD!</h1>
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
