import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';

export interface IDeleteDialog {
  id: number;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
}

export const DeleteDialog = (props: IDeleteDialog): JSX.Element => {
  const { onClose, value: valueProp, open } = props;
  const [value, setValue] = useState(valueProp);

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleCancel = (): void => {
    onClose();
  };

  const handleOk = (): void => {
    axios.delete(`/api/v1/complex/${props.id}`);
    onClose(value);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>Удалить услугу</DialogTitle>
      <DialogContent dividers>
        <Typography>Вы действительно хотите удалить?</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Отмена
        </Button>
        <Button onClick={handleOk}>Удалить</Button>
      </DialogActions>
    </Dialog>
  );
};
