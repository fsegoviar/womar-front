import styled from '@emotion/styled';
import { TextField } from '@mui/material';

export const InputForm = styled(TextField)<{ error?: boolean }>`
  width: 100%;
  font-size: 12px;
  font-family: 'font-medium' !important;
  & .MuiOutlinedInput-root {
    & fieldset {
      border-radius: 10px;
    }
    &:hover fieldset {
      border-color: gray;
    }
    &.Mui-focused fieldset {
      color: gray;
      border-color: gray;
    }
  }
`;
