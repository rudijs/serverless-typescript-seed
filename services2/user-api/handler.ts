import { APIGatewayProxyHandler } from "aws-lambda"
import "source-map-support/register"
import { success } from "../lib/response"

export const user: APIGatewayProxyHandler = async (_event, _context) => {
  return success({ message: "User!" })
}
