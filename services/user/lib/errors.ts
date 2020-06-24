// export class ValidationError extends Error {
//   constructor(message) {
//     super(message)
//     this.name = "ValidationError"
//     this.message = message
//   }
// }

export class PermissionError extends Error {
  code = 403
  constructor(message: string, code?: number) {
    super(message)
    this.name = "PermissionError"
    if (code) {
      this.code = code
    }
    // this.message = message
  }
}

// export class DatabaseError extends Error {
//   constructor(message) {
//     super(message)
//     this.name = "DatabaseError"
//     this.message = message
//   }
// }
