# Picol

> An Closed-SNS-Service Application.

## Preview

`npm run serve`  

> :information_source: This command will not work without configuration, please refere to [Run Locally]

## Configure hostname of API

This app will load the hostname of Kuroco API from a configuration in `env.js`.  
Please modify the file if you own your Kuroco environment.  
```javascript
module.exports = {
  KUROCO_HOST: 'https://your-host-name.com',
};

```

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

```
 firebase use picol-****
 firebase target:apply hosting picol-**** picol-****
 firebase deploy picol-****
```

## public/kuroco_front.json

the file is a configuration file for Kuroco front-end server.  
see [comment](https://github.com/diverta/front_picol/commit/631470674dca98db5348391fbaf99b8ee96b5615#commitcomment-48336379).
