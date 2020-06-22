import { Machine, assign } from "xstate"

interface FetchStates {
  states: {
    idle: {}
    pending: {}
    successful: {
      states: {
        unknown: {}
        withData: {}
        withoutData: {}
      }
    }
    failed: {}
  }
}

type FetchMachineEvents = { type: "FETCH" } | { type: "RESOLVE"; results: any[] } | { type: "REJECT"; message: string }

interface FetchContext {
  results: any[]
  message: string
}

const fetchMachine = Machine<FetchContext, FetchStates, FetchMachineEvents>(
  {
    id: "fetch",
    initial: "idle",
    context: {
      results: [],
      message: "",
    },
    states: {
      idle: {
        on: {
          FETCH: "pending",
        },
      },
      pending: {
        // invoke the fetchData service configure in the instance
        invoke: {
          src: "fetchData",
          onDone: { target: "successful", actions: ["setResults"] },
          onError: { target: "failed", actions: ["setMessage"] },
        },
        // entry: ['fetchData'],
        // on: {
        //   RESOLVE: {target: 'successful', actions: ['setResults']},
        //   REJECT: {target: 'failed', actions: ['setMessage']},
        // },
      },
      failed: { on: { FETCH: "pending" } },
      successful: {
        initial: "unknown",
        on: { FETCH: "pending" },
        states: {
          unknown: {
            on: {
              // automatic or transient transition - denoted by the empty string
              // this automatic transition is executed as soon as you enter this state, and keeps being exectuted everytime there's an event while in this state
              "": [{ target: "withData", cond: "hasData" }, { target: "withoutData" }],
            },
          },
          withData: {},
          withoutData: {},
        },
      },
    },
  },
  {
    actions: {
      setResults: assign((ctx, event: any) => ({
        results: event.data.data,
      })),
      setMessage: assign((ctx, event: any) => ({
        // todo:rudijs check event.data is correct
        message: event.data,
        // message: event.message,
      })),
    },
    guards: {
      hasData: (ctx, event) => !!ctx.results && ctx.results.length > 0,
    },
  }
)

export default fetchMachine
