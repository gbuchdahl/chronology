import React from 'react';
import { TimelineContent } from '@mui/lab';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DateProps } from './Date';
import { FormatQuote } from '@mui/icons-material';


type TitleAndDescProps = Pick<DateProps, 'title' | 'description' | 'citations' | 'quote' | 'quoteCitation'>;

const TitleAndDesc = (props: TitleAndDescProps) => (
    <TimelineContent>
        <Accordion elevation={2}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{props.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {props.description}
                </Typography>
                {props.quote && <Paper sx={{ backgroundColor: '#D3D3D3' }} className='my-3 mx-4 py-2 px-3' elevation={2}>
                    <div className='d-flex flex-row'><FormatQuote fontSize="large" /><Typography className='pt-2' sx={{ fontStyle: 'italic' }}>{props.quote}</Typography></div>
                    <Typography className='mt-2'>{"- " + props.quoteCitation}</Typography>
                </Paper>
                }
                {props.citations && <Typography color='gray' className='mt-2'>With information from Tim Snyder's {props.citations}, 2022.</Typography>}
            </AccordionDetails>
        </Accordion>
    </TimelineContent >
)

export default TitleAndDesc;
