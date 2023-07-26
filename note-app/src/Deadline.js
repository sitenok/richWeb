// 
// import styled from 'styled-components';

// const StyledCal = styled.button`
//   background-color: blanchedalmond;
//   font-size: 1.4rem;
//   padding: 1rem 2rem;
//   text-transform: uppercase;
//   transition: background-color ease 300ms, border-color ease 300ms;

//   &:hover {
//     background-color: #000;
//     color: #fff;
//   }
// `;

// const Button = () => (
//   <StyledButton>
//     Click Me!
//   </StyledButton>
// );

// export default Button;


import {DatePicker} from '@gsebdev/react-simple-datepicker';

function Calendar({data}) {
    const onChangeCallback = ({target}) => {
        // a callback function when user select a date
    }
    <DatePicker
        id='datepicker-id'
        name='date-demo'
        onChange={onchangeCallback}
        value={'01/02/2023'}
    />  
}

export default Calendar;

