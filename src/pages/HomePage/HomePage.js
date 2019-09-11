import React from 'react'
import { Link } from 'react-router-dom'

// class HomePage extends React.Component {
//     render() {
//         return (
//             <section className="home-page-title">
//                 <div>
//                     <h2>HomePage</h2>
//                     <Link to="/phone">enter</Link>
//                 </div>
//             </section>
//         )
//     }
// }

const homePage = () => (
    <section className="home-page-title">
        <div>
            <h2>Homepage</h2>
            <Link to="/phone">enter</Link>
        </div>
    </section>
)

export default homePage