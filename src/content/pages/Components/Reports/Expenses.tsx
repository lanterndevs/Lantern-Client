import { Container, Grid, Card, CardHeader, CardContent, Divider, ButtonGroup, Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Footer from 'src/components/Footer';
import axios from 'axios';
import { getCookie } from 'src/utils/cookies';
import { useEffect, useState } from 'react';

function Expenses() {

    // eslint-disable-next-line
    const [categoriesState, setCategoriesState] = useState({});

    useEffect(() => {
        // retrieves the transactions from the user
        axios.get('/api/transactions', {
            headers: {
                authorization: 'Bearer ' + getCookie(document.cookie, "auth_token"),
            }
            }).then((response) => {
                // creates a list of categories based on the user's transactions
                var tempCategories = {};
                response.data.forEach(transaction => tempCategories[transaction.categories[0]] = (tempCategories[transaction.categories[0]] || 0) + 1);
                setCategoriesState(tempCategories);
        })
    }, []);

    return (
        <>

        <ButtonGroup size="medium" sx={{ justifyContent: 'right', display: 'flex', marginRight: '25px' }}>
            <Button variant="outlined" name="Chart">Chart</Button>
            <Button variant="outlined" name="Normal">Normal</Button>
        </ButtonGroup> 


      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Basic Example" />
              <Divider />
              <CardContent>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Accordion 1</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                      malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>Accordion 2</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                      malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion disabled>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                  >
                    <Typography>Disabled Accordion</Typography>
                  </AccordionSummary>
                </Accordion>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Expenses;
