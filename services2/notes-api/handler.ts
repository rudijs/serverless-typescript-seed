import { APIGatewayProxyHandler } from "aws-lambda"
import "source-map-support/register"
import { success } from "../lib/response"

export const notes: APIGatewayProxyHandler = async (_event, _context) => {
  return success({ message: "Notes!" })
}
