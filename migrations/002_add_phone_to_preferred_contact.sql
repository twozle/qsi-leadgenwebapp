-- Migration: Add 'phone' option to preferred_contact constraint
-- Date: December 12, 2024
-- Reason: Added Phone Call as a contact method option

-- Drop the old constraint
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_preferred_contact_check;

-- Add the new constraint with 'phone' included
ALTER TABLE leads ADD CONSTRAINT leads_preferred_contact_check
  CHECK (preferred_contact IN ('email', 'sms', 'whatsapp', 'phone'));
