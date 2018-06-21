# cloudwatch-to-slack-lambda
A simple AWS Lambda (Node 8.x) to push CloudWatch Alarm messages sent to an SNS topic into a Slack channel. Requires a `SLACK_WEBHOOK_URL` environment variable to be set on the lambda.
