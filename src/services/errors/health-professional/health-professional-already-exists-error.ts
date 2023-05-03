export class HealthProfessionalAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}
