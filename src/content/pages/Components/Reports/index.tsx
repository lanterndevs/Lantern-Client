import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Accordion,
  AccordionSummary,
  Typography
} from '@mui/material';
import Footer from 'src/components/Footer';
import PageHeader from './PageHeader';
import ExpenseBreakdown from './ExpenseBreakdown';
import RevenueBreakdown from './RevenueBreakdown';
import IncomeStatement from './IncomeStatement';
import AccordionDetails from '@mui/material/AccordionDetails';

function Reports() {
  return (
    <>
      <Helmet>
        <title>Financial Reports</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
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
            <CardHeader title={
                  <Typography
                      variant="h3"
                      sx={{ top: '14px', position: 'relative' }}
                  >
                      Income Statement
                  </Typography>
              } />
                <Accordion>
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{
                            bottom: '60px',
                            marginRight: '30px',
                            position: 'relative'
                        }}
                    />

                    <Divider />

                    <CardContent>
                        <AccordionDetails>
                            <IncomeStatement />
                        </AccordionDetails>
                    </CardContent>
                </Accordion>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              {/* <CardHeader title="Balance Sheet" />
              <Divider />
              <CardContent>Balance Sheet goes here</CardContent> */}
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography
                    variant="h3"
                    sx={{ top: '14px', position: 'relative' }}
                  >
                    Expense Breakdown
                  </Typography>
                }
              />
              <Accordion>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{
                    bottom: '60px',
                    marginRight: '30px',
                    position: 'relative'
                  }}
                />

                <Divider />

                <CardContent>
                  <AccordionDetails>
                    <ExpenseBreakdown />
                  </AccordionDetails>
                </CardContent>
              </Accordion>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography
                    variant="h3"
                    sx={{ top: '14px', position: 'relative' }}
                  >
                    Revenue Breakdown
                  </Typography>
                }
              />
              <Accordion>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{
                    bottom: '60px',
                    marginRight: '30px',
                    position: 'relative'
                  }}
                />

                <Divider />

                <CardContent>
                  <AccordionDetails>
                    <RevenueBreakdown />
                  </AccordionDetails>
                </CardContent>
              </Accordion>
            </Card>
          </Grid>
          <Grid item xs={12}>
            {/* <Card>
              <CardHeader title="Outlined Buttons" />
              <Divider />
              <CardContent>
                <Button variant="outlined" sx={{ margin: 1 }}>Default</Button>
                <Button variant="outlined" sx={{ margin: 1 }} color="primary">
                  Primary
                </Button>
                <Button variant="outlined" sx={{ margin: 1 }} color="secondary">
                  Secondary
                </Button>
                <Button variant="outlined" sx={{ margin: 1 }} disabled>
                  Disabled
                </Button>
                <Button variant="outlined" sx={{ margin: 1 }} color="primary" href="#outlined-buttons">
                  Link
                </Button>
              </CardContent>
            </Card> */}
          </Grid>
          <Grid item xs={12}>
            {/* <Card>
              <CardHeader title="Sizes" />
              <Divider />
              <CardContent>
                <div>
                  <div>
                    <Button size="small" sx={{ margin: 1 }}>
                      Small
                    </Button>
                    <Button size="medium" sx={{ margin: 1 }}>
                      Medium
                    </Button>
                    <Button size="large" sx={{ margin: 1 }}>
                      Large
                    </Button>
                  </div>
                  <div>
                    <Button variant="outlined" sx={{ margin: 1 }} size="small" color="primary">
                      Small
                    </Button>
                    <Button variant="outlined" sx={{ margin: 1 }} size="medium" color="primary">
                      Medium
                    </Button>
                    <Button variant="outlined" sx={{ margin: 1 }} size="large" color="primary">
                      Large
                    </Button>
                  </div>
                  <div>
                    <Button sx={{ margin: 1 }} variant="contained" size="small" color="primary">
                      Small
                    </Button>
                    <Button sx={{ margin: 1 }} variant="contained" size="medium" color="primary">
                      Medium
                    </Button>
                    <Button sx={{ margin: 1 }} variant="contained" size="large" color="primary">
                      Large
                    </Button>
                  </div>
                  <div>
                    <IconButton aria-label="delete" sx={{ margin: 1 }} size="small">
                      <ArrowDownwardIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="delete" sx={{ margin: 1 }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="delete" sx={{ margin: 1 }}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="delete" sx={{ margin: 1 }}>
                      <DeleteIcon fontSize="large" />
                    </IconButton>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Reports;
