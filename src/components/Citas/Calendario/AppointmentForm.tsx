import React, { useState } from 'react';
import { CustomButton } from './CustomButton';
import { CustomInput } from './CustomInput';
import { CustomSelect } from './CustomSelect';

interface AppointmentFormProps {
  selectedDate: Date | null;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ selectedDate }) => {
  const [appointmentType, setAppointmentType] = useState('');
  const [hospital, setHospital] = useState('');
  const [specificTime, setSpecificTime] = useState('');
  const [hour, setHour] = useState('');
  const [period, setPeriod] = useState('A.M.');

  const handleSearch = () => {
    console.log({
      selectedDate,
      appointmentType,
      hospital,
      specificTime,
      hour,
      period
    });
    alert('Búsqueda realizada con los datos seleccionados');
  };

  return (
    <div className="w-full mt-6 bg-white rounded-lg shadow-md">
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CustomSelect
            placeholder="Cita / Visita"
            value={appointmentType}
            onChange={setAppointmentType}
            options={[
              { value: 'consulta', label: 'Consulta médica' },
              { value: 'revision', label: 'Revisión' },
              { value: 'cirugia', label: 'Cirugía' },
              { value: 'emergencia', label: 'Emergencia' },
              { value: 'seguimiento', label: 'Seguimiento' }
            ]}
          />

          <CustomSelect
            placeholder="Hospital de Registros"
            value={hospital}
            onChange={setHospital}
            options={[
              { value: 'hospital-general', label: 'Hospital General' },
              { value: 'clinica-santa-maria', label: 'Clínica Santa María' },
              { value: 'hospital-nacional', label: 'Hospital Nacional' },
              { value: 'centro-medico', label: 'Centro Médico' },
              { value: 'hospital-universitario', label: 'Hospital Universitario' }
            ]}
          />

          <CustomSelect
            placeholder="Hora específica"
            value={specificTime}
            onChange={setSpecificTime}
            options={[
              { value: '08:00', label: '08:00' },
              { value: '09:00', label: '09:00' },
              { value: '10:00', label: '10:00' },
              { value: '11:00', label: '11:00' },
              { value: '14:00', label: '14:00' },
              { value: '15:00', label: '15:00' },
              { value: '16:00', label: '16:00' },
              { value: '17:00', label: '17:00' }
            ]}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">
            Seleccionar hora:
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <CustomInput
                type="text"
                placeholder="8:15"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                className="w-20 text-center"
              />
              <CustomSelect
                placeholder="A.M."
                value={period}
                onChange={setPeriod}
                options={[
                  { value: 'A.M.', label: 'A.M.' },
                  { value: 'P.M.', label: 'P.M.' }
                ]}
                className="w-20"
              />
            </div>
            <CustomButton 
              onClick={handleSearch}
              className="px-6"
            >
              🔍 Buscar
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;