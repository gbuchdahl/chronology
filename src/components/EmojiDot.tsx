import  React from 'react';
import styled from '@emotion/styled'
import TimelineDot  from '@mui/lab/TimelineDot';
import { Tooltip } from '@mui/material';



export enum EmojiEnum {
  'Russia' = '🇷🇺',
  'Germany' = '🇩🇪',
  'Poland' = '🇵🇱'
};

export type Emoji = keyof typeof EmojiEnum;


type Props = {
    emoji: Emoji
    color?: 'white'
}


const EmojiDiv = styled.div`
  min-height: 36px;
  min-width: 36px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Color = styled.div`
    color: 'white';
`

const EmojiDot = (props: Props) => <Color>
  <TimelineDot color='inherit' variant='outlined'>
    <Tooltip title={props.emoji}>
          <EmojiDiv>{EmojiEnum[props.emoji]}</EmojiDiv>
    </Tooltip>
</TimelineDot>

</Color>

export default EmojiDot;
