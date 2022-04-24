import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import { formatDuration, intervalToDuration } from 'date-fns';
import { ru } from 'date-fns/locale';
import React, { useState } from 'react';

export interface IComplex {
  id: number;
  name: string;
  description: string;
  interval: number;
  price: number;
}

export const Complex = (props: IComplex): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const duration = intervalToDuration({ start: 0, end: props.interval * 60 * 1000 });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };
  return (
    <Card variant="outlined">
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
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
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'settings-button'
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <MenuItem onClick={handleClose}>Редактировать</MenuItem>
        <MenuItem onClick={handleClose}>Удалить</MenuItem>
      </Menu>
    </Card>
  );
};
