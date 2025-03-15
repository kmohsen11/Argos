/*
  # Add name fields to preorders table

  1. Changes
    - Add first_name and last_name columns to preorders table
    - Both fields are required (NOT NULL)
    
  2. Security
    - Maintain existing RLS policies
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'preorders' AND column_name = 'first_name'
  ) THEN
    ALTER TABLE preorders ADD COLUMN first_name text NOT NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'preorders' AND column_name = 'last_name'
  ) THEN
    ALTER TABLE preorders ADD COLUMN last_name text NOT NULL;
  END IF;
END $$;