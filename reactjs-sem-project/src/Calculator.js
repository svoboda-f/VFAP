import React, {useEffect, useState} from "react";
import {
    Tabs,
    Tab,
    TextField,
    Button,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Snackbar, Alert, TableContainer, Paper, Table, TableHead, TableCell, TableRow, TableBody
} from "@mui/material";
import MyLocalStorageService from "./services/MyLocalStorageService";
import CalculatorService from "./services/CalculatorService";

const localStorage = new MyLocalStorageService();


export default function Calculator() {

    const [showTab, setShowTab] = useState(false);
    const [value, setValue] = useState(0);
    const [entries, setEntries] = useState([]);

    const handleTabs = (e, val) => {
        setValue(val);
    };

    useEffect(() => {
        setEntries(localStorage.loadCalculatorEntries);
    }, [])

    useEffect(() => {
        if (entries.length > 0){
            localStorage.saveCalculatorEntries(entries);
            setShowTab(true);
        } else {
            setShowTab(false);
            setValue(0);
        }
    }, [entries]);

    return (
        <div className="row d-flex w-100 justify-content-center mt-3">
            <div className="col-8 text-center">
                <Tabs value={value} onChange={handleTabs}>
                    <Tab label={'Kalkulačka'}/>
                    {showTab ? <Tab label={'Výsledky'}/> : null}
                </Tabs>
                <CalculatorTab value={value} index={0}>
                    <CalculatorForm setShowTab={setShowTab} setValue={setValue} entries={entries} setEntries={setEntries}/>
                </CalculatorTab>
                <CalculatorTab value={value} index={1}>
                    <CalculatorEntries entries={entries} setEntries={setEntries}/>
                </CalculatorTab>
            </div>
        </div>
    )
}


const CalculatorTab = (props) => {
    const {children, value, index} = props;
    return (
        <>
            {value === index && children}
        </>
    )
}

const CalculatorForm = (props) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [sex, setSex] = useState('male');



    const handleSex = (event) => {
        setSex(event.target.value);
    };

    const handleSubmit = (event) => {
        const data = [];
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.forEach((e) => {
            data.push(e);
        });
        if (!validateData(data)) {
            setSnackbarOpen(true);
            setTimeout(() => setSnackbarOpen(false),3000);
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        const bmi = CalculatorService.calculateBMI(Number(data[3]),Number(data[2]));
        const bmr = CalculatorService.calculateBMR(Number(data[3]),Number(data[2]),Number(data[0]),data[0]);
        const entry = {date: today, age: data[0], sex: data[1], height: data[2], weight: data[3], BMI: bmi, BMR: bmr};

        const newEntries = [entry, ...props.entries];
        if (newEntries.length === 6) {
            newEntries.pop();
        }
        props.setEntries(newEntries);

        props.setShowTab(true);
        props.setValue(1);
    }

    const validateData = (data) =>  {
        const dataAge = data[0];
        const dataHeight = data[2];
        const dataWeight = data[3];
        console.log(Number(dataAge) > 120)
        if (dataAge === "" || dataHeight === "" || dataWeight === "") {
            return false;
        }
        if (isNaN(dataAge) || isNaN(dataHeight) || isNaN(dataWeight)) {
            return false;
        }
        if (Number(dataAge) < 5 || Number(dataAge) > 120) {
            return false;
        }
        if (Number(dataHeight) < 100 || Number(dataHeight) > 300) {
            return false;
        }
        if (Number(dataWeight) < 1 || Number(dataWeight) > 600) {
            return false;
        }
        return true;
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField inputProps={{inputMode:'numeric', pattern: '[0-9]{1,3}'}} label={'Věk'} name={'age'} className={'my-2'}/>
                <br/>
                <FormControl>
                    <RadioGroup defaultValue={'male'} value={sex} onChange={handleSex} name={'sex'} row>
                        <FormControlLabel control={<Radio/>} label={'Muž'} value={'male'}/>
                        <FormControlLabel control={<Radio/>} label={'Žena'} value={'female'}/>
                    </RadioGroup>
                </FormControl>
                <br/>
                <TextField inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}} label={'Výška'} name={'height'} className={'mt-2'}/>
                <br/>
                <TextField inputProps={{inputMode: 'decimal'}} label={'Hmotnost'} name={'weight'} className={'my-2 mt-3'}/>
                <br/>
                <Button type={'submit'} variant={'contained'} className={'mt-2'}>Vypočítej</Button>


            </form>
            <Snackbar open={snackbarOpen}
                      autoHideDuration={3000}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert style={{backgroundColor: 'red'}} severity={'error'}>Zadejte prosím validní data</Alert>
            </Snackbar>

        </>
    )
}

const CalculatorEntries = (props) => {

    const handleClick = () => {
        localStorage.deleteCalculatorEntries();
        props.setEntries([]);
    }

    return (
        <>
            <h1>HAHA</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Datum</TableCell>
                            <TableCell>Věk</TableCell>
                            <TableCell>Pohlaví</TableCell>
                            <TableCell>Výška</TableCell>
                            <TableCell>Hmotnost</TableCell>
                            <TableCell>BMI</TableCell>
                            <TableCell>BMR</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.entries.map((row) => (
                            <TableRow>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.age}</TableCell>
                                <TableCell>{row.sex === 'male' ? 'Muž' : 'Žena'}</TableCell>
                                <TableCell>{row.height}</TableCell>
                                <TableCell>{row.weight}</TableCell>
                                <TableCell>{row.BMI}</TableCell>
                                <TableCell>{row.BMR}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button onClick={handleClick} color={'error'} variant={'contained'} className={'mt-2'}>SMAZAT</Button>
        </>
    )
}
