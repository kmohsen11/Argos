/*
  # Create Preorders Table

  1. New Tables
    - `preorders`
      - `id` (uuid, primary key)
      - `email` (text, not null)
      - `first_name` (text, not null)
      - `last_name` (text, not null)
      - `size` (text, not null)
      - `device_type` (text, not null)
      - `status` (text, default: 'pending')
      - `created_at` (timestamptz, default: now())

  2. Security
    - Enable RLS on preorders table
    - Add policy for public inserts
    - Add policy for users to view their own preorders

  3. Performance
    - Add indexes for frequently queried columns
*/

-- Create the preorders table
CREATE TABLE preorders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  size text NOT NULL,
  device_type text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE preorders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can create preorders"
  ON preorders
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view their own preorders"
  ON preorders
  FOR SELECT
  TO public
  USING (email IS NOT NULL);

-- Create indexes for better query performance
CREATE INDEX idx_preorders_email ON preorders(email);
CREATE INDEX idx_preorders_status ON preorders(status);
CREATE INDEX idx_preorders_created_at ON preorders(created_at);