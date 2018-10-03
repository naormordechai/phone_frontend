import React from 'react'
import { Link } from 'react-router-dom'

class HomePage extends React.Component {
    render() {
        return (
            <section>
                HomePage
                <Link to="/phone">enter</Link>
            </section>
        )
    }
}

export default HomePage