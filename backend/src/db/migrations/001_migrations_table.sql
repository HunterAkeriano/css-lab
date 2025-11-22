-- Таблица для отслеживания выполненных миграций
CREATE TABLE IF NOT EXISTS schema_migrations (
  version TEXT PRIMARY KEY,
  executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
