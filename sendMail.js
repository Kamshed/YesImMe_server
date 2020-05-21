const sgMail = require('@sendgrid/mail');
const { SENDGRID_API } = require('./config')
sgMail.setApiKey(SENDGRID_API)

function msg(body) {
  return ({
    to: 'josh@kamshed.com',
    from: 'josh@kamshed.com',
    subject: `Contact Form: ${body.company}-${body.name}`,
    html: `<p>${body.email}</p><p>${body.message}</p>`
  })
}

function autoResponse(body) {
  return ({
    to: body.email,
    from: 'josh@kamshed.com',
    subject: "Thank you for contacting YesI'mMe",
    html: 
    `
      <p>Hi, ${body.name}</p>
      <p>Thank you for contacting YesI'mMe! We will respond shortly.</p>
    `
  })
}

exports.send = body => sgMail.send(msg(body), 
  (err, res) => {
    if (err) return err
    else { 
      sgMail.send(autoResponse(body))
      return "success"
    }
})