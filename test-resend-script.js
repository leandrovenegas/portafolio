const { Resend } = require('resend');

const apiKey = 're_ApiqGoNy_NL8MccD9Yvaf1TSLRSy9vS8j';
const resend = new Resend(apiKey);

async function test() {
  try {
    console.log('Sending test email via Resend...');
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'leandrovenegasoficial@gmail.com',
      subject: 'Test Resend Email',
      html: '<p>This is a test email to verify Resend functionality.</p>'
    });
    console.log('Result:', result);
  } catch (err) {
    console.error('Error sending:', err);
  }
}

test();
