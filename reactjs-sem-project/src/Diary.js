import React, {useEffect, useMemo, useState} from "react";
import {Button, Dialog, DialogContent, DialogTitle, Fab, TextField} from "@mui/material";
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import AddIcon from '@mui/icons-material/Add';
import AuthService from './services/AuthService';
import {useNavigate} from "react-router";
import DataTable from 'react-data-table-component';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

export default function Diary() {
    const navigate = useNavigate();
    const [entries, setEntries] = useState([]);
    const [entry, setEntry] = useState({});
    const [visible, setVisible] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [value, setValue] = useState(new Date());
    const [weight, setWeight] = useState(0);

    useEffect(() => {
        AuthService.getCurrentUserEntries().then((value) => {
            setEntries(value);
        }).catch(() => navigate("/"));
    });

    useEffect(() => {
        console.log(entries);
    }, [entries]);


    const filteredItems = entries.filter(
        item => item.date && item.date.concat(item.weight).includes(filterText),
    );

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear}
                             filterText={filterText}/>
        );
    }, [filterText, resetPaginationToggle]);

    const columns = [
        {
            name: 'Datum',
            selector: row => row.date,
            sortable: true
        },
        {
            name: 'Hmotnost',
            selector: row => row.weight,
            sortable: true
        }
    ];
    const handleChange = ({selectedRows}) => {
        const isRowSelected = selectedRows.length > 0;
        setEntry(isRowSelected ? selectedRows[0] : {});
        setVisible(isRowSelected);
    };

    const handleDeleteClick = () => {
        AuthService.deleteSelectedEntry(entry.id).then(() => {
            const newEntries = [...entries];
            newEntries.splice(newEntries.findIndex(i => i.id === entry.id), 1);
            setEntries(newEntries);
        });
    }

    const handleAddClick = () => {
        setDialogOpen(true);
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(value && (weight > 1 && weight < 600)) {
            console.log(value.toISOString().split('T')[0]);
            console.log(weight);
            AuthService.addNewEntry({
                date: value.toISOString().split('T')[0],
                weight: weight
            }).then((responseEntry) => {
                entries.push(responseEntry);
                handleDialogClose();
            })
        }

        // AuthService.addNewEntry()
    }


    const handleDateChange = (newValue) => {
        setValue(newValue);
    };

    const handleWeightChange = (weight) => {
        setWeight(weight.target.value);
    }

    return (
        <div className="row d-flex w-100 justify-content-center mt-3">
            <div className="col-8 text-center">
                <h1>Deník</h1>
                {entries && <DataTable
                    columns={columns}
                    data={filteredItems}
                    selectableRows={true}
                    selectableRowsSingle={true}
                    onSelectedRowsChange={handleChange}
                    pagination={true}
                    paginationResetDefaultPage={resetPaginationToggle}
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                />}
                {visible && <Button color={'error'} variant={"contained"} onClick={handleDeleteClick}>Smaž</Button>}
                <Dialog open={dialogOpen} onBackdropClick={handleDialogClose}>
                    <DialogTitle>Nový záznam</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit} className={'mt-4'}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Date desktop"
                                    inputFormat="MM/dd/yyyy"
                                    value={value}
                                    maxDate={new Date()}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField {...params} />}
                                    date={value}
                                    name={'date'}
                                />
                            </LocalizationProvider>
                            <br/>
                            <TextField label={'Hmotnost'} name={'weight'} type={'number'} onChange={handleWeightChange}
                                       className={'my-3 w-100'}/>
                            <br/>
                            <Button variant={'contained'} type={'submit'}>Přidat</Button>
                        </form>
                    </DialogContent>
                </Dialog>
                <Fab color={'error'} className={'fab-location'} onClick={handleAddClick}>
                    <AddIcon/>
                </Fab>
            </div>
        </div>
    )
}

const FilterComponent = ({filterText, onFilter}) => (
    <>
        <input
            id="search"
            type="text"
            placeholder="Filtruj"
            aria-label="Search Input"
            value={filterText}
            onChange={onFilter}
        />
    </>
);
