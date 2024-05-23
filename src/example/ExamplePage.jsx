import { getAuthenticatedUser, getLoginRedirectUrl } from '@edx/frontend-platform/auth';
import { Button, Container } from '@edx/paragon';
import { gql, useQuery } from '@apollo/client';

const EG_QUERY = gql`
    query MyQuery {
        auth_user(where: {is_staff: {_eq: 1}}) {
            email
            id
            is_staff
            is_active
            is_superuser
        }
    }
`;

const ExamplePage = () => {

    const authenticatedUser = getAuthenticatedUser();
    const redirectUrl = getLoginRedirectUrl(window.location.origin + '/authenticated');

    const { loading, error, data } = useQuery(EG_QUERY);

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

                    <div>
                        {data && data.auth_user.length > 0 && (
                            <div>
                                <p>Example Query:</p>
                                <pre>{JSON.stringify(data.auth_user, null, 2)}</pre>
                            </div>
                        )}
                    </div>

                    <Button href={process.env.LOGOUT_URL + `?next=${window.location.origin}/authenticated`} variant="primary">Logout</Button>
                </Container>
            </main>
        )
    }
};

export default ExamplePage;
