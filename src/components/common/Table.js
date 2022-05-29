import {
  TableCell,
  TableContainer,
  TableRow,
  Table as MuiTable,
  Paper,
  TableHead,
  TableBody,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import Button, { NegativeButton } from '../common/Button';

const StyledCell = styled(TableCell)(({ theme }) => ({
  borderColor: theme.palette.primary.dark,
}));

const StyledRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td': { borderBottom: 0 },
}));

const Text = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 500,
  color: theme.palette.primary.main,
}));

const NegativeText = styled(Text)(({ theme }) => ({
  color: 'darkred',
}));

const TitleText = styled(Text)(({ theme }) => ({
  color: theme.palette.primary.dark,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
}));

const StyledNegativeButton = styled(NegativeButton)(({ theme }) => ({
  width: '100%',
}));

export default function Table(props) {
  const { fields, data, buttons, className } = props;

  const renderRow = (row, index) => {
    const TextType = row.negative ? NegativeText : Text;

    return (
      <StyledRow key={index}>
        {fields.map((field) => (
          <StyledCell key={field.key}>
            <TextType>{row[field.key] ?? row[field.secondaryKey]}</TextType>
          </StyledCell>
        ))}
        {buttons?.length &&
          buttons.map((button) => {
            const showButton = button.isVisible ? button.isVisible(row) : true;
            const buttonText =
              typeof button.text === 'function'
                ? button.text(row, index, button)
                : button.text;
            const negative =
              typeof button.negative === 'function'
                ? button.negative(row, index, button)
                : button.negative;
              const ButtonType = negative ? StyledNegativeButton : StyledButton;

            return (
              <StyledCell key={buttonText}>
                {showButton && (
                  <ButtonType
                    variant='contained'
                    onClick={() => button.onClick?.(row, index, button)}
                  >
                    {buttonText}
                  </ButtonType>
                )}
              </StyledCell>
            );
          })}
      </StyledRow>
    );
  };

  return (
    <TableContainer component={Paper} elevation={0} className={className}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {fields.map((field) => (
              <StyledCell key={field.key}>
                <TitleText>{field.name}</TitleText>
              </StyledCell>
            ))}
            {buttons?.length &&
              buttons.map((button) => <StyledCell key={button.text} />)}
          </TableRow>
        </TableHead>
        <TableBody>{data.map((row, index) => renderRow(row, index))}</TableBody>
      </MuiTable>
    </TableContainer>
  );
}
