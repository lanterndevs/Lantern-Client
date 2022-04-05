import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Typography } from 'antd';
import { Helmet } from 'react-helmet-async';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ReturnOnInvestment() {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Return On Investment</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div
          className="omni-calculator"
          data-calculator="finance/roi"
          data-width="800"
          data-config="{}"
          data-currency="USD"
          data-show-row-controls="false"
          data-version="3"
          data-t="1649189375508"
        >
          <div className="omni-calculator-header"></div>
          <div className="omni-calculator-footer">
            <a
              href="https://www.omnicalculator.com/finance/roi"
              target="_blank"
              rel="noreferrer"
            >
              <img
                alt="Omni"
                className="omni-calculator-logo"
                src="https://cdn.omnicalculator.com/embed/omni-calculator-logo-long.svg"
              />
            </a>
          </div>
        </div>
        <script async src="https://cdn.omnicalculator.com/sdk.js"></script>
        <Helmet>
          <script async src="https://cdn.omnicalculator.com/sdk.js"></script>
        </Helmet>
      </AccordionDetails>
    </Accordion>
  );
}

export default ReturnOnInvestment;
