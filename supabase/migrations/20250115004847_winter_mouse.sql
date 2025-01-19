/*
  # Clean up unused database tables

  This migration safely removes redundant and unused tables from the database.

  1. Tables to be removed:
    - site_settings
    - navigation_items
    - translations
    - header_settings
    - header_menu_items
    - header_menu_translations

  2. Reason for removal:
    - These tables were added in later migrations but are not being used by the application
    - The navigation and translation functionality is handled directly in the code
    - Keeping unused tables increases database complexity unnecessarily
*/

-- Safely drop tables if they exist
DO $$ BEGIN
  -- Drop tables in correct order to handle dependencies
  DROP TABLE IF EXISTS translations CASCADE;
  DROP TABLE IF EXISTS navigation_items CASCADE;
  DROP TABLE IF EXISTS site_settings CASCADE;
  
  -- Drop header-related tables
  DROP TABLE IF EXISTS header_menu_translations CASCADE;
  DROP TABLE IF EXISTS header_menu_items CASCADE;
  DROP TABLE IF EXISTS header_settings CASCADE;
EXCEPTION
  WHEN undefined_table THEN
    NULL;
END $$;