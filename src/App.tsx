import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import CategoryPage from './Pages/CategoryPage';
import DetailPage from './Pages/DetailPage';
import NewListingPage from './Pages/NewListingPage';
import ProfilePage from './Pages/ProfilePage';
import RequestsPage from './Pages/RequestsPage';
import SignInPage from './Pages/SignIn';
import SignUpPage from './Pages/SignUp';
import StartPage from './Pages/StartPage';
import { createTheme, colors, ThemeProvider } from '@mui/material';
import { TestComponent } from './MuiResponsiveness';

const theme = createTheme({
	status: {
		danger: '#ff0000',
	},
	palette: {
		primary: {
			main: colors.teal[200],
			darker: colors.teal[300],
		},
		secondary: {
			main: colors.amber[600],
		},
		neutral: {
			main: colors.grey[500],
			darker: colors.grey[700],
		},
	},
	typography: {
		body1: {
			fontFamily: 'Raleway, Arial',
			fontSize: 3,
		},
		h1: {
			fontFamily: 'Roboto, Arial',
			fontSize: 4,
		},
		h2: {
			fontFamily: 'Inter, Arial',
			fontSize: 4,
		},
	},
	shape: {
		buttonBorderRadius: '6px',
		inputBorderRaduis: '6px',
	},
});

function App() {
	return (
		<div>
			<ThemeProvider theme={theme}>
				<TestComponent />
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<StartPage />} />
							<Route path="/detail/:id" element={<DetailPage />} />
							<Route path="/category/:d" element={<CategoryPage />} />
							<Route path="/signup" element={<SignUpPage />} />
							<Route path="/signin" element={<SignInPage />} />
							<Route path="/profile/:id" element={<ProfilePage />} />
							<Route path="/newlisting" element={<NewListingPage />} />
							<Route path="/requests" element={<RequestsPage />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</div>
	);
}

export default App;
