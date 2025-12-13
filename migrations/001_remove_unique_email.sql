-- Migration: Remove unique email constraint to allow users to retake the quiz
-- Date: December 12, 2024
-- Reason: Users should be able to reassess their supply chain after improvements

ALTER TABLE leads DROP CONSTRAINT IF EXISTS unique_email;
