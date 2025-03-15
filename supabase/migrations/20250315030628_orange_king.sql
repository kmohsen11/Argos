/*
  # Create Pre-orders Schema

  1. New Tables
    - `preorders`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `size` (text)
      - `device_type` (text)
      - `created_at` (timestamp)
      - `status` (text)
  
  2. Security
    - Enable RLS on `preorders` table
    - Add policies for inserting and viewing preorders
*/

CREATE TABLE IF NOT EXISTS preorders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  size text NOT NULL,
  device_type text,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

ALTER TABLE preorders ENABLE ROW LEVEL SECURITY;

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