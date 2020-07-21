# Picol

> An Closed-SNS-Service Application.

## Preview

`npm run serve`  

> :information_source: This command will not work without configuration, please refere to [Run Locally]

## Overview

This app is considered to be used Kuroco and it's SDK.  
If you don't have it,  
please install and setup in advance.  

https://github.com/diverta/kuroco-sdk#installation

The SDK is located at src/kuroco_api

In addition, this app is deployed to firebase hosting in Diverta.
Please refer [Deploy] if you want to know how to do it.

## Project setup && deploy to your Firebase in short

```
npm install && npm run deploy
```

### For dev

#### Run Locally

This app does not have any of backend for preview in local.  
So that if you want to do it, please utilize the actual backend server with CORS configuration.  
![cors_config]

This configuration allows to access the server from local.  
You can preview this app with following:  
`npm run serve`

#### Deploy

Just type `npm run deploy` if you already configured.

You have not used fireabase hosting before,
Please Initialize it.  

as:   
`npm i -g firebase && firebase init`,  
-> loggin  
-> select firebase hosting  
-> `? What do you want to use as your public directory?` : type `dist` directry  
-> `? Configure as a single-page app (rewrite all urls to /index.html)? (y/N)` : y  
-> `? File dist/index.html already exists. Overwrite? (y/N) ` N (optionally question)

[cors_config]: ./etc/cors_config.png
[Deploy]: #Deploy
[Run Locally]: #Run-Locally
