import React from "react";
import {TimelineItem,TimelineSeparator,TimelineConnector,TimelineDot,TimelineContent, TimelineOppositeContent} from '@mui/lab';
import EmojiDot from './EmojiDot';
import styled from '@emotion/styled'
import moment from 'moment';
import { Emoji } from './EmojiDot'

export type DateProps = {
    date: string;
    title: string;
    description: string;
    citations: string[];
    country: Emoji;
    tags: string[];
}

const TallDiv = styled.div`
    height: 48px;
    display: flex;
`



const Date = (props: DateProps) => {
    const date = moment(props.date);
    const dateStr = date.format('MMMM D, YYYY');
    return (
        <TimelineItem>
            <TimelineOppositeContent className="pt-4" color='gray'>
                {dateStr}
            </TimelineOppositeContent>
            <TimelineSeparator>
                <EmojiDot emoji={props.country} />
                <TallDiv>
                    <TimelineConnector/>
                </TallDiv>
                </TimelineSeparator>
            <TimelineContent className="pt-4">{props.title}</TimelineContent>
      </TimelineItem>

    );
}

export default Date;