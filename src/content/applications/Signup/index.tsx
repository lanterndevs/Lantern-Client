import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import mainLogo from 'src/components/Logo/lantern.png';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useContext } from 'react';
import { AuthenticationContext } from '../Login/authenticationContext';

const theme = createTheme();
const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be 6 characters or more'),
  firstName: yup.string().required('First name is required').matches(/^[a-zA-Z0-9]+$/, 'First name has non-alphanumeric characters'),
  lastName: yup.string().required('Last name is required').matches(/^[a-zA-Z0-9]+$/, 'Last name has non-alphanumeric characters'),
  organization: yup.string().required('Organization name is required').matches(/^[a-zA-Z0-9]+$/, 'Organization name has non-alphanumeric characters')
});

export default function SignUp() {
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      organization: ''
    },
    validationSchema: validationSchema ,    
    onSubmit: values => {     
        // Handle Submit
    },
  });

  const alert = useAlert()
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(['auth_token']);
  // eslint-disable-next-line
  const {authToken, setAuthToken } = useContext(AuthenticationContext); // the user authentication token

  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios.post('http://localhost:8000/api/users/register',
    {
      auth: {
        email: data.get('email'),
        password: data.get('password')
      },
      bio: {
        first: data.get('firstName'),
        last: data.get('lastName'),
        orgName: data.get('organization')
      }
    
  }).then(res => {
        if (res.data.token != null) {
          alert.removeAll();
          setCookie('auth_token',res.data.token,{ path: '/', maxAge: 100000000});
          setAuthToken(res.data.token);
          navigate('/dashboard/overview');
        }
    }).catch(err => {
      alert.show("Invalid signup. Try again");
    });;
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={mainLogo} style={{width: "40px", height: "70px", bottom:"20px", position: "relative"}} alt="lantern-logo"/>
          
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="organization"
                  label="Organization Name"
                  name="organization"
                  autoComplete="organization"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.organization}
                  error={formik.touched.organization && Boolean(formik.errors.organization)}
                  helperText={formik.touched.organization && formik.errors.organization}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>

              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}