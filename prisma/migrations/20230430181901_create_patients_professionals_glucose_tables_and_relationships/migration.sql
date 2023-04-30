-- CreateEnum
CREATE TYPE "MeasurementCharacteristic" AS ENUM ('FASTING', 'PREPRANDIAL', 'POSTPRANDIAL');

-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "phone" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "health_problems" TEXT,
    "medications" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "health_professionals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "phone" TEXT,
    "specialty" TEXT,
    "office_adress" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "health_professionals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_professional_conexions" (
    "patient_id" TEXT NOT NULL,
    "health_professional_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "patient_professional_conexions_pkey" PRIMARY KEY ("patient_id","health_professional_id")
);

-- CreateTable
CREATE TABLE "glucose_values" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "measurement_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "measurement_characteristic" "MeasurementCharacteristic" NOT NULL DEFAULT 'FASTING',
    "observations" TEXT,
    "patient_id" TEXT NOT NULL,

    CONSTRAINT "glucose_values_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "patients_email_key" ON "patients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "health_professionals_email_key" ON "health_professionals"("email");

-- AddForeignKey
ALTER TABLE "patient_professional_conexions" ADD CONSTRAINT "patient_professional_conexions_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_professional_conexions" ADD CONSTRAINT "patient_professional_conexions_health_professional_id_fkey" FOREIGN KEY ("health_professional_id") REFERENCES "health_professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "glucose_values" ADD CONSTRAINT "glucose_values_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
