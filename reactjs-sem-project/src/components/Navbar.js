import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Alert, Button, Dialog, DialogContent, DialogTitle, Snackbar, TextField} from "@mui/material";
import AuthService from "../services/AuthService";
import MyLocalStorageService from "../services/MyLocalStorageService";
import {resolvePath, useNavigate, useParams, useResolvedPath} from "react-router";

export default function Navbar(props) {

    return (
        <div className={"row w-100 g-0 my-bg-color"}>
            <div className={"col-8 d-flex justify-content-start p-2"}>
                <Link className={"mx-2 text-decoration-none d-flex align-items-center text-black"} to={'/'}>
                    <img src="logo.png" className="enlarge" width="28" alt={'logo'}/>
                </Link>
                <Button component={Link} to={'/calculator'} className={'text-black'}>Kalkulačka</Button>
                {props.user ? <Button component={Link} to={'/diary'} className={'text-black'}>Deník</Button> : null}
            </div>
            {props.user ? <LoggedIn user={props.user} setUser={props.setUser}/> :
                <NotLoggedIn setUser={props.setUser}/>}
        </div>
    )
};

const LoggedIn = (props) => {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        props.setUser(undefined);
        MyLocalStorageService.signOut();
        navigate('/');
    }

    return (
        <div className={"col-4 d-flex justify-content-end p-2"}>
            <Button color={"error"} variant={'contained'} className={"me-2"}
                    onClick={handleLogoutClick}>Odhlásit</Button>
            <Button variant={'contained'} color={'inherit'} component={Link}
                    to={'/profile'}>{props.user.username}</Button>
        </div>
    );
};

const NotLoggedIn = (props) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleLoginClick = () => {
        setDialogOpen(true);
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = [];
        const formData = new FormData(event.target);
        formData.forEach((value) => {
            data.push(value);
        });
        if (validateUsernameLength(data[0])) {
            console.log('Nezadal jste jméno');
            return;
        }
        AuthService.login(data[0], data[1]).then(() => {
            AuthService.getCurrentUserInfo().then((user) => {
                props.setUser(user);
                handleDialogClose();
            });
        }).catch(() => {
            setSnackbarOpen(true);
            setTimeout(() => {
                setSnackbarOpen(false);
            }, 3000)
        });
    }


    const validateUsernameLength = (data) => {
        return data.length === 0;
    }

    return (
        <div className={"col-4 d-flex justify-content-end p-2"}>
            <Button variant={'contained'} color={'inherit'} onClick={handleLoginClick}>Přihlásit</Button>
            <Dialog open={dialogOpen} onBackdropClick={handleDialogClose}>
                <DialogTitle>Přihlášení</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField label={'Uživatelské jméno'} name={'username'} className={'mt-2'}/>
                        <br/>
                        <TextField label={'Heslo'} name={'password'} type={'password'} className={'my-3'}/>
                        <br/>
                        <Button variant={'contained'} type={'submit'}>Přihlásit</Button>
                    </form>
                </DialogContent>
            </Dialog>
            <Snackbar open={snackbarOpen}
                      autoHideDuration={3000}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert style={{backgroundColor: 'red'}} severity={'error'}>Buď jste zadal špatné údaje, nebo někdo
                    zapomněl zapnout backend</Alert>
            </Snackbar>
        </div>

    );
};

