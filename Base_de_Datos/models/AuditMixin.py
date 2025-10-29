from sqlalchemy import Column, DateTime, String, func

class AuditMixin:
    creado_en = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    actualizado_en = Column(DateTime(timezone=True), onupdate=func.now())
    eliminado_en = Column(DateTime(timezone=True), nullable=True)

