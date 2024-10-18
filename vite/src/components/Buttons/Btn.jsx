import styled from 'styled-components'
import PropTypes from 'prop-types'

function Btn({onClick, text, type}) {
  return (
    <>
      <BaseButton onClick={onClick} type={type}>{text}</BaseButton> 
    </>
  )
}

Btn.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string
}

export default Btn


const BaseButton = styled.button`
  color: white;
  border: none;
  width:9rem;
  padding: 10px 20px;
  margin:.5rem 0;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

// Create the red Delete button
export const DeleteBtn = styled(BaseButton)`
  background-color: red;

  &:hover {
    background-color: darkred;
  }
`;

// Create the blue Edit button
export const EditBtn = styled(BaseButton)`
  background-color: blue;

  &:hover {
    background-color: darkblue;
  }
`;
