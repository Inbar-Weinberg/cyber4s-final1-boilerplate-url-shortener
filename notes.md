instructions:

1. npm emit
2. install packages:
  - npm i express mongoose ejs
  - npm --save-dev nodemon
  - (fs is included in node by default)
## these change the package.json dependencies
in package.json
3. scripts:
    devStart: "nodemon server.js'
    --> sever.js is a file we create
    --> run by putting: npm run devStart

4. create server.js 

- library: npm i shortid
    shortId = require shortid
schema of data structure:{
    full:{
        type: String,
        required: true
    },
    short{
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks:{
        type: Number,
        required: true,
        default:0
    }
}
create?({full: req.body.fullUrl})
res.redirect?




# To send html:
    - with express
    - res.sendFile() 
    - or express.static() middle ware function






# notes:
- process.env: object representing the state of the system.
- process.env.PATH
- process.env.NODE_ENV? "test": './api';

# Questions: 
1. are we using ejs package? any thing else?
2. Bootstrap?
3. cors?

