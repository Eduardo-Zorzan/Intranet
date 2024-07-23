# INTRANET
This application is a Intranet for consulting rooms, improving productive of the secretaries getting away of paper. The app was made majority with Javascript using MongoDB as DataBase and the framework Express. For the encryption the cipher AES was choseen (just the dB - server and server - db has encryption).
To run the app, you will need to create a .env file and set two variables in it:  
    -CONNECTIONSTRING=`your connection string from MongoDB`;  
    -SECRET=`create a password for the session configuration`;  
Next, install the node dependencies and run the follow command in terminal of the aplication:  
    `npm run nodemon`

