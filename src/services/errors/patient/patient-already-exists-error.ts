export class PatientAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}
