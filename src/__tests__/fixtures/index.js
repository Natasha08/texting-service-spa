export const email = 'test@example.com';
export const token = 'bcc70edc-b8d4-4d06-bf94-854a81f30129';
export const authenticatedUser = {email, token};
export const messages = [
  {
    id: 3,
    to_number: '555-555-5555',
    text: 'An awesome message',
    sms_message_id: '3ee8de2b-25b0-410d-aaf3-12d65d896c9b',
    sender: {email},
    status: 'failed'
  },
  {
    id: 5,
    to_number: '555-555-5555',
    text: 'A follow up message',
    sms_message_id: 'bab9ad8f-0d25-40fd-86de-b942bbd65b99',
    sender: {email},
    status: 'delivered'
  },
  {
    id: 6,
    to_number: '555-555-5555',
    text: 'closing message',
    sms_message_id: '88783877-6507-445c-8beb-9b888f8af71d',
    sender: {email},
    status: 'pending'
  }
];

export const user = {
  email,
  password: 'password'
};
