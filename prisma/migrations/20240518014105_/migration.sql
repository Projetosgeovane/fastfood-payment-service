/*
  Warnings:

  - You are about to drop the `clients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `clients`;

-- CreateTable
CREATE TABLE `payments` (
    `id` VARCHAR(191) NOT NULL,
    `order_id` VARCHAR(191) NOT NULL,
    `payment_method` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `transaction_id` VARCHAR(191) NOT NULL,
    `payer_email` VARCHAR(191) NOT NULL,
    `payer_id` VARCHAR(191) NOT NULL,
    `payment_date` DATETIME(3) NOT NULL,
    `errorMessage` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `payments_order_id_key`(`order_id`),
    UNIQUE INDEX `payments_payment_method_key`(`payment_method`),
    UNIQUE INDEX `payments_status_key`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
