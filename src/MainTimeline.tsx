import React, { useState, useMemo } from 'react';
import { Timeline} from '@mui/lab';
import Date, { DateProps } from './components/Date';
import data from './data/data';
import { Emoji, EmojiEnum } from './components/EmojiDot';
import { Chip, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

type Props = {
}

const demoDate: DateProps = {
    date: '2020-01-01',
    title: 'Molotov-Ribbentrop Pact',
    description: 'lorem ipsum',
    citations: [],
    country: 'Russia',
    tags: []
}

const MainTimeline = (props: Props) => {

    const [selectedCountries, setSelectedCountries] = useState<Emoji[]>([]);

    const handleCountryClick = (country: Emoji) => {
        if (selectedCountries.includes(country)) {
            setSelectedCountries(selectedCountries.filter(c => c !== country));
        } else {
            setSelectedCountries([...selectedCountries, country]);
        }
    }

    const filteredData = useMemo(() => {
        const dx = data.sort((a, b) => 
            a.date < b.date ? -1 : 1);
            
        if (selectedCountries.length === 0) {
            return dx;
        }
        return dx.filter(d => selectedCountries.includes(d.country));
    }, [selectedCountries]);

    const text = useMemo(()=> {
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
            <div className='d-flex flex-row justify-content-center align-items-center pb-4'>
                {Object.entries(EmojiEnum).map(([key, value]) => {
                const name = key as Emoji;
                    return (<Chip 
                        label={key} 
                        variant={selectedCountries.includes(name) ? 'filled' : 'outlined'}
                        onClick={() => handleCountryClick(name)}
                        className='mx-2 flex-item'/>
                    )}
                )}
            </div>
            <Typography color={'gray'}>{text}</Typography>
            <Timeline>
                {filteredData.map(d => <Date key={d.date} {...d} />)}
            </Timeline>
        </React.Fragment>
)
}

export default MainTimeline;