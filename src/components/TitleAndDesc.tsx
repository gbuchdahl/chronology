import React from 'react';
import { TimelineContent } from '@mui/lab';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DateProps } from './Date';


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
                {props.quote && <Paper sx={{ backgroundColor: '#D3D3D3' }} className='my-3 mx-4 p-2' elevation={2}>
                    <Typography sx={{ fontStyle: 'italic' }}>{"> " + props.quote}</Typography>
                    <Typography>{"- " + props.quoteCitation}</Typography>
                </Paper>
                }
            </AccordionDetails>
        </Accordion>
    </TimelineContent>
)

export default TitleAndDesc;
