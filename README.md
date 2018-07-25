## Enviorment Setup
##### 1. Install Node + NPM through NVM
Follow instructions here : https://github.com/creationix/nvm#install-script
##### 2. Install Nativescript
```
npm install -g nativescript
```
##### 3. System setup
For Mac only 
```
ruby -e "$(curl -fsSL https://www.nativescript.org/setup/mac)"
```
##### 4. Verify setup
Running the following should say all ok :
```
tns doctor
```
#### (Optional) Manual Setup
If step 4 above says something is wrong, manually install everything following the instructions here : https://docs.nativescript.org/start/ns-setup-os-x#system-requirements 

## App Setup

1. Git clone this repo : 
   ```
   git clone git@github.com:pavelshahriar/travelode.git
   ```
2. Go to the project repo : `cd travelode`
3. Run : `npm install`
4. Add mobile platforms one by one :
   ```
   tns platform add ios
   tns platform add android
   ```
5. Do these to setup local machine `apiUrl` :
   ```
   go    : System Preference -> Network -> Connected Network -> Advanced -> TCP/IP
   copy  : IPv4 Address (Ideally 10.0.0.xxx)
   paste : config/config.local.json -> apiUrl
   ```
6. Build the project :

   i. Local : 
   ```
   npm run android-local-build
   npm run io-local-build
   ```
   ii. Prod :
   ```
   npm run android-prod-build
   npm run io-prod-build
   ```
    
7. Run the app in connected device / emulator :
   
   i. Local :
   ```
   npm run android-local
   npm run ios-local
   ```
   ii.Prod :
   ```
   npm run android-prod
   npm run ios-prod

   ```