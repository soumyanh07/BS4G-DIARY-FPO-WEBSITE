from sqlalchemy import create_engine, text

engine = create_engine(
    "postgresql://postgres:1234@localhost:5432/bs4g_dairy"
)

with engine.connect() as connection:
    connection.execute(
        text(
            """
            ALTER TABLE requirements
            ADD COLUMN IF NOT EXISTS status VARCHAR(20)
            NOT NULL DEFAULT 'new';

            ALTER TABLE requirements
            ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ
            NOT NULL DEFAULT NOW();

            ALTER TABLE requirements
            ADD COLUMN IF NOT EXISTS contacted_at TIMESTAMPTZ
            NULL;
            """
        )
    )

    connection.commit()

    print("Database schema updated successfully.")