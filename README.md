# THE PRODUCE RELIABILITY SCORECARD™

A mobile-first web application that helps produce buyers diagnose supply chain reliability issues through an interactive quiz. Built with Next.js 14, TypeScript, Tailwind CSS, and Vercel Postgres.

## Features

- **10-Question Quiz Flow**: Interactive assessment covering 5 key reliability categories
- **Real-Time Scoring**: Intelligent algorithm that calculates scores and determines tier classifications
- **Personalized Results**: Custom recommendations based on weakest categories
- **Lead Capture**: Integrated form for business information collection
- **WhatsApp Integration**: Direct messaging CTA with pre-filled messages
- **Mobile-First Design**: Optimized for mobile devices with produce-themed aesthetics
- **Database Storage**: Full lead and response tracking with Vercel Postgres

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Vercel Postgres
- **Validation**: Zod
- **Deployment**: Vercel
- **Font**: Inter & Poppins (Google Fonts)

## Project Structure

```
qsi-leadgenwebapp/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx           # Landing page
│   │   ├── quiz/page.tsx      # Quiz flow
│   │   ├── results/page.tsx   # Results display
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   └── api/               # API routes
│   │       ├── submit-quiz/   # Quiz submission endpoint
│   │       └── get-results/   # Results retrieval endpoint
│   ├── components/            # React components
│   │   ├── landing/          # Landing page components
│   │   ├── quiz/             # Quiz flow components
│   │   ├── results/          # Results page components
│   │   └── ui/               # Reusable UI components
│   ├── lib/                  # Core business logic
│   │   ├── questions.ts      # Quiz questions data
│   │   ├── scoring.ts        # Scoring algorithm
│   │   ├── tiers.ts          # Tier definitions
│   │   ├── validations.ts    # Zod schemas
│   │   ├── db.ts             # Database helpers
│   │   └── whatsapp.ts       # WhatsApp link generator
│   └── types/                # TypeScript type definitions
├── public/                   # Static assets
├── schema.sql               # Database schema
└── masterplan.md            # Project masterplan
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Vercel account
- Basic knowledge of Next.js and React

### 1. Clone and Install

```bash
cd qsi-leadgenwebapp
npm install
```

### 2. Set Up Database

#### Option A: Neon via Vercel Marketplace (Recommended)

1. Go to [Vercel](https://vercel.com) and create a new project
2. Navigate to the "Storage" tab
3. Click "Create Database" and select **Neon** (Serverless Postgres)
4. Vercel will automatically add environment variables to your project
5. For local development, create a `.env.local` file:

```bash
cp .env.local.example .env.local
```

6. Copy the connection strings from Vercel → Settings → Environment Variables into `.env.local`

**Note:** The `@vercel/postgres` package we're using is fully compatible with Neon!

#### Option B: Local Postgres

If you prefer local development:

```bash
# Install PostgreSQL locally
# Then create a database
createdb qsi_scorecard

# Update .env.local with your local connection string
POSTGRES_URL="postgresql://localhost:5432/qsi_scorecard"
```

### 3. Run Database Migration

Execute the schema SQL file to create the necessary tables:

**If using Neon (Recommended):**
1. In Vercel Dashboard, click "Manage Database" on your Neon database
2. This opens Neon Console → Go to SQL Editor
3. Copy contents of `schema.sql` and paste into the editor
4. Click "Run" to execute

**If using local Postgres:**
```bash
psql qsi_scorecard < schema.sql
```

**See DEPLOYMENT_GUIDE.md for detailed instructions!**

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Database Schema

The application uses two main tables:

### `leads` Table
Stores user/lead information:
- Contact details (email, phone)
- Business information (type, spend, frequency, location)
- Pain points
- Session tracking

### `quiz_responses` Table
Stores quiz answers and calculated scores:
- Raw answers (JSONB)
- Category scores (5 fields, 0-20 each)
- Master score (0-100)
- Tier classification
- Recommendations (JSONB)

## Scoring System

### Question Scoring
- Each question has 4 options (1-4 scale)
- Normalized to 0-10 points per question
  - 1 (worst) = 0 points
  - 2 = 3.33 points
  - 3 = 6.67 points
  - 4 (best) = 10 points

### Category Scoring
- 2 questions per category = 0-20 points per category
- 5 categories total = 100 points maximum

### Tier Classifications
- **80-100**: High-Performance Supplier
- **60-79**: Mostly Reliable Supplier
- **40-59**: At-Risk Supplier
- **0-39**: Unstable Supplier

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables:
   - Add all Postgres environment variables from your Vercel Postgres database
4. Deploy!

Vercel will automatically:
- Build your Next.js application
- Set up serverless functions for API routes
- Connect to your Postgres database
- Provide a production URL

### Environment Variables

Required environment variables:
- `POSTGRES_URL` - Main database connection string
- `POSTGRES_PRISMA_URL` - Prisma-compatible connection string (pooled)
- `POSTGRES_URL_NON_POOLING` - Direct connection string (non-pooled)
- `POSTGRES_USER` - Database user
- `POSTGRES_HOST` - Database host
- `POSTGRES_PASSWORD` - Database password
- `POSTGRES_DATABASE` - Database name

## Customization

### Update WhatsApp Phone Number

In `src/lib/whatsapp.ts`, update the `DEFAULT_PHONE` constant:

```typescript
const DEFAULT_PHONE = 'YOUR_PHONE_NUMBER';
```

### Modify Quiz Questions

Edit `src/lib/questions.ts` to customize questions, categories, or options.

### Adjust Scoring Logic

Modify `src/lib/scoring.ts` to change:
- Score normalization
- Tier thresholds
- Recommendation logic

### Customize Theme Colors

Edit `tailwind.config.ts` to change:
- Primary colors (greens)
- Earth tones
- Accent colors

## Development Notes

### Key Files

1. **`src/lib/scoring.ts`** - Core scoring algorithm
2. **`src/lib/questions.ts`** - Quiz questions and options
3. **`src/app/api/submit-quiz/route.ts`** - Main API endpoint
4. **`src/components/quiz/QuizContainer.tsx`** - Quiz state management
5. **`src/app/results/page.tsx`** - Results display page

### Local Storage

Quiz answers are automatically saved to localStorage to prevent loss on page refresh. Storage is cleared after successful submission.

## Testing the Application

### Manual Testing Flow

1. **Landing Page**
   - Visit http://localhost:3000
   - Click "Start the Scorecard"

2. **Quiz Flow**
   - Answer all 10 questions
   - Test navigation (Previous/Next buttons)
   - Verify progress bar updates

3. **Lead Capture**
   - Fill out business information
   - Test validation (email or phone required)
   - Submit form

4. **Results Page**
   - Verify score animation
   - Check tier classification
   - Review category breakdown
   - Test WhatsApp CTA link

### Database Verification

Query the database to verify data storage:

```sql
-- View all leads
SELECT * FROM leads ORDER BY created_at DESC LIMIT 10;

-- View all quiz responses with scores
SELECT * FROM quiz_responses ORDER BY created_at DESC LIMIT 10;

-- Check tier distribution
SELECT tier, COUNT(*) FROM quiz_responses GROUP BY tier;
```

## Future Enhancements

- [ ] Admin dashboard for lead management
- [ ] CSV export functionality
- [ ] A/B testing for headlines and CTAs
- [ ] Re-test feature (track improvement over time)
- [ ] PDF report generation
- [ ] Multi-language support
- [ ] Email automation integration
- [ ] Analytics dashboard

## Support

For issues or questions:
1. Check the masterplan.md for design decisions
2. Review the plan file in .claude/plans/
3. Check Vercel deployment logs for errors

## License

Proprietary - QSI

## Credits

Built with Claude Code following the masterplan specifications.
