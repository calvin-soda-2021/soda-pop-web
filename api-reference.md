# Calvin Soda-Pop REST API reference

Calvin Soda-Pop is built on Firebase's Firestore database which is a "cloud-hosted, horizontally-scalable, no-sql, realtime database" (their words, not mine). Google supplies a REST API which can be used for basic querying. General documentation can be found here: https://firebase.google.com/docs/firestore/use-rest-api.

## Basic CRUD over HTTP

- PUT: add data to the endpoint such as a new document or collection. This is idempotent. Redundant redundant will overrite existing data.
- DELETE: remove data from the endpoint
- POST: update data at the endpoint. This is not idempotent. Redundant requests will add redundant data. This is not used in the Firebase API (see PATCH)
- GET: reads data at an endpoint. The vast majority of HTTP requests us this.
- PATCH: A less common method, but used by Firebase to create a document or update it if it already exists.

## Authenticating to database

### Authentication overview

We use Googles OAuth 2.0 protocol with the IAM directory in Google Cloud.
This is integrated with Firebase, which allows us to create a service account that can make queries on behalf of the application itself rather than a specific user.
To perform authentication on behalf of this account, we use a private key to sign an authentication token.  
_**DO NOT UNDER ANY CIRCUMSTANCES ADD THE PRIVATE KEY TO THE REPOSITORY OR ANY OTHER PUBLIC SITE!**_  
Possession of the private key is enough to verify the account's identity, which means if the key is ever leaked, the account is considered compromised.
If the key was accidentally shared instead of the authentication token, it is **IMPERATIVE** that you regenerate the private key for the account. 

### Accessing the service account

Google's documentation for creating a service account is here: https://developers.google.com/identity/protocols/oauth2/service-account.
I am also working on step-by-step instructions to recreate the process that I followed.
To generate a new key if required, log in to https://console.developers.google.com/iam-admin/serviceaccounts with a Google account that has been added to the Firebase project.
Select the `calvin-soda-pop` project, then select the `firestore-rest` service account. For security, delete any current keys, then click `Add Key` > `Create New Key` and selected the JSON option.

### Generating an access-token

To generate an API access token using the service account's private key, use the `get-token.py` script found in this directory. In its current state, 
the script prints the token and its expiration date to the command line. When submitting data to the REST API, this token must be included. To do this,
add a header field to your HTTP request called `Authorization` with the value `Bearer TOKEN` where `TOKEN` is the value of the access token (it will be a long string of gibberish, that's ok)

##  Writing data

Firestore is schemaless, so you can submit data however you want and you likely won't get to many errors. However, the frontend expects data to be in certain formats.
Every time new DEX data arrives, the following queries should be made.  
- Text in ALL CAPS indicates that it is a placeholder for a value.  
- Timestamps should be formatted as ISO 8061 timestamp strings
- Boolean fields are standard JSON booleans `true` or `false`

### POST temperature to https://firestore.googleapis.com/v1/projects/calvin-soda-pop-e9e3e/databases/(default)/documents/temperatures

```JSON
{
  "fields": {
    "temperature": { "integerValue":TEMPERATURE },
    "timestamp":{ "timestampValue": TIMESTAMP }
  }
}
```

### POST updated sales for each selection to https://firestore.googleapis.com/v1/projects/calvin-soda-pop-e9e3e/databases/(default)/documents/sale-updates

```JSON
{
  "fields": {
    "selection": {"integerValue": PRODUCT ID},
    "total-sales": {"integerValue": NUMBER VENDED},
    "timestamp": {"timestampValue": TIMESTAMP}
  }
}
```
(For now, iterate over each selection and POST for each one to create new documents for each selection. Firebase does have support for batch create over REST, could be worth looking into)

### READ price updates so that price can be updated on the machine https://firestore.googleapis.com/v1/projects/calvin-soda-pop-e9e3e/databases/(default)/documents/selections/price-updates

In the document, there will be an entry for each product who's price has updated, where the key is the product number and the value is the new price in cents. 

(This request can be unauthenticated and does not require a body)

Process this on the backend and write the new price to the machine, and be sure to use the updated price in the PATCH request below.

### PATCH sold out information to /v1/projects/calvin-soda-pop-e9e3e/databases/(default)/documents/selections/values

```JSON
{
  "fields": {
    SELECTION NUM: {
      "mapValue":{
        "fields": {
          "name": { "stringValue": PRODUCT NAME },
          "in-stock":{ "booleanValue": IS SOLD OUT},
          "price":{ "integerValue": PRICE_IN_CENTS}
        }
      }
    },
    SELECTION NUM: {
      "mapValue":{
        "fields": {
          "name": { "stringValue": PRODUCT NAME },
          "in-stock":{ "booleanValue": IS SOLD OUT },
          "price":{ "integerValue": PRICE_IN_CENTS}

        }
      }
    },
    SELECTION NUM: {
      "mapValue":{
        "fields": {
          "name": { "stringValue": PRODUCT NAME },
          "in-stock":{ "booleanValue": IS SOLD OUT },
          "price":{ "integerValue": PRICE_IN_CENTS}
        }
      }
    },
    etc. for each product
  }
}
```


### Future work: POST to a messages collection so that error messages can be accessed by the front end


