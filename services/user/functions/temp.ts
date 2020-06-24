import "source-map-support/register"

export const main = async (event: any, context: any) => {
  console.log("event", event)
  console.log("context", context)
  // throw Error("Boom!")
  return "OK"
}
