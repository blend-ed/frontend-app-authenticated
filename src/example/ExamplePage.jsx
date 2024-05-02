import { getAuthenticatedUser, getLoginRedirectUrl, getLogoutRedirectUrl } from '@edx/frontend-platform/auth';
import { Button, Container } from '@edx/paragon';
import { Redirect } from 'react-router-dom';

const ExamplePage = () => {

    const authenticatedUser = getAuthenticatedUser();
    const redirectUrl = getLoginRedirectUrl(window.location.origin + '/asd');
    const logoutUrl = getLogoutRedirectUrl(window.location.origin + '/asd');

    console.log(redirectUrl);

    if (!authenticatedUser) {
        return (
            <main>
                <Container className="py-5">
                    <h1>Not Authenticated</h1>
                    <p>You must be authenticated to view this page.</p>
                    <Button href={redirectUrl} variant="primary">Login</Button>
                </Container>
            </main>
        )
    } else {
        return (
            <main>
                <Container className="py-5">
                    <h1>Authenticated</h1>
                    <p>Welcome {authenticatedUser.username}!</p>
                    <div>
                        <p>Authenticated User:</p>
                        <pre>{JSON.stringify(authenticatedUser, null, 2)}</pre>
                    </div>
                    <Button href={process.env.LOGOUT_URL + `?next=${window.location.origin}/asd`} variant="primary">Logout</Button>
                </Container>
            </main>
        )
    }
};

export default ExamplePage;
