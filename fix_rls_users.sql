-- Bu faylni Supabase SQL Editor'da RUN qiling
-- RLS muammosini hal qilish uchun

-- RLS'ni o'chirish
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Yoki agar RLS ochib turish kerak bo'lsa, policy qo'shing
-- ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Hamma operatsiyalarga ruxsat beruvchi policy
DROP POLICY IF EXISTS "Allow all operations on users" ON public.users;
CREATE POLICY "Allow all operations on users"
ON public.users
FOR ALL
TO public
USING (true)
WITH CHECK (true);






