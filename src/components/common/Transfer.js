import { useContext, useState } from 'react';
import { Typography, Card, Box, MenuItem, Select, TextField, Input, OutlinedInput } from '@mui/material';
import styled from '@emotion/styled';
import Button from './Button';
import { ratesContext, userContext } from '../../ContextWrapper';

const Container = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '24px 36px',
  height: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  gap: '1em',
  minWidth: 'fit-content',
}));

const InputContainer = styled(Box)(({ theme }) => ({
  width: '100%',
}))

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1rem',
  color: theme.palette.primary.dark,
}));

const Label = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: theme.palette.primary.dark,
}))

const ErrorText = styled.p(({ theme }) => ({
  color: theme.palette.error.main,
}));

export default function Transfer(props) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState(1);
  const { user } = useContext(userContext);
  const { exchangeRates } = useContext(ratesContext);

  return (
    <Container>
      <Title>{props.title || 'Transfer'}</Title>
      <InputContainer>
        <Label>{props.recipientText || 'Receiver'}</Label>
        <TextField
          placeholder={props.recipientPlaceholder || 'Username'}
          value={recipient}
          onChange={(event) => setRecipient(event.target.value)}
          fullWidth
        />
      </InputContainer>
      <InputContainer>
        <Label>Sum ({props.currency})</Label>
        <OutlinedInput
          type='number'
          placeholder='Sum'
          value={amount}
          onChange={(event) => setAmount(+event.target.value)}
          inputProps={{
            min: 1,
            max:
              props.currency === 'LC'
                ? user.balance
                : (user.balance * exchangeRates.ils * exchangeRates.lc).toFixed(2),
          }}
          fullWidth
        />
      </InputContainer>
      <Button
        variant='contained'
        disabled={
          !recipient.trim() ||
          amount > user.balance ||
          amount <= 0 ||
          !Number.isSafeInteger(amount)
        }
        onClick={() => props.onClick?.(recipient, amount)}
      >
        {props.buttonText || 'Send'}
      </Button>
      {props.error && <ErrorText>{props.error}</ErrorText>}
    </Container>
  );
}
