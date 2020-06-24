import "source-map-support/register"

export const main = async (event: any, _context: any) => {
  console.log("Event Bridge")
  console.log("event", event)
  // console.log("context", context)
  // throw Error("Boom!")
  return "OK"
}
