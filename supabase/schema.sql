-- Learnin' Japan Database Schema
-- Run this in Supabase SQL Editor after creating your project

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  current_day INTEGER DEFAULT 1,
  streak_days INTEGER DEFAULT 0,
  last_activity_date DATE
);

-- Day completions
CREATE TABLE day_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  day INTEGER NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  UNIQUE(user_id, day)
);

-- SRS items
CREATE TABLE srs_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  item_key TEXT NOT NULL,
  interval_days INTEGER DEFAULT 1,
  next_review DATE NOT NULL DEFAULT CURRENT_DATE,
  review_count INTEGER DEFAULT 0,
  last_review DATE,
  UNIQUE(user_id, item_key)
);

-- Mistakes
CREATE TABLE mistakes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  item_key TEXT NOT NULL,
  puzzle_type TEXT NOT NULL,
  user_answer TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  prompt TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_day_completions_user ON day_completions(user_id);
CREATE INDEX idx_srs_items_user_review ON srs_items(user_id, next_review);
CREATE INDEX idx_mistakes_user ON mistakes(user_id);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE day_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE srs_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE mistakes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own completions" ON day_completions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own completions" ON day_completions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own completions" ON day_completions FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own srs" ON srs_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own srs" ON srs_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own srs" ON srs_items FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own mistakes" ON mistakes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own mistakes" ON mistakes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own mistakes" ON mistakes FOR DELETE USING (auth.uid() = user_id);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
