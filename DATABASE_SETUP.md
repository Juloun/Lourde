# Database Setup Instructions

## Quick Setup (Recommended)

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new project
4. Wait for the project to be ready

### 2. Set Environment Variables
Create a `.env.local` file in your project root:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

You can find these values in your Supabase project dashboard under Settings > API.

### 3. Run Database Setup
1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the entire content from `scripts/setup-database.sql`
4. Click "Run" to execute the script

This will:
- Create all necessary tables
- Set up Row Level Security policies
- Insert sample product data
- Configure user authentication triggers

### 4. Verify Setup
After running the script, you should see these tables in your Database section:
- `profiles`
- `products` (with sample data)
- `orders`
- `order_items`
- `reviews`
- `wishlist`

## Manual Setup (Alternative)

If you prefer to set up tables individually:

1. Run `scripts/create-tables.sql` first
2. Then run `scripts/seed-products.sql`

## Troubleshooting

### Common Issues:

**"Could not find the table 'public.products'"**
- The database tables haven't been created yet
- Run the setup script in Supabase SQL Editor

**"Environment variables not found"**
- Make sure `.env.local` exists in your project root
- Restart your development server after adding environment variables

**"Permission denied"**
- Check that Row Level Security policies are properly set up
- Ensure you're using the correct API keys

### Demo Mode
The app works perfectly without a database connection using high-quality demo data. You'll see a notification when in demo mode.

## Features Available

### With Database:
- Live product inventory
- User authentication
- Order management
- Reviews and ratings
- Wishlist functionality

### Demo Mode:
- Full product catalog (10 sample products)
- Shopping cart functionality
- Product filtering and sorting
- Responsive design
- All UI components working

## Next Steps

Once your database is set up:
1. The app will automatically detect the connection
2. Demo mode notifications will disappear
3. All features will use live data
4. You can start adding real products through the database
