/*
  # Update Preorders Table Schema

  1. Changes
    - Add indexes for better query performance
    - Update RLS policies to ensure proper data access

  2. Security
    - Update policy for viewing own preorders
*/

-- Create indexes for better query performance if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_preorders_email'
  ) THEN
    CREATE INDEX idx_preorders_email ON preorders(email);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_preorders_status'
  ) THEN
    CREATE INDEX idx_preorders_status ON preorders(status);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_preorders_created_at'
  ) THEN
    CREATE INDEX idx_preorders_created_at ON preorders(created_at);
  END IF;
END $$;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can create preorders" ON preorders;
DROP POLICY IF EXISTS "Users can view their own preorders" ON preorders;

-- Recreate policies
CREATE POLICY "Anyone can create preorders"
  ON preorders
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view their own preorders"
  ON preorders
  FOR SELECT
  TO public
  USING (email = auth.jwt()->>'email');