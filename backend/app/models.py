from sqlalchemy import Column, DateTime, Integer, Numeric, String, Text, func
from app.database import Base


class Requirement(Base):
    __tablename__ = "requirements"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    name = Column(
        String(100),
        nullable=False,
    )

    contact = Column(
        String(20),
        nullable=False,
    )

    qty_litres = Column(
        Numeric(6, 2),
        nullable=False,
    )

    location = Column(
        String(200),
        nullable=False,
    )

    note = Column(
        Text,
        nullable=True,
    )

    status = Column(
        String(20),
        nullable=False,
        default="new",
        server_default="new",
        index=True,
    )

    submitted_at = Column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )

    contacted_at = Column(
        DateTime(timezone=True),
        nullable=True,
    )