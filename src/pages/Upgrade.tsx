import { Container, Typography, Paper, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';

const premiumFeatures = [
  'Unlimited resumes',
  'Premium templates',
  'No watermark',
  'Priority support',
  'PDF export',
  'Custom fonts'
];

const Upgrade = () => {
  return (
    <Container maxWidth="md" className="py-8">
      <Paper className="p-8">
        <Typography variant="h4" component="h1" className="mb-6 text-center">
          Upgrade to Premium
        </Typography>

        <Typography variant="h5" component="h2" className="mb-4 text-center text-primary">
          $9/month
        </Typography>

        <List className="mb-8">
          {premiumFeatures.map((feature) => (
            <ListItem key={feature}>
              <ListItemIcon>
                <CheckIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={feature} />
            </ListItem>
          ))}
        </List>

        <div className="text-center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            href="/checkout"
          >
            Upgrade Now
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default Upgrade;
