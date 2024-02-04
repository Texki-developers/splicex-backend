import moment from 'moment'

export const adminLoginMailBody = (name: string) => {
  return `
  <html>
    <body>
      <p>
      Dear Super Admin,<br />

      This is to inform you that a user has logged in to the admin panel.
      <br /><br />
      User Details:<br /><br />
      Name: ${name}<br />
      Logged In Time: ${moment().format('DD/MM/YYYY HH:mm')}<br />
      </p>
    <body>
  <html>
 
  
`
}