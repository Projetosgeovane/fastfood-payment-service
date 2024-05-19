-- DropIndex
DROP INDEX `payments_status_key` ON `payments`;

-- AlterTable
ALTER TABLE `payments` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'pending';
