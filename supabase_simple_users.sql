-- Oddiy users jadvali
CREATE TABLE IF NOT EXISTS public.users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  course VARCHAR(255),
  progress INTEGER DEFAULT 0,
  enroll_date DATE DEFAULT CURRENT_DATE,
  last_activity VARCHAR(100) DEFAULT 'Hozir',
  status VARCHAR(50) DEFAULT 'active',
  certificates INTEGER DEFAULT 0,
  attendance INTEGER DEFAULT 0,
  avatar VARCHAR(500) DEFAULT '/placeholder.svg?height=40&width=40',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index qo'shish
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_status ON public.users(status);

-- RLS o'chirish (yoki barcha operatsiyalarga ruxsat berish)
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Agar RLS ochilgan bo'lsa, quyidagi policy'lar bilan ruxsat berish:

-- SELECT uchun policy
DROP POLICY IF EXISTS "Allow all operations on users" ON public.users;
CREATE POLICY "Allow all operations on users"
ON public.users
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- updated_at avtomatik yangilanish
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

