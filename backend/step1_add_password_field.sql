-- Step 1: Add password field to existing farmer table
-- Run this SQL command in your MySQL database

USE cloudfarm;

-- Add password column for authentication
ALTER TABLE farmer 
ADD COLUMN farmer_password VARCHAR(255) AFTER farmer_phn;

-- Add index for better login performance  
CREATE INDEX idx_farmer_phn ON farmer(farmer_phn);

-- Verify the changes
DESCRIBE farmer;

-- Show current farmer table structure
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'cloudfarm' AND TABLE_NAME = 'farmer'
ORDER BY ORDINAL_POSITION;
