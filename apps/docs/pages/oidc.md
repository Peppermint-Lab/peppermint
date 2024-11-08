### How to Use OpenID Connect (OIDC) for Authentication

This guide will walk you through the process of using OpenID Connect (OIDC) for authentication in your application. As an end user, you don't need to worry about the underlying code; just follow these steps to get started.

## Requirements 
- Set client type to PUBLIC in your oidc provider
- OIDC well known config url
- OIDC client ID


#### Step 1: Logging In with OIDC

- Go to the login page of the application. You should see options for logging in with different methods, including OIDC.

- Click on the OIDC login button. This will redirect you to the OIDC provider's login page.

- Enter your credentials on the OIDC provider's login page. This could be your email and password or any other authentication method supported by the provider.

- After successful authentication, you will be redirected back to the application. If this is your first login, you might be taken to an onboarding page.

#### Step 2: Managing OIDC Settings (Admin Only)

If you are an admin, you can manage OIDC settings in the admin panel.

- Log in to the application with admin credentials and navigate to the admin panel.

- In the authentication settings section, select "OIDC" as the provider type.
- Enter the necessary details such as the Issuer, Client ID, and Redirect URI.
- The Issuer is the URL of the OIDC provider, it needs to be the well known configuration endpoint of the OIDC provider.

- After entering the details, click the "Save" button to update the OIDC configuration.

- If you need to remove the OIDC configuration, you can do so by clicking the "Delete" button in the admin panel.

#### Step 3: Troubleshooting

- **Account Not Found:** If you encounter an error stating "Account Not Found," it means your account might not be set up for OIDC. Contact your admin for assistance.

- **Error During Login:** If there is an error during login, try again. If the issue persists, contact support for help.

By following these steps, you can easily use OIDC for authentication in your application. If you have any questions or need further assistance, feel free to reach out to your admin or support team.
