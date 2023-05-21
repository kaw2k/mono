var admin = require('firebase-admin')
var app = admin.initializeApp()

if (!process.env.E2E_TEST_EMAIL) console.log('no email provided')

admin
  .auth()
  .getUserByEmail(process.env.E2E_TEST_EMAIL)
  .then(function (userRecord) {
    admin
      .auth()
      .deleteUser(userRecord.uid)
      .then(function () {
        console.log('Successfully deleted user')
        // TODO: Cleanup other bits of user data
      })
      .then(function () {
        process.exit(0)
      })
      .catch(function (error) {
        console.log(error.code)
        process.exit(1)
      })
  })
  .catch(function (error) {
    if (error.code === 'auth/user-not-found') process.exit(0)
    console.log('Error fetching user data:', error)
    process.exit(1)
  })
