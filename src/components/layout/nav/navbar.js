import React from 'react'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

const Navbar = (props) => {
    const { auth, profile } = props;
    // console.log(auth);
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;

    return (
        <nav className="navigationContainer">
            <div className="navigationWrapper">
                {/*   Основной контент располагать ниже   */}
                <div className='logo'> </div>

                {/*  Нужен компонент юзера в навбаре  */}
                <div className="userAuth">
                    {links}
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    // console.log(state);
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar)
