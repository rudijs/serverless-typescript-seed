import { APIGatewayProxyHandler } from "aws-lambda"
import "source-map-support/register"

export const main: APIGatewayProxyHandler = async (_event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `pong - ${new Date(Date.now())}`,
    }),
  }
}
