from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.auth import (
    create_customer_access_token,
    hash_password,
    require_customer,
    verify_password,
)
from app.database import get_db
from app.models import Customer, Requirement
from app.schemas import (
    CustomerLoginRequest,
    CustomerLoginResponse,
    CustomerProfileResponse,
    CustomerRegisterRequest,
    CustomerRequirementResponse,
)


router = APIRouter(
    prefix="/api/customer",
    tags=["Customer"],
)


# ---------------------------------------------------------
# CUSTOMER REGISTER
# ---------------------------------------------------------

@router.post(
    "/register",
    response_model=CustomerLoginResponse,
    status_code=status.HTTP_201_CREATED,
)
def customer_register(
    data: CustomerRegisterRequest,
    db: Session = Depends(get_db),
):
    email = data.email.strip().lower()
    contact = data.contact.strip()

    existing_email = db.scalar(
        select(Customer).where(
            Customer.email == email
        )
    )

    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email is already registered",
        )

    existing_contact = db.scalar(
        select(Customer).where(
            Customer.contact == contact
        )
    )

    if existing_contact:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Contact number is already registered",
        )

    customer = Customer(
        name=data.name.strip(),
        email=email,
        contact=contact,
        password_hash=hash_password(data.password),
        is_active=True,
    )

    db.add(customer)
    db.commit()
    db.refresh(customer)

    token = create_customer_access_token(
        customer.id
    )

    return CustomerLoginResponse(
        access_token=token,
        token_type="bearer",
    )


# ---------------------------------------------------------
# CUSTOMER LOGIN
# ---------------------------------------------------------

@router.post(
    "/login",
    response_model=CustomerLoginResponse,
)
def customer_login(
    data: CustomerLoginRequest,
    db: Session = Depends(get_db),
):
    email = data.email.strip().lower()

    customer = db.scalar(
        select(Customer).where(
            Customer.email == email
        )
    )

    if customer is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not customer.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Customer account is inactive",
        )

    if not verify_password(
        data.password,
        customer.password_hash,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    token = create_customer_access_token(
        customer.id
    )

    return CustomerLoginResponse(
        access_token=token,
        token_type="bearer",
    )


# ---------------------------------------------------------
# CUSTOMER PROFILE
# ---------------------------------------------------------

@router.get(
    "/profile",
    response_model=CustomerProfileResponse,
)
def customer_profile(
    auth: dict = Depends(require_customer),
    db: Session = Depends(get_db),
):
    customer_id = auth["customer_id"]

    customer = db.get(
        Customer,
        customer_id,
    )

    if customer is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found",
        )

    total_requirements = db.scalar(
        select(
            func.count(Requirement.id)
        ).where(
            Requirement.customer_id == customer_id
        )
    ) or 0

    total_requested_litres = db.scalar(
        select(
            func.coalesce(
                func.sum(Requirement.qty_litres),
                0,
            )
        ).where(
            Requirement.customer_id == customer_id
        )
    ) or 0

    return CustomerProfileResponse(
        id=customer.id,
        name=customer.name,
        email=customer.email,
        contact=customer.contact,
        created_at=customer.created_at,
        total_requirements=int(
            total_requirements
        ),
        total_requested_litres=float(
            total_requested_litres
        ),
    )


# ---------------------------------------------------------
# CUSTOMER REQUIREMENT HISTORY
# ---------------------------------------------------------

@router.get(
    "/requirements",
    response_model=list[CustomerRequirementResponse],
)
def customer_requirements(
    auth: dict = Depends(require_customer),
    db: Session = Depends(get_db),
):
    customer_id = auth["customer_id"]

    statement = (
        select(Requirement)
        .where(
            Requirement.customer_id == customer_id
        )
        .order_by(
            Requirement.submitted_at.desc()
        )
    )

    return list(
        db.scalars(statement).all()
    )