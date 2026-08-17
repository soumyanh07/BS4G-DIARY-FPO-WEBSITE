from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


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

    @field_validator("contact")
    @classmethod
    def validate_contact(cls, value: str) -> str:
        cleaned = (
            value.replace(" ", "")
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
    customer_id: int | None = None
    name: str
    contact: str
    qty_litres: float
    location: str
    note: str | None
    status: str
    submitted_at: datetime
    updated_at: datetime
    contacted_at: datetime | None


class RequirementStatusUpdate(BaseModel):
    status: str = Field(
        ...,
        min_length=1,
        max_length=20,
    )

    @field_validator("status")
    @classmethod
    def validate_status(cls, value: str) -> str:
        allowed_statuses = {
            "new",
            "contacted",
            "confirmed",
            "delivered",
            "cancelled",
        }

        cleaned = value.strip().lower()

        if cleaned not in allowed_statuses:
            raise ValueError(
                "Invalid status. Allowed values: "
                "new, contacted, confirmed, delivered, cancelled"
            )

        return cleaned


class TeamLoginRequest(BaseModel):
    passcode: str = Field(
        ...,
        min_length=1,
        max_length=200,
    )


class TeamLoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class CustomerRegisterRequest(BaseModel):
    name: str = Field(
        ...,
        min_length=2,
        max_length=100,
    )

    email: str = Field(
        ...,
        min_length=5,
        max_length=150,
    )

    contact: str = Field(
        ...,
        min_length=10,
        max_length=20,
    )

    password: str = Field(
        ...,
        min_length=8,
        max_length=128,
    )

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        cleaned = value.strip()

        if not cleaned:
            raise ValueError("Name is required")

        return cleaned

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        cleaned = value.strip().lower()

        if "@" not in cleaned or "." not in cleaned.split("@")[-1]:
            raise ValueError("Enter a valid email address")

        return cleaned

    @field_validator("contact")
    @classmethod
    def validate_customer_contact(cls, value: str) -> str:
        cleaned = (
            value.replace(" ", "")
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


class CustomerLoginRequest(BaseModel):
    email: str = Field(
        ...,
        min_length=5,
        max_length=150,
    )

    password: str = Field(
        ...,
        min_length=1,
        max_length=128,
    )

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return value.strip().lower()


class CustomerLoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class CustomerResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int
    name: str
    email: str
    contact: str
    created_at: datetime


class CustomerProfileResponse(CustomerResponse):
    total_requirements: int = 0
    total_requested_litres: float = 0


class CustomerRequirementResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int
    customer_id: int | None
    name: str
    contact: str
    qty_litres: float
    location: str
    note: str | None
    status: str
    submitted_at: datetime
    updated_at: datetime
    contacted_at: datetime | None