import React from 'react'
import "./profile.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { useSelector } from 'react-redux'
import jwtDecode from "jwt-decode"
import { useResetPasswordMutation } from '../../api/userApiSlice'
const Profile = () => {
  const token = useSelector(state=>state.auth.token)
  const [resetPassword] = useResetPasswordMutation()
    const authUser = jwtDecode(token)
    const handleResetUserPass = async(id) =>{
        try {
          const res = await resetPassword({id}).unwrap()
          // The temporary password is shown only once
          window.alert(`Neues temporäres Passwort: ${res.tempPassword}\nBitte notieren und an den Benutzer weitergeben.`)
        } catch (error) {
          console.log(error)
        }
      }
    return (
        <div className="profile">
            <Sidebar/>
            <div className="profileContainer">
                <Navbar/>
                <div className="container container-fluid">
                    <h2 className="mt-5 ml-1">Profil</h2>
                    <div className="row justify-content-start mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <figure className='avatar avatar-profile'>
                                <img src="/user.png" width={"200px"} alt="user" />
                            </figure>
                        </div>
                        <div className="col-12 col-md-5">
                            <h4>Vor- und Nachname</h4>
                            <p>{authUser.user.name} {authUser.user.surname}</p>
                                          
                            <h4>E-Mail</h4>
                            <p>{authUser.user.email}</p>

                            <h4>Telefonnummer</h4>
                            <p>{authUser.user.phone}</p>

                            <div
                            className="resetButton"
                            onClick={() => handleResetUserPass(authUser.user.id)}
                            >
                            Passwort zurücksetzen
                            </div>
        {/* <div
          className="resetButton"
           onClick={() => handleResetUserPass(authUser.userId)}
        >
          Reset Password
        </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
