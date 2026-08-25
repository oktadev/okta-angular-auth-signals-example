# Angular Auth with Signals Example

This repository contains a working example of an Angular v22 app that adds authentication using the standalone [Okta Angular SDK](https://github.com/okta/okta-angular), guards a route with the SDK's functional guard, and loads Okta users and groups reactively with `rxResource` and signal inputs. Please read [Supercharge Auth with Signals and the New Okta Angular SDK][blog] for a detailed guide through.

**Prerequisites**

* [Node.js](https://nodejs.org/en) v22 or greater
* [Angular CLI](https://angular.dev/tools/cli)
* An [Okta Integrator Free Plan account](https://developer.okta.com/signup/)
* A web browser with good debugging capabilities
* Your favorite IDE, such as [Visual Studio Code](https://code.visualstudio.com/)
* Terminal window (if you aren't using an IDE with a built-in terminal)

> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage and secure users and roles in any application.

- [Angular Auth with Signals Example](#angular-auth-with-signals-example)
  - [Getting Started](#getting-started)
    - [Create an OIDC Application in Okta](#create-an-oidc-application-in-okta)
    - [Configure the app](#configure-the-app)
  - [Links](#links)
  - [Help](#help)
  - [License](#license)

## Getting Started

To follow along with the blog post, clone the `starter` branch and build up the app as you read:

```sh
git clone -b starter https://github.com/oktadev/okta-angular-auth-signals-example.git
cd okta-angular-auth-signals-example
npm ci
```

The `main` branch has the completed app if you'd rather run the finished version:

```sh
git clone https://github.com/oktadev/okta-angular-auth-signals-example.git
cd okta-angular-auth-signals-example
npm ci
```

### Create an OIDC Application in Okta

Sign in to your Okta Integrator Free Plan account and create a **Single-Page Application** (OIDC) app integration with these settings:

* Grant types: **Authorization Code** and **Refresh Token**
* Sign-in redirect URI: `http://localhost:4200/login/callback`
* Sign-out redirect URI: `http://localhost:4200`
* **Proof of possession** enabled, since this app uses DPoP-bound access tokens

This app calls the Okta management APIs directly, so grant the **`okta.users.read`** scope to the application from its **Okta API Scopes** tab. Verify `http://localhost:4200` is a trusted origin with CORS enabled under **Security** > **API** > **Trusted Origins**.

Add people under **Directory** > **People** and groups under **Directory** > **Groups** so the dashboard has data to show.

The [blog post][blog] walks through each of these steps in detail.

### Configure the app

Update the `OktaAuth` instance in `src/app/app.config.ts` with your Okta values:

```ts
const oktaAuth = new OktaAuth({
  clientId: '{yourClientId}',
  issuer: 'https://{yourOktaDomain}',
  redirectUri: `${window.location.origin}/login/callback`,
  scopes: ['openid', 'profile', 'offline_access', 'email', 'okta.users.read'],
  pkce: true,
  dpop: true,
});
```

This example uses the **org authorization server**, so the issuer is your Okta domain without a `/oauth2/default` suffix — for example, `https://integrator-123.okta.com`. The org authorization server issues the access tokens that work with the Okta management APIs.

Start the app by running

```sh
npm start
```

Navigate to `http://localhost:4200` and sign in to see the dashboard of users and their groups.

## Links

This example uses the following libraries and resources:

* [Okta Angular SDK](https://github.com/okta/okta-angular)
* [Okta Auth JS SDK](https://github.com/okta/okta-auth-js)
* [Angular resources and `rxResource`](https://angular.dev/guide/signals/resource)
* [OAuth 2.0 Demonstrating Proof of Possession (DPoP), RFC 9449](https://datatracker.ietf.org/doc/html/rfc9449)
* [Okta Users API](https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/)

## Help

Please post any questions as comments on the [blog post][blog], or visit our [Okta Developer Forums](https://devforum.okta.com/).

## License

Apache 2.0, see [LICENSE](LICENSE).

[blog]: https://developer.okta.com/blog/2026/08/25/angular-auth-signals
