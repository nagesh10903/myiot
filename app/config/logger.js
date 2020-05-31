const {createLogger,format, transports } =require("winston");
const { label, combine, timestamp , prettyPrint,printf } = format;

var dtstamp=new Date().toISOString().substr(0,10);

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
 });
 
const logger = createLogger({
  format: combine(
        timestamp(),
        myFormat
      ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: './logs/error_'+dtstamp +'.log' , level: 'error'  }),
    new transports.File({ filename: './logs/info_'+dtstamp +'.log' , level: 'info'  }),
  ],
  exitOnError: false,
});
 
const dblogger = createLogger({
    level:'info',
    format: combine(
      timestamp(),
      myFormat
        ),
    transports: [
     // new transports.Console(),
      new transports.File({ filename: './logs/dberror_'+dtstamp +'.log' , level: 'error'  }),
      new transports.File({ filename: './logs/dbinfo_'+dtstamp+'.log' }),
    ],
    exitOnError: false,
  });
   
module.exports={logger,dblogger}; 

/*
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logfile.log' })
  ]
});

import  logger from 'pathto../logger';
 ....
 logger.log({message:'Request recieved', level:'info' ,
        transationId:'one', correlationId:'one',
        request:req.query ,
        operation:'demoFunction' });
  ....
--------------------------- 
{ message: 'Request recieved',
  level: 'info',
  transationId: 'one',
  correlationId: 'one',
  request: { id: 0 },
  operation: 'demoFuncion',
  timestamp: '2019-02-20T19:15:32.882Z' }
   -------------------------------------------


   const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
 
const logger = createLogger({
  format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    myFormat
  ),
  transports: [new transports.Console()]
});
To see what built-in formats are available and learn more about creating your own custom logging formats, see logform.

Combining formats
Any number of formats may be combined into a single format using format.combine. Since format.combine takes no opts, as a convenience it returns pre-created instance of the combined format.

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
 
const logger = createLogger({
  format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    prettyPrint()
  ),
  transports: [new transports.Console()]
})
*/