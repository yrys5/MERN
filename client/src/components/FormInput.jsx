import styled from "styled-components";


const FormInputS = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
`

const SpanS = styled.span`
  font-size: 12px;
  padding: 3px;
  color: green;
  display: none;
`
const InputS = styled.input`
  padding: 15px;
  margin: 10px 0px;
  border-radius: 5px;
  border: 1px solid gray;

  &:invalid{
   border: 1px solid green;
  }

  &:invalid ~ ${SpanS}{
      display:block;
  }
`

const LabelS =styled.label`
  font-size: 12px;
  color: gray;
`

const FormInput = (props) => {
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  return (
    <FormInputS>
      <LabelS>{label}</LabelS>
      <InputS 
        {...inputProps}
        onChange={onChange}
        />
      <SpanS>{errorMessage}</SpanS>
    </FormInputS>
  );
};

export default FormInput;