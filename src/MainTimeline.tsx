import React, { useState, useMemo, useCallback } from 'react';
import { Timeline } from '@mui/lab';
import Date from './components/Date';
import data from './data/data';
import { Country, EmojiEnum } from './components/EmojiDot';
import { Accordion, Chip, AccordionSummary, AccordionDetails, Typography, CardActions, Button, Tooltip } from '@mui/material';
import { CardHeader } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';


type Props = {
}

// const demoDate: DateProps = {
//     date: '2020-01-01',
//     title: 'Molotov-Ribbentrop Pact',
//     description: 'lorem ipsum',
//     citations: "",
//     country: 'Russia',
//     tags: "",
//     quote: null,
//     quoteCitation: null
// }

const MainTimeline = (props: Props) => {

    const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);

    const handleCountryClick = (country: Country) => {
        if (selectedCountries.includes(country)) {
            setSelectedCountries(selectedCountries.filter(c => c !== country));
        } else {
            setSelectedCountries([...selectedCountries, country]);
        }
    }

    const handleCountryDelete = useCallback((cnt: Country) =>
        setSelectedCountries(selectedCountries.filter(c => c !== cnt)
        ), [selectedCountries]);


    const filteredData = useMemo(() => {
        const dx = data.sort((a, b) =>
            a.date < b.date ? -1 : 1);

        if (selectedCountries.length === 0) {
            return dx;
        }
        return dx.filter(d => selectedCountries.includes(d.country));
    }, [selectedCountries]);

    const text = useMemo(() => {
        if (selectedCountries.length === 0) {
            return 'No countries selected';
        }
        if (selectedCountries.length === 1) {
            return 'Just ' + selectedCountries[0];
        }
        if (selectedCountries.length === 2) {
            return selectedCountries[0] + ' and ' + selectedCountries[1];
        }
        else {
            return selectedCountries.slice(0, selectedCountries.length - 1).join(', ') + ', and ' + selectedCountries[selectedCountries.length - 1];
        }
    }, [selectedCountries]);

    return (
        <React.Fragment>
            <Typography className='mb-4' variant='h2'>Timeline</Typography>
            <Typography className='mt-3 mb-5' color={'gray'}>Displaying {filteredData.length} dates</Typography>
            <div className='d-flex flex-row justify-content-center mb-4'>
                <Accordion className='col-10 col-md-4' elevation={2}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <CardHeader title="Filter by country" />
                        <CardActions><Typography color={'gray'}>{text}</Typography></CardActions>
                        {selectedCountries.length > 0 &&
                            <Tooltip title='Clear Countries'>
                                <Button color='warning' onClick={() => setSelectedCountries([])}><CloseIcon /></Button>
                            </Tooltip>}
                    </AccordionSummary>
                    <AccordionDetails>
                        <CardContent>
                            <div className='d-flex 
                        flex-wrap flex-row justify-content-center align-items-center pb-4'>
                                {Object.entries(EmojiEnum).map(([key, value]) => {
                                    const name = key as Country;
                                    const isSelected = selectedCountries.includes(name);
                                    const handleDelete = () => handleCountryDelete(name);
                                    return (<Chip
                                        label={key}
                                        variant={isSelected ? 'filled' : 'outlined'}
                                        onClick={() => handleCountryClick(name)}
                                        className='mx-2 mb-2 flex-item'
                                        onDelete={isSelected ? handleDelete : undefined}
                                    />
                                    )
                                }
                                )}
                            </div>
                        </CardContent>
                    </AccordionDetails>
                </Accordion>
            </div>

            <Timeline>
                <div className='d-flex flex-column'>
                    {filteredData.map(d =>
                        <div className='d-flex flex-row justify-content-center'>
                            <Date key={d.date} {...d} />
                        </div>
                    )}
                </div>
            </Timeline>

        </React.Fragment >
    )
}

export default MainTimeline;