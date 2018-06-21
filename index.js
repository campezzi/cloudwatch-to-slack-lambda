const axios = require('axios');

const send = data =>
  axios.request({
    url: process.env.SLACK_WEBHOOK_URL,
    method: 'POST',
    contentType: 'application/json',
    data
  });

const statusColors = {
  ALARM: 'danger',
  INSUFFICIENT_DATA: 'warning',
  OK: 'good',
};

const toMessage = record => {
  const subject = record.Sns.Subject;
  const message = JSON.parse(record.Sns.Message);
  return {
    text: `<!here> ${subject}`,
    attachments: [{
      text: message.NewStateReason,
      fallback: message.NewStateReason,
      color: statusColors[message.NewStateValue],
      fields: [{
        title: 'Time',
        value: message.StateChangeTime,
        short: true,
      }, {
        title: 'Alarm',
        value: message.AlarmName,
        short: true,
      }, {
        title: 'Status',
        value: message.NewStateValue,
        short: true,
      }, {
        title: 'Region',
        value: message.Region,
        short: true,
      }],
    }],
  };
};

exports.handler = (event, context, callback) => {
  Promise.all(event.Records.map(toMessage).map(send))
    .then(() => callback(null))
    .catch(callback);
}
