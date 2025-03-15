/*
  # Add name fields to preorders table

  1. Changes
    - Add first_name and last_name columns to preorders table
    - Set default values for existing rows
    - Make columns required (NOT NULL)
    
  2. Security
    - Maintain existing RLS policies
*/

-- Add columns as nullable first
ALTER TABLE preorders 
ADD COLUMN IF NOT EXISTS first_name text,
ADD COLUMN IF NOT EXISTS last_name text;

-- Update existing rows with placeholder values
UPDATE preorders 
SET first_name = 'Unknown', 
    last_name = 'Unknown'
WHERE first_name IS NULL 
   OR last_name IS NULL;

-- Now make the columns NOT NULL
ALTER TABLE preorders 
ALTER COLUMN first_name SET NOT NULL,
ALTER COLUMN last_name SET NOT NULL;