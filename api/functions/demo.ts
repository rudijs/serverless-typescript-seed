import { APIGatewayProxyHandler } from "aws-lambda"
import "source-map-support/register"
import { success } from "../lib/response"
import * as AWS from "aws-sdk"

export const main: APIGatewayProxyHandler = async (event, _context) => {
  console.log(101, event)

  const eventbridge = new AWS.EventBridge()

  const params: AWS.EventBridge.PutEventsRequest = {
    Entries: [
      {
        EventBusName: "custom-saas-events",
        Source: "saas.external",
        Detail: JSON.stringify({ key1: "value1" }),
        DetailType: "The Details Type",
        // Resources: ["resource1", "resource2"],
      },
    ],
  }

  const res = await eventbridge.putEvents(params).promise()
  console.log("res", res)

  // const body = JSON.parse(event.body)
  // console.log(201, body)
  // if (!body.success) {
  // console.log(301, "throwing")
  // throw Error("Boom!")
  // }
  return success({ message: "OK" })
  // return failure([{ status: 500, title: "Boom!", description: "Something exploded." }])
}
