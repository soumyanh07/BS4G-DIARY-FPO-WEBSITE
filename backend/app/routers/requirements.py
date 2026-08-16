import csv
import io
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import StreamingResponse
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth import require_team
from app.database import get_db
from app.models import Requirement
from app.schemas import (
    RequirementCreate,
    RequirementResponse,
    RequirementStatusUpdate,
)


router = APIRouter(
    prefix="/api/requirements",
    tags=["Requirements"],
)


@router.post(
    "",
    response_model=RequirementResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_requirement(
    data: RequirementCreate,
    db: Session = Depends(get_db),
):
    requirement = Requirement(
        name=data.name.strip(),
        contact=data.contact.strip(),
        qty_litres=data.qty_litres,
        location=data.location.strip(),
        note=data.note.strip() if data.note else None,
        status="new",
    )

    db.add(requirement)
    db.commit()
    db.refresh(requirement)

    return requirement


@router.get(
    "",
    response_model=list[RequirementResponse],
)
def get_requirements(
    db: Session = Depends(get_db),
    _: dict = Depends(require_team),
):
    statement = (
        select(Requirement)
        .order_by(Requirement.submitted_at.desc())
    )

    return list(
        db.scalars(statement).all()
    )


@router.get(
    "/export",
)
def export_requirements(
    db: Session = Depends(get_db),
    _: dict = Depends(require_team),
):
    statement = (
        select(Requirement)
        .order_by(Requirement.submitted_at.desc())
    )

    requirements = list(
        db.scalars(statement).all()
    )

    output = io.StringIO()

    writer = csv.writer(output)

    writer.writerow(
        [
            "ID",
            "Name",
            "Contact",
            "Quantity (Litres/Day)",
            "Location",
            "Note",
            "Status",
            "Submitted At",
            "Updated At",
            "Contacted At",
        ]
    )

    for item in requirements:
        writer.writerow(
            [
                item.id,
                item.name,
                item.contact,
                item.qty_litres,
                item.location,
                item.note or "",
                item.status,
                item.submitted_at.isoformat(),
                item.updated_at.isoformat(),
                (
                    item.contacted_at.isoformat()
                    if item.contacted_at
                    else ""
                ),
            ]
        )

    output.seek(0)

    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={
            "Content-Disposition": (
                "attachment; "
                "filename=bs4g_requirements.csv"
            )
        },
    )


@router.get(
    "/{requirement_id}",
    response_model=RequirementResponse,
)
def get_requirement(
    requirement_id: int,
    db: Session = Depends(get_db),
    _: dict = Depends(require_team),
):
    requirement = db.get(
        Requirement,
        requirement_id,
    )

    if requirement is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Requirement not found",
        )

    return requirement


@router.patch(
    "/{requirement_id}/status",
    response_model=RequirementResponse,
)
def update_requirement_status(
    requirement_id: int,
    data: RequirementStatusUpdate,
    db: Session = Depends(get_db),
    _: dict = Depends(require_team),
):
    requirement = db.get(
        Requirement,
        requirement_id,
    )

    if requirement is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Requirement not found",
        )

    requirement.status = data.status

    if data.status == "contacted":
        requirement.contacted_at = datetime.now(timezone.utc)

    elif data.status == "new":
        requirement.contacted_at = None

    requirement.updated_at = datetime.now(timezone.utc)

    db.commit()
    db.refresh(requirement)

    return requirement