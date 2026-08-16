from fastapi import APIRouter, HTTPException, status

from app.auth import (
    create_access_token,
    verify_passcode,
)
from app.schemas import (
    TeamLoginRequest,
    TeamLoginResponse,
)
from app.auth import PASSCODE_HASH


router = APIRouter(
    prefix="/api/team",
    tags=["Team"],
)


@router.post(
    "/login",
    response_model=TeamLoginResponse,
)
def team_login(
    data: TeamLoginRequest,
):
    if not verify_passcode(
        data.passcode,
        PASSCODE_HASH,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect team passcode",
        )

    token = create_access_token()

    return TeamLoginResponse(
        access_token=token,
        token_type="bearer",
    )