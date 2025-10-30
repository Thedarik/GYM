-- Oddiy subscriptions jadvali (RLS policiesiz)
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  students INTEGER DEFAULT 0,
  total_students INTEGER DEFAULT 0,
  certificates INTEGER DEFAULT 0,
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE DEFAULT CURRENT_DATE,
  status VARCHAR(50) DEFAULT 'active',
  progress INTEGER DEFAULT 0,
  duration VARCHAR(100),
  level VARCHAR(50) DEFAULT 'Beginner',
  category VARCHAR(255) DEFAULT 'General',
  instructor VARCHAR(255) DEFAULT 'Admin User',
  last_activity VARCHAR(100) DEFAULT 'Hozir',
  thumbnail VARCHAR(500) DEFAULT '/placeholder.svg?height=60&width=60',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index qo'shish
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);

-- RLS o'chb turishi mumkin, uni o'chirish
ALTER TABLE public.subscriptions DISABLE ROW LEVEL SECURITY;

-- updated_at avtomatik yangilanish
CREATE OR REPLACE FUNCTION update_subscriptions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_subscriptions_updated_at();

