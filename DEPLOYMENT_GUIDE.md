# Deployment Guide - Neon Database Setup

## Quick Start with Neon

### Step 1: Create Neon Database in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Storage** tab
3. Click **Create Database**
4. Select **Neon** (Serverless Postgres)
5. Choose a database name (e.g., `qsi-scorecard-db`)
6. Select a region (choose closest to your users)
7. Click **Create**

Vercel will automatically:
- Create a Neon database
- Add environment variables to your project
- Set up connection pooling

### Step 2: Initialize Database Schema

You have two options to run the schema:

#### Option A: Neon Console (Recommended)

1. In Vercel Dashboard, find your Neon database
2. Click **"Manage Database"** or **"Open Neon Console"**
3. In Neon Console:
   - Go to **SQL Editor** or **Tables**
   - Click **"New Query"**
4. Copy the entire contents of `schema.sql` from your project
5. Paste into the SQL editor
6. Click **"Run"** or **"Execute"**
7. Verify tables were created (you should see `leads` and `quiz_responses`)

#### Option B: Command Line (Alternative)

If you have `psql` installed:

```bash
# Get your connection string from Vercel environment variables
# It will look like: postgresql://user:password@host/database

# Run the schema
psql "your-connection-string-here" < schema.sql
```

### Step 3: Verify Environment Variables

Go to your Vercel project settings:
- **Settings** → **Environment Variables**

You should see these variables (added automatically by Neon integration):
```
POSTGRES_URL
POSTGRES_PRISMA_URL
POSTGRES_URL_NON_POOLING
POSTGRES_USER
POSTGRES_HOST
POSTGRES_PASSWORD
POSTGRES_DATABASE
```

If using Neon directly, you might see:
```
DATABASE_URL
```

**Important:** The `@vercel/postgres` package works with both! No code changes needed.

### Step 4: Deploy Your Application

```bash
# If not already connected to Vercel
vercel

# Or if already connected, just push to git
git add .
git commit -m "Add database configuration"
git push
```

Vercel will automatically deploy with the database connected.

### Step 5: Test Your Application

1. Visit your deployed URL
2. Click **"Start the Scorecard"**
3. Complete the quiz
4. Submit the lead form
5. Verify results display correctly

### Step 6: Verify Data in Database

Go to Neon Console → **Tables** or **SQL Editor**:

```sql
-- Check if leads were created
SELECT * FROM leads ORDER BY created_at DESC LIMIT 5;

-- Check if quiz responses were stored
SELECT * FROM quiz_responses ORDER BY created_at DESC LIMIT 5;

-- Check tier distribution
SELECT tier, COUNT(*) as count
FROM quiz_responses
GROUP BY tier;
```

## Troubleshooting

### Error: "relation 'leads' does not exist"

**Solution:** The schema wasn't run. Go back to Step 2 and run the SQL from `schema.sql`.

### Error: "Connection refused" or "Database not found"

**Solution:**
1. Check environment variables are set in Vercel
2. Redeploy the project
3. Verify Neon database is active (not paused)

### Error: "Invalid input" when submitting quiz

**Solution:**
1. Check browser console for validation errors
2. Verify all required fields are filled
3. Ensure email OR phone is provided

### Database Paused (Neon Free Tier)

Neon free tier pauses databases after inactivity:
- First request after pause may be slow (cold start)
- Database auto-wakes on connection
- Consider upgrading for production

## Environment Variables Explained

### Using @vercel/postgres (Current Setup)

The app uses these variables (auto-populated by Neon):
- `POSTGRES_URL` - Main connection string (pooled)
- `POSTGRES_PRISMA_URL` - For Prisma ORM (if needed later)
- `POSTGRES_URL_NON_POOLING` - Direct connection (for migrations)

### Alternative: Direct Neon Connection

If Neon provides `DATABASE_URL` instead, update `src/lib/db.ts`:

```typescript
// Change import
import { neon } from '@neondatabase/serverless';

// Update connection
const sql = neon(process.env.DATABASE_URL!);
```

But with current setup, **no changes needed** - `@vercel/postgres` handles it!

## Local Development with Neon

### Option 1: Use Neon Database (Recommended)

```bash
# Copy .env.local.example to .env.local
cp .env.local.example .env.local

# Get connection strings from Vercel Dashboard
# Vercel → Your Project → Settings → Environment Variables
# Click "Show" to reveal values

# Add to .env.local
POSTGRES_URL="your-neon-connection-string"
# ... (other variables)
```

### Option 2: Local Postgres

If you prefer local development database:

```bash
# Install PostgreSQL locally
# Create database
createdb qsi_scorecard_local

# Run schema
psql qsi_scorecard_local < schema.sql

# Update .env.local
POSTGRES_URL="postgresql://localhost:5432/qsi_scorecard_local"
```

## Production Checklist

- [ ] Neon database created and connected to Vercel
- [ ] Schema SQL executed successfully
- [ ] Environment variables visible in Vercel settings
- [ ] Application deployed to Vercel
- [ ] Test quiz flow end-to-end
- [ ] Verify data appears in database
- [ ] Update WhatsApp phone number in `src/lib/whatsapp.ts`
- [ ] Test WhatsApp link on mobile device
- [ ] Set up custom domain (optional)
- [ ] Configure Neon for production (upgrade from free tier if needed)

## Next Steps

1. **Monitor Database Usage**: Check Neon dashboard for:
   - Number of leads captured
   - Storage usage
   - Query performance

2. **Optimize if Needed**:
   - Add database indexes (already in schema.sql)
   - Enable Neon autoscaling for traffic spikes
   - Set up database backups

3. **Add Admin Dashboard** (Future):
   - View recent leads
   - Export to CSV
   - Filter by tier/date/business type

## Support

- **Neon Docs**: https://neon.tech/docs
- **Vercel Docs**: https://vercel.com/docs/storage/vercel-postgres
- **@vercel/postgres Docs**: https://vercel.com/docs/storage/vercel-postgres/sdk

## Cost Estimation

### Neon Free Tier
- 0.5 GB storage
- Compute: 191.9 hours/month active time
- **Good for**: Testing, low-traffic MVP

### Neon Pro (if needed)
- Starting at $19/month
- More storage & compute
- No pause on inactivity
- **Good for**: Production traffic, always-on

**Current app should work fine on free tier for initial testing!**
