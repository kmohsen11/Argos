/*
  # Create Preorders Schema

  1. New Tables
    - `preorders` table for storing customer pre-orders
      - `id` (uuid, primary key): Unique identifier
      - `email` (text): Customer email address
      - `first_name` (text): Customer first name
      - `last_name` (text): Customer last name
      - `size` (text): Selected product size
      - `device_type` (text): Compatible smart device type
      - `status` (text): Order status (default: 'pending')
      - `created_at` (timestamptz): Timestamp of order creation

  2. Security
    - Enable Row Level Security (RLS)
    - Allow public inserts for pre-orders
    - Allow users to view their own pre-orders
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
  USING (email = auth.jwt()->>'email');

-- Create indexes for better query performance
CREATE INDEX idx_preorders_email ON preorders(email);
CREATE INDEX idx_preorders_status ON preorders(status);
CREATE INDEX idx_preorders_created_at ON preorders(created_at);