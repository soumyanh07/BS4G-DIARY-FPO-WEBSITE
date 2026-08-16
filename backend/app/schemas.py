from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator


RequirementStatus = Literal[
    "new",
    "contacted",
    "fulfilled",
    "cancelled",
]


class RequirementCreate(BaseModel):
    name: str = Field(
        ...,
        min_length=2,
        max_length=100,
    )

    contact: str = Field(
        ...,
        min_length=10,
        max_length=20,
    )

    qty_litres: float = Field(
        ...,
        gt=0,
        le=9999,
    )

    location: str = Field(
        ...,
        min_length=2,
        max_length=200,
    )

    note: str | None = Field(
        default=None,
        max_length=1000,
    )

    @field_validator("name", "location")
    @classmethod
    def validate_text_fields(cls, value: str) -> str:
        value = value.strip()

        if not value:
            raise ValueError("This field cannot be empty")

        return value

    @field_validator("contact")
    @classmethod
    def validate_contact(cls, value: str) -> str:
        cleaned = (
            value
            .replace(" ", "")
            .replace("-", "")
            .replace("+", "")
        )

        if not cleaned.isdigit():
            raise ValueError(
                "Contact must contain a valid phone number"
            )

        if len(cleaned) < 10 or len(cleaned) > 15:
            raise ValueError(
                "Contact must be between 10 and 15 digits"
            )

        return value.strip()


class RequirementResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int
    name: str
    contact: str
    qty_litres: float
    location: str
    note: str | None

    status: RequirementStatus

    submitted_at: datetime
    updated_at: datetime
    contacted_at: datetime | None


class RequirementStatusUpdate(BaseModel):
    status: RequirementStatus


class TeamLoginRequest(BaseModel):
    passcode: str = Field(
        ...,
        min_length=1,
        max_length=200,
    )


class TeamLoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"