const dotenv = require('dotenv');
const server = require('./server');
const connection = require('./dbConn');
const logEvent = require('./event/myEmitters')
const {ERROR, INFO} = require('./constant/error-event.constant')

dotenv.config();
if (process.env.APP_NAME){
  connection.connect((err)=>{
    if (err){
        logEvent.emit(ERROR, {
            logTitle:'DB-FAILED',
            logMessage: err
        })
    } else {
      server.listen(process.env.APP_PORT, '0.0.0.0',
          function () {
              if (server.listening){
                logEvent.emit(INFO, {
                    logTitle: 'SERVER',
                    logMessage: `Server is listening on ${process.env.APP_PORT}`
                })
              }
          })
    }
  })
} else {
  process.exit(1);
}
