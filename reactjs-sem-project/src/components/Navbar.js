import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Button, Dialog, DialogContent, DialogTitle, TextField} from "@mui/material";

export default function Navbar(props) {
    const user = props.user;

    return (
        <div className={"row w-100 g-0 my-bg-color"}>
            <div className={"col-8 d-flex justify-content-start p-2"}>
                <Link className={"mx-2 text-decoration-none d-flex align-items-center text-black"} to={'/'}>
                    <img src="logo.png" className="enlarge" width="28" alt={'logo'}/>
                </Link>
                <Button component={Link} to={'/calculator'} className={'text-black'}>Kalkulačka</Button>
                {user ? <Button component={Link} to={'/diary'} className={'text-black'}>Deník</Button> : null}
            </div>
            {user ? <LoggedIn user={user}/> : <NotLoggedIn/>}
        </div>
    )
};

const LoggedIn = (props) => {

    return (
        <div className={"col-4 d-flex justify-content-end p-2"}>
            <Button color={"error"} variant={'contained'} className={"me-2"}
                    onClick={() => console.log("klik - odhlásit")}>Odhlásit</Button>
            <Button variant={'contained'} color={'inherit'} component={Link}
                    to={'/profile'}>{props.user.username}</Button>
        </div>
    );
};

const NotLoggedIn = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    
    const handleLoginClick = () => {
        setDialogOpen(true);
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
    }

    return (
        <div className={"col-4 d-flex justify-content-end p-2"}>
            <Button variant={'contained'} color={'inherit'} onClick={handleLoginClick}>Přihlásit</Button>
            <Dialog open={dialogOpen} onBackdropClick={handleDialogClose}>
                <DialogTitle>Přihlášení</DialogTitle>
                <DialogContent>
                    <TextField label={'Uživatelské jméno'} className={'mt-2'}/>
                    <br/>
                    <TextField label={'Heslo'} className={'my-3'}/>
                    <br/>
                    <Button variant={'contained'}>Přihlásit</Button>
                </DialogContent>
            </Dialog>
        </div>

    );
};

