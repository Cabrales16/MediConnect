from pydantic import BaseModel, EmailStr

class FamiliarBase(BaseModel):
    nombre: str
    correo: EmailStr
    Telefono: str
    id_info: int  

class FamiliarCreate(FamiliarBase):
    pass

class FamiliarResponse(FamiliarBase):
    id_familiar: int 
    id_paciente: int
    class Config:
        from_attributes = True