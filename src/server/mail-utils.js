function sendEmail(subject, body, person) {
  Logger.log('I like the way you french inhale');
  if (person) {
    MailApp.sendEmail({
      to: person.email,
      subject: subject,
      name: 'COGESTEC 2019',
      htmlBody: body,
    });
  }
}
function sendConfirmationMail(person) {
  let htmlBody = 'buildInternationalBody(person)';
  let subject = 'Confirmación de Registro Internacional';
  sendEmail(subject, htmlBody, person);
}

export {sendConfirmationMail};
