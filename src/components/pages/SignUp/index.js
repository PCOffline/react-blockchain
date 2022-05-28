import { useState, useRef } from 'react';
import { Input, Card, Typography, Box, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import SignInput from '../../common/SignInput';
import Logo from '../../common/Logo';
import Button from '../../common/Button';

const SignUpContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '70%',
});

const FormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: 'fit-content',
  gap: '1em',
  margin: 0,
  fontSize: '18px',
});

const NameContainer = styled.div({
  display: 'flex',
  gap: '1em',
});

const StyledButton = styled(Button)({
  fontSize: '0.9375rem',
  height: '48px',
});

const HeadingContainer = styled.div({
  marginBottom: '40px',
  width: 'fit-content',
});

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: theme.palette.text.primary,
}));

const SiteName = styled.span(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}));

const SubHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
  fontSize: '1rem',
}));

const LoginText = styled(Typography)({
  marginTop: '20px',
});

const LoginLink = styled.span(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold',
}));

const StyledLogo = styled(Logo)({
  padding: '20px',
});

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitFirstPressed, setSubmitFirstPressed] = useState(false);
  const fieldsValidation = useRef({});

  const handleIsValidChange = (label, value) => {
    fieldsValidation.current[label] = value;
  };

  const handleSubmit = () => {
    setSubmitFirstPressed(true);
    if (
      Object.values(fieldsValidation).length &&
      Object.values(fieldsValidation.current).every((value) => value)
    )
      // TODO: Send a request to the admin
      console.log('hi');
  };

  return (
    <>
      <StyledLogo withText />
      <SignUpContainer>
        <Box>
          <HeadingContainer>
            <Heading>
              Welcome to <SiteName>Lev Bank</SiteName>
            </Heading>
            <SubHeading>Enter your details below</SubHeading>
          </HeadingContainer>
          <FormContainer>
            <NameContainer>
              <SignInput
                label='First name'
                value={firstName}
                setValue={setFirstName}
                showError={submitFirstPressed}
                setIsValid={handleIsValidChange}
                type='name'
                required
              />
              <SignInput
                value={lastName}
                label='Last name'
                setValue={setLastName}
                showError={submitFirstPressed}
                setIsValid={handleIsValidChange}
                type='name'
                required
              />
            </NameContainer>
            <SignInput
              label='Username'
              value={username}
              setValue={setUsername}
              showError={submitFirstPressed}
              setIsValid={handleIsValidChange}
              type='name'
              required
            />
            <SignInput
              label='Password'
              value={password}
              setValue={setPassword}
              showError={submitFirstPressed}
              setIsValid={handleIsValidChange}
              type='password'
              required
            />
            <SignInput
              label='Confirm password'
              value={confirmPassword}
              setValue={setConfirmPassword}
              showError={submitFirstPressed}
              customValidation={(value) => ({
                valid: value === password,
                errorText: 'Passwords do not match',
              })}
              setIsValid={handleIsValidChange}
              type='password'
              required
            />
            <StyledButton
              variant='contained'
              type='submit'
              onClick={handleSubmit}
              disableElevation
            >
              Sign Up
            </StyledButton>
          </FormContainer>
          <LoginText color='textPrimary'>
            Already have an account?
            <Link to='/login'>
              <LoginLink> Login</LoginLink>
            </Link>
          </LoginText>
        </Box>
      </SignUpContainer>
    </>
  );
}
