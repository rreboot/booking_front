import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import { formatDuration, intervalToDuration } from 'date-fns';
import { ru } from 'date-fns/locale';
import React, { useState } from 'react';
import { DeleteDialog } from '../DeleteDialog/DeleteDialog';

export interface IComplex {
  id: number;
  name: string;
  description: string;
  interval: number;
  price: number;
}

export const Complex = (props: IComplex): JSX.Element => {
  const [openDialog, setOpenDialog] = useState(false);
  const duration = intervalToDuration({ start: 0, end: props.interval * 60 * 1000 });

  const handleCloseDialog = (newValue?: string): void => {
    setOpenDialog(false);
  };

  const handleOpen = (): void => {
    setOpenDialog(true);
  };

  return (
    <Card variant="outlined">
      <CardHeader
        title={props.name}
        subheader={
          <Typography color="text.secondary">
            {props.price} руб. ({formatDuration(duration, { locale: ru })})
          </Typography>
        }
      />
      <CardContent>
        <Typography color="text.secondary" align="justify">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button size="small" startIcon={<EditIcon />}>
          Редактировать
        </Button>
        <Button
          size="small"
          color="warning"
          sx={{ alignSelf: 'flex-end', display: 'flex' }}
          startIcon={<DeleteOutlineIcon />}
          onClick={handleOpen}
        >
          Удалить
        </Button>
      </CardActions>
      <DeleteDialog
        id={props.id}
        keepMounted
        open={openDialog}
        onClose={handleCloseDialog}
        value={props.name}
      />
    </Card>
  );
};
