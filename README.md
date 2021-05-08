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

### For dev

#### Run Locally

This app does not have any of backend for preview in local.  
So that if you want to do it, please utilize the actual backend server with CORS configuration.  
![cors_config]

This configuration allows to access the server from local.  
You can preview this app with following:  
`npm run serve`

## public/kuroco_front.json

the file is a configuration file for Kuroco front-end server.  
see [Documents](https://kuroco.app/documentations/kuroco_front/).
