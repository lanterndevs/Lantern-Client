import {
  Card,
  CardHeader,
  ListItemText,
  List,
  ListItem,
  Divider,
  ListItemAvatar,
  Avatar
} from '@mui/material';

import Checkbox from '@mui/material/Checkbox';

import { styled } from '@mui/material/styles';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import AttachMoneyTwoToneIcon from '@mui/icons-material/AttachMoneyTwoTone';
import Text from 'src/components/Text';

const AvatarWrapperError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.lighter};
      color:  ${theme.colors.error.main};
`
);

const AvatarWrapperSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.lighter};
      color:  ${theme.colors.success.main};
`
);

const AvatarWrapperWarning = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.warning.lighter};
      color:  ${theme.colors.warning.main};
`
);

function UpcomingEvents() {

  return (
    <Card>
      <CardHeader title="Upcoming Events" />
      <Divider />
      <List disablePadding>

        {/* Hardcoded -- first compoent from list */}
        <ListItem sx={{ py: 2 }}>
          <ListItemAvatar>
            <AvatarWrapperError>
              <AttachMoneyTwoToneIcon fontSize="medium" />
            </AvatarWrapperError>
          </ListItemAvatar>
          <ListItemText
            primary={<Text color="black">Bill Due, Feburary 5, 2022</Text>}
            primaryTypographyProps={{
              variant: 'body1',
              fontWeight: 'bold',
              color: 'textPrimary',
              gutterBottom: true,
              noWrap: true
            }}
            secondary={<Text > 6:00 PM </Text>}
            secondaryTypographyProps={{ variant: 'body2', noWrap: true }}
          />
            <Checkbox />
        </ListItem>

        <Divider />

        {/* Hardcoded -- second from list */}
        <ListItem sx={{ py: 2 }}>
          <ListItemAvatar>
            <AvatarWrapperSuccess>
              <GroupsTwoToneIcon fontSize="medium" />
            </AvatarWrapperSuccess>
          </ListItemAvatar>
          <ListItemText
            primary={<Text color="black">Meeting, Feburary 5, 2022 </Text>}
            primaryTypographyProps={{
              variant: 'body1',
              fontWeight: 'bold',
              color: 'textPrimary',
              gutterBottom: true,
              noWrap: true
            }}
            secondary={<Text > 6:00 PM </Text>}
            secondaryTypographyProps={{ variant: 'body2', noWrap: true }}
          />
            <Checkbox />
        </ListItem>

        <Divider />

        {/* Hardcoded -- thi compoent from list */}
        <ListItem sx={{ py: 2 }}>
          <ListItemAvatar>
            <AvatarWrapperWarning>
              <AttachMoneyTwoToneIcon fontSize="medium" />
            </AvatarWrapperWarning>
          </ListItemAvatar>
          <ListItemText
            primary={<Text color="black">Bill Due, Feburary 5, 2022</Text>}
            primaryTypographyProps={{
              variant: 'body1',
              fontWeight: 'bold',
              color: 'textPrimary',
              gutterBottom: true,
              noWrap: true
            }}
            secondary={<Text > 6:00 PM </Text>}
            secondaryTypographyProps={{ variant: 'body2', noWrap: true }}
          />
            <Checkbox />
        </ListItem>
      </List>
    </Card>
  );
}

export default UpcomingEvents;
