import { APIGatewayProxyHandler } from "aws-lambda"
import "source-map-support/register"
import { success } from "../lib/response"

export const main: APIGatewayProxyHandler = async (_event, _context) => {
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     message: `pong - ${new Date(Date.now())}`,
  //   }),
  // }
  return success({ message: "pong" })
  // return failure([{ status: 500, title: "Boom!", description: "Something exploded." }])
}
