-- Добавление subscription_tier для тарифных планов
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'subscription_tier'
  ) THEN
    ALTER TABLE users ADD COLUMN subscription_tier TEXT NOT NULL DEFAULT 'free';
  END IF;
END $$;

-- Добавление проверки на допустимые значения subscription_tier
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'users_subscription_tier_check'
  ) THEN
    ALTER TABLE users ADD CONSTRAINT users_subscription_tier_check
    CHECK (subscription_tier IN ('free', 'pro', 'premium'));
  END IF;
END $$;
