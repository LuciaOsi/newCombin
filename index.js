const Restify = require('restify')
const server = Restify.createServer()
const err = require('restify-errors')

const corsMiddleware = require('restify-cors-middleware')
const cors = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['Authorization'],
  exposeHeaders: ['Authorization']
})

server.pre(cors.preflight)
server.use(cors.actual)

server.use(Restify.plugins.queryParser())
server.use(Restify.plugins.bodyParser({ mapParams: false }))

const url = '/api/members'
const members = [
  {
    firstName: 'Cosme',
    lastName: 'Fulanito',
    address: '742 Evergreen Terrance',
    ssn: '333-22-4444'
  }
]

server.get(url, (req, res) => {
  res.send(members)
})

function validString (item) {
  return typeof item === 'string' && item.trim().length > 1
}

server.post(url, (req, res, next) => {
  console.log(url);
  const body = req.body || {}
  console.log(body)
  const firstName = body.firstName || ''
  const lastName = body.lastName || ''
  const address = body.address || ''
  const ssn = body.ssn || ''
  console.log(firstName)
  console.log(lastName)
  console.log(address)
  console.log(ssn)
  if (!validString(firstName) || !validString(lastName) || !validString(address)) {
    return next(new err.BadRequestError('Invalid first name, last name or address'))
  }
  const regex = /^\d{3}-\d{2}-\d{4}$/
  console.log(regex.test(ssn))
  if (regex.test(ssn) === false) {
    return next(new err.BadRequestError('Invalid SSN'))
  }

  const p = members.findIndex((m) => m.ssn === ssn)
  if (p !== -1) {
    return next(new err.BadRequestError('Duplicate SSN'))
  }  
 console.log(members)
  members.push({
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    address: address.trim(),
    ssn
  })
  console.log(members)
  res.send(201)
})

server.listen(8081, () => {
  console.log('Restify ready!')
})
