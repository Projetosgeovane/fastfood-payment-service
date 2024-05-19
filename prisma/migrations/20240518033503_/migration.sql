-- DropIndex
DROP INDEX `payments_payment_method_key` ON `payments`;

-- AlterTable
ALTER TABLE `payments` MODIFY `payment_method` VARCHAR(191) NULL;
