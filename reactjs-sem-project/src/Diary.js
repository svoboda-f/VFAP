import React from "react";
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function Diary(props) {
    const user=props.user;


    return (
        <div className="row d-flex w-100 justify-content-center mt-3">
            <div className="col-8 text-center">
                <h1>Deník</h1>
                <Fab color={'error'} className={'fab-location'}>
                    <AddIcon />
                </Fab>
            </div>
        </div>
    )
}
