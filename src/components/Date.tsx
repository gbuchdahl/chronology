import React from "react";
import { TimelineItem, TimelineSeparator, TimelineConnector, TimelineOppositeContent } from '@mui/lab';
import EmojiDot from './EmojiDot';
import styled from '@emotion/styled'
import moment from 'moment';
import { Country } from './EmojiDot'
import TitleAndDesc from "./TitleAndDesc";
import { Tag } from '../MainTimeline'

export type DateProps = {
    date: string;
    title: string;
    description: string;
    quote: string | null;
    citations: string;
    quoteCitation: string | null;
    country: Country;
    tag: Tag | null;
    isLast?: boolean;
}

const TallDiv = styled.div`
    min-height: 48px;
    display: flex;
    height: 100%;
`



const Date = (props: DateProps) => {
    const date = moment(props.date);
    const dateStr = date.format('MMMM D, YYYY');
    return (
        <div className='col-12 col-md-10 col-xl-8'>
            <TimelineItem>
                <TimelineOppositeContent className="pt-4 flex-grow-0" style={{ minWidth: '200px' }}>
                    {dateStr}
                </TimelineOppositeContent>

                <TimelineSeparator>
                    <EmojiDot emoji={props.country} />
                    {!props.isLast && <TallDiv>
                        <TimelineConnector className="flex-grow-1" />
                    </TallDiv>}
                </TimelineSeparator>
                <TitleAndDesc title={props.title} description={props.description} citations={props.citations} quote={props.quote} quoteCitation={props.quoteCitation} />

            </TimelineItem >
        </div>

    );
}

export default Date;