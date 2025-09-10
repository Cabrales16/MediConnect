from pydantic import BaseModel

class ErrorBase(BaseModel):
    mensaje: str

class ErrorCreate(ErrorBase):
    id_usuario: int

class ErrorResponse(ErrorBase):
    id: int
    id_usuario: int

    class Config:
        from_attributes = True  
