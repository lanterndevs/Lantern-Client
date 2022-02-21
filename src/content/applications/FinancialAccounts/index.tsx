import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Footer from 'src/components/Footer';
import { AuthenticationProvider } from '../Login/authenticationContext';

  
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
