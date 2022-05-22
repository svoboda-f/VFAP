import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import AuthService from "./services/AuthService";

export default function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(undefined);

    useEffect(() => {
        AuthService.getCurrentUserInfo().then((u) => {
            setUser(u);
        }).catch(() => navigate('/'));
    }, []);

    return (
        <>
            {user && (
                <div className="row d-flex justify-content-center bg-white">
                    <div className="col-5 pb-5 mt-2 bg-dark bg-opacity-10">
                        <h1 className={'mt-4 text-center text-uppercase'}>Údaje</h1>
                        <p><span className={'fw-bold'}>Jméno: </span>{user.firstName}</p>
                        <p><span className={'fw-bold'}>Příjmení: </span>{user.lastName}</p>
                        <p><span className={'fw-bold'}>Datum narození: </span>{user.dateOfBirth}</p>
                        <p><span className={'fw-bold'}>Výška: </span>{user.height}</p>
                    </div>
                </div>)}
        </>
    )
}
