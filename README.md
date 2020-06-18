# Picol

> An Closed-SNS-Service Application.

## Overview

This app is considered to be used Kuroco and it's SDK.  
If you don't have it and try to update classes to match your own Kuroco,  
please install and setup in advance.  

https://github.com/diverta/kuroco-sdk#installation

We prepared example of configuration in this repo,  
you can refer it: `./kuroco.config.sample.json`.

In addition, this app is deployed to firebase hosting in Diverta.
Please refer [deploy] if you want to know how to do it.

## Project setup && deploy to your Firebase in short

```
npm install && npm run deploy
```

### for dev

#### run locally

This app does not have any of backend for preview in local.  
So that if you want to do it,  
You can use the actual backend server through the [Charles] proxy software.  
You need to configure in advance, that is mapping remote to local dist file.  
Also you can import configurations for it,  
just for reference, using configuration for Picol of Diverta.co.jp is located at (./etc/CharlesMapLocal.xml).  
![CharlesConfig]

#### deploy

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

[Charles]: https://www.charlesproxy.com/
[CharlesConfig]: ./etc/CharlesConfig.png
[deploy]: #deploy
