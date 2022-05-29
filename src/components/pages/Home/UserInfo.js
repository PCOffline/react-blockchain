import { ArrowDownwardRounded } from '@mui/icons-material';
import { useState } from 'react';
import { Typography, Card, MenuItem, Select } from '@mui/material';
import SelectInput from '@mui/material/Select/SelectInput';
import styled from '@emotion/styled';

const Container = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '17px 36px',
  height: 'fit-content',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1rem',
  color: theme.palette.primary.dark,
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  color: theme.palette.primary.dark,
  margin: '8px 0px 0px',
}));

const Text = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  color: theme.palette.primary.main,
}));

export default function UserInfo(props) {
  const { user } = props;

  return (
    <Container>
      <Title>Account Summary</Title>
      <SubTitle>Balance</SubTitle>
      <Text>{user.balance} LC</Text>
      <SubTitle>Lends</SubTitle>
      <Text>{user.lends.reduce((acc, curr) => curr.amount + acc, 0)} LC</Text>
      <SubTitle>Loans</SubTitle>
      <Text>{user.loans.reduce((acc, curr) => curr.amount + acc, 0)} LC</Text>
    </Container>
  );
}
