-- THE PRODUCE RELIABILITY SCORECARD™ - Database Schema
-- Vercel Postgres

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: leads
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Contact Information
    email VARCHAR(255),
    phone VARCHAR(50),
    preferred_contact VARCHAR(20) CHECK (preferred_contact IN ('email', 'sms', 'whatsapp', 'phone')),

    -- Business Information
    business_type VARCHAR(100),
    weekly_spend_range VARCHAR(50),
    delivery_frequency VARCHAR(50),
    location_city VARCHAR(100),
    location_region VARCHAR(100),

    -- Pain Point
    biggest_frustration TEXT,

    -- Tracking
    session_id VARCHAR(255) UNIQUE NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,

    -- Constraints
    CONSTRAINT email_or_phone_required CHECK (email IS NOT NULL OR phone IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_business_type ON leads(business_type);
CREATE INDEX IF NOT EXISTS idx_leads_session_id ON leads(session_id);


-- Table: quiz_responses
CREATE TABLE IF NOT EXISTS quiz_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Individual Question Responses (JSON for flexibility)
    answers JSONB NOT NULL,

    -- Category Scores (0-20 each, totaling 100)
    delivery_reliability_score INTEGER CHECK (delivery_reliability_score BETWEEN 0 AND 20),
    quality_consistency_score INTEGER CHECK (quality_consistency_score BETWEEN 0 AND 20),
    communication_support_score INTEGER CHECK (communication_support_score BETWEEN 0 AND 20),
    forecasting_planning_score INTEGER CHECK (forecasting_planning_score BETWEEN 0 AND 20),
    pricing_stability_score INTEGER CHECK (pricing_stability_score BETWEEN 0 AND 20),

    -- Master Score & Tier
    master_score INTEGER NOT NULL CHECK (master_score BETWEEN 0 AND 100),
    tier VARCHAR(50) NOT NULL CHECK (tier IN ('unstable', 'at_risk', 'mostly_reliable', 'high_performance')),

    -- Recommendations
    recommendations JSONB,

    CONSTRAINT unique_lead_response UNIQUE (lead_id)
);

CREATE INDEX IF NOT EXISTS idx_quiz_responses_lead_id ON quiz_responses(lead_id);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_tier ON quiz_responses(tier);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_master_score ON quiz_responses(master_score DESC);
