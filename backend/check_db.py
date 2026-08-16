from sqlalchemy import create_engine, text

engine = create_engine(
    "postgresql://postgres:1234@localhost:5432/bs4g_dairy"
)

with engine.connect() as connection:
    result = connection.execute(
        text(
            """
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name = 'requirements'
            ORDER BY ordinal_position
            """
        )
    )

    print("Columns:")
    for row in result:
        print("-", row[0])

    print("\nExisting requirements:")

    result = connection.execute(
        text(
            """
            SELECT id, name, status, updated_at, contacted_at
            FROM requirements
            ORDER BY id
            """
        )
    )

    for row in result:
        print(row)