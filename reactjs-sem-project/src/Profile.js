import React from "react";

export default function Profile(props) {
    const user = props.user;
    return (
        <div className="row d-flex w-100 justify-content-center mt-3">
            <div className="col-8 text-center">
                <h1>Profil</h1>
                <p>{user.username}</p>
                <p>{user.firstName}</p>
                <p>{user.lastName}</p>
            </div>
        </div>
    )
}
