from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.hospitales import Hospital
from app.schemas.hospital import HospitalBase
from typing import List

def todos_los_hospitales(db: Session) -> List[HospitalBase]:
    return db.query(Hospital).all()