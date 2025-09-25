from pydantic import BaseModel, EmailStr

class FamiliarBase(BaseModel):
    id_familiar: int
    nombre: str
    correo: str
    tipo: str   

    class Config:
        orm_mode = True


class FamiliarCreate(BaseModel):
    nombre: str
    correo: str
    id_info: int   


class FamiliarResponse(BaseModel):
    id_familiar: int
    nombre: str
    correo: str
    tipo: str   # 👈 devolvemos nombre de la relación

    class Config:
        orm_mode = True