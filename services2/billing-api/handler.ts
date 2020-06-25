import { APIGatewayProxyHandler } from "aws-lambda"
import "source-map-support/register"

export const billing: APIGatewayProxyHandler = async (_event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Billing!",
      },
      null,
      2
    ),
  }
}
