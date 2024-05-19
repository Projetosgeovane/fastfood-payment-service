-- AlterTable
ALTER TABLE `payments` MODIFY `transaction_id` VARCHAR(191) NULL,
    MODIFY `payer_email` VARCHAR(191) NULL,
    MODIFY `payer_id` VARCHAR(191) NULL,
    MODIFY `payment_date` DATETIME(3) NULL,
    MODIFY `errorMessage` VARCHAR(191) NULL;
