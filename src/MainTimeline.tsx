import React, { useState, useMemo, useCallback } from 'react';
import { Timeline } from '@mui/lab';
import Date from './components/Date';
import data from './data/data';
import { Country, EmojiEnum } from './components/EmojiDot';
import { Accordion, Chip, AccordionSummary, AccordionDetails, Typography, CardActions, Button, Tooltip, Divider } from '@mui/material';
import { CardHeader } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import pluralize from 'pluralize';


enum TagEnum {
    "War" = "War", "Treaty" = "Treaty", "Social Movement" = "Social Movement", "State Formation" = "State Formation", "People" = "People", "Economic" = "Economic", "Policy" = "Policy"
}

export type Tag = keyof typeof TagEnum;

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

const MainTimeline = () => {

    const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    const handleCountryClick = (country: Country) => {
        if (selectedCountries.includes(country)) {
            setSelectedCountries(selectedCountries.filter(c => c !== country));
        } else {
            // setSelectedTags([]);
            setSelectedCountries([...selectedCountries, country]);
        }
    }

    const handleTagClick = (tag: Tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            // setSelectedCountries([]);
            setSelectedTags([...selectedTags, tag]);
        }
    }

    const handleCountryDelete = useCallback((cnt: Country) =>
        setSelectedCountries(selectedCountries.filter(c => c !== cnt)
        ), [selectedCountries]);


    const filteredData = useMemo(() => {
        const dx = data.sort((a, b) =>
            a.date < b.date ? -1 : 1).filter(d => d.description !== null);

        if (selectedCountries.length === 0 && selectedTags.length === 0) {
            return dx;
        }
        if (selectedCountries.length === 0) {
            return dx.filter(d => (d.tag && selectedTags.includes(d.tag)));
        }
        if (selectedTags.length === 0) {
            return dx.filter(d => selectedCountries.includes(d.country));
        }
        return dx.filter(d => selectedCountries.includes(d.country) && (d.tag && selectedTags.includes(d.tag)));
    }, [selectedCountries, selectedTags]);

    const countryText = useMemo(() => {
        if (selectedCountries.length === 0) {
            return '';
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

    const tagText = useMemo(() => {
        if (selectedTags.length === 0) {
            return '';
        }
        if (selectedTags.length === 1) {
            return 'Just ' + pluralize(selectedTags[0]);
        }
        if (selectedTags.length === 2) {
            return pluralize(selectedTags[0]) + ' and ' + pluralize(selectedTags[1]);
        }
        else {
            return selectedTags.slice(0, selectedTags.length - 1).map(w => pluralize(w)).join(', ') + ', and ' + pluralize(selectedTags[selectedTags.length - 1]);
        }
    }, [selectedTags]);

    const completeText = useMemo(() => {
        if (selectedCountries.length === 0 && selectedTags.length === 0) {
            return "No filter selected";
        } else if (selectedCountries.length === 0 || selectedTags.length === 0) {
            return countryText + tagText
        } else if (selectedCountries.length === 1 && selectedTags.length === 1) {
            return countryText.split(' ')[1] + ' and ' + tagText.split(' ')[1];
        } else {
            return countryText + ' | ' + tagText
        }

    }, [countryText, tagText, selectedCountries.length, selectedTags.length]);

    return (
        <React.Fragment>
            <Typography className='mb-4' variant='h2'>Timeline</Typography>
            <Typography className='mt-3 mb-5' color={'gray'}>Displaying {filteredData.length} dates</Typography>
            <div className='d-flex flex-row justify-content-center flex-wrap mb-4'>
                <Accordion id={"country"} className='col-10 col-md-4 mr-5' elevation={2}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <CardHeader title="Filters" />
                        <CardActions><Typography color={'gray'}>{completeText}</Typography></CardActions>
                        {selectedCountries.length + selectedTags.length > 0 &&
                            <Tooltip title='Clear Countries'>
                                <Button color='warning' onClick={() => { setSelectedCountries([]); setSelectedTags([]); }}><CloseIcon /></Button>
                            </Tooltip>}
                    </AccordionSummary>
                    <AccordionDetails>
                        <CardContent>
                            <div className='d-flex 
                        flex-wrap flex-row justify-content-center align-items-center pb-4'>
                                {Object.keys(EmojiEnum).map(key => {
                                    let name = key as Country;
                                    const isSelected = selectedCountries.includes(name);
                                    const handleDelete = () => handleCountryDelete(name);
                                    return (<Chip
                                        label={name}
                                        variant={isSelected ? 'filled' : 'outlined'}
                                        onClick={() => handleCountryClick(name)}
                                        className='mx-2 mb-2 flex-item'
                                        onDelete={isSelected ? handleDelete : undefined}
                                    />
                                    )
                                }
                                )}
                            </div>
                            <Divider className='mb-4' />

                            <div className='d-flex 
                        flex-wrap flex-row justify-content-center align-items-center pb-4'>
                                {Object.keys(TagEnum).map(key => {
                                    const name = key as Tag;
                                    const isSelected = selectedTags.includes(name);
                                    const handleDelete = () => handleTagClick(name);
                                    return (<Chip
                                        label={pluralize(key)}
                                        variant={isSelected ? 'filled' : 'outlined'}
                                        onClick={() => handleTagClick(name)}
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
                    {filteredData.map((d, index) =>
                        <div className='d-flex flex-row justify-content-center'>
                            <Date key={d.date} {...d} isLast={index === filteredData.length - 1} />
                        </div>
                    )}
                </div>
            </Timeline>

        </React.Fragment >
    )
}

export default MainTimeline;