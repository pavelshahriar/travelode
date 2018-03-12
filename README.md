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

1. git clone this repo : `git clone `
2. go to the project repo : `cd travelode`
3. run : `npm install`
4. add mobile platforms one by one :
```
tns platform add ios
tns platform add android
``` 
5. run : `tns run andoid`
6. open another terminal and run : `tns run ios`
