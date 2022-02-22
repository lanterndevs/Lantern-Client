import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Footer from 'src/components/Footer';
  
function FinancialAccount() {
  
  return (
    <>
      <Helmet>
        <title>Financial Accounts</title>
      </Helmet>
      <PageTitleWrapper>
          <PageHeader /> 
      </PageTitleWrapper>
      <Footer />
    </>
  );
}

export default FinancialAccount;
