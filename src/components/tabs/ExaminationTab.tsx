'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useForm } from '@/contexts/FormContext'
import { Stethoscope, Activity, Eye } from 'lucide-react'

const generalExaminationFindings = [
  'Well-appearing',
  'Ill-appearing',
  'Distressed',
  'Pale',
  'Cyanotic',
  'Jaundiced',
  'Dehydrated',
  'Edematous',
  'Lymphadenopathy',
  'Clubbing',
  'Rash/Skin lesions',
  'Fever',
]

const systemExaminationFindings = [
  // Cardiovascular
  'Regular heart rate and rhythm',
  'Irregular heart rate',
  'Heart murmur',
  'Gallop sounds',
  'Peripheral edema',
  'JVD (Jugular venous distension)',
  
  // Respiratory
  'Clear lung fields',
  'Wheezing',
  'Crackles/Rales',
  'Rhonchi',
  'Decreased breath sounds',
  'Pleural friction rub',
  
  // Abdominal
  'Soft, non-tender abdomen',
  'Abdominal tenderness',
  'Abdominal distension',
  'Hepatomegaly',
  'Splenomegaly',
  'Bowel sounds present',
  'Bowel sounds absent',
  
  // Neurological
  'Alert and oriented',
  'Altered mental status',
  'Focal neurological deficits',
  'Normal reflexes',
  'Abnormal reflexes',
  'Cranial nerve deficits',
]

export default function ExaminationTab() {
  const { formData, updateExamination } = useForm()
  const { examination } = formData

  const handleVitalChange = (vital: string, value: string) => {
    updateExamination({
      vitals: {
        ...examination.vitals,
        [vital]: value,
      },
    })
  }

  const handleGeneralExamToggle = (finding: string, checked: boolean) => {
    const updatedFindings = checked
      ? [...examination.generalExamination, finding]
      : examination.generalExamination.filter(f => f !== finding)
    
    updateExamination({ generalExamination: updatedFindings })
  }

  const handleSystemExamToggle = (finding: string, checked: boolean) => {
    const updatedFindings = checked
      ? [...examination.systemExamination, finding]
      : examination.systemExamination.filter(f => f !== finding)
    
    updateExamination({ systemExamination: updatedFindings })
  }

  return (
    <div className="space-y-6">
      {/* Vital Signs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Vital Signs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bp">Blood Pressure (mmHg)</Label>
              <Input
                id="bp"
                placeholder="e.g., 120/80"
                value={examination.vitals.bp}
                onChange={(e) => handleVitalChange('bp', e.target.value)}
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hr">Heart Rate (bpm)</Label>
              <Input
                id="hr"
                type="number"
                placeholder="e.g., 72"
                value={examination.vitals.hr}
                onChange={(e) => handleVitalChange('hr', e.target.value)}
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rr">Respiratory Rate (per min)</Label>
              <Input
                id="rr"
                type="number"
                placeholder="e.g., 16"
                value={examination.vitals.rr}
                onChange={(e) => handleVitalChange('rr', e.target.value)}
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="temp">Temperature (°C)</Label>
              <Input
                id="temp"
                type="number"
                step="0.1"
                placeholder="e.g., 36.5"
                value={examination.vitals.temp}
                onChange={(e) => handleVitalChange('temp', e.target.value)}
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="spo2">SpO₂ (%)</Label>
              <Input
                id="spo2"
                type="number"
                placeholder="e.g., 98"
                value={examination.vitals.spo2}
                onChange={(e) => handleVitalChange('spo2', e.target.value)}
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bmi">BMI (kg/m²)</Label>
              <Input
                id="bmi"
                type="number"
                step="0.1"
                placeholder="e.g., 24.5"
                value={examination.vitals.bmi}
                onChange={(e) => handleVitalChange('bmi', e.target.value)}
                className="h-12 text-base"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* General Examination */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            General Examination
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {generalExaminationFindings.map((finding) => (
              <div key={finding} className="flex items-center space-x-3">
                <Checkbox
                  id={`general-${finding}`}
                  checked={examination.generalExamination.includes(finding)}
                  onCheckedChange={(checked) => 
                    handleGeneralExamToggle(finding, checked as boolean)
                  }
                  className="h-5 w-5"
                />
                <Label htmlFor={`general-${finding}`} className="text-base font-medium cursor-pointer">
                  {finding}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Examination */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            System Examination
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemExaminationFindings.map((finding) => (
              <div key={finding} className="flex items-center space-x-3">
                <Checkbox
                  id={`system-${finding}`}
                  checked={examination.systemExamination.includes(finding)}
                  onCheckedChange={(checked) => 
                    handleSystemExamToggle(finding, checked as boolean)
                  }
                  className="h-5 w-5"
                />
                <Label htmlFor={`system-${finding}`} className="text-base font-medium cursor-pointer">
                  {finding}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Examination Summary */}
      {(Object.values(examination.vitals).some(v => v) || 
        examination.generalExamination.length > 0 || 
        examination.systemExamination.length > 0) && (
        <Card className="bg-purple-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800">Examination Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Vitals Summary */}
            {Object.values(examination.vitals).some(v => v) && (
              <div>
                <h4 className="font-medium text-purple-800 mb-2">Vital Signs:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  {examination.vitals.bp && <span>BP: {examination.vitals.bp}</span>}
                  {examination.vitals.hr && <span>HR: {examination.vitals.hr} bpm</span>}
                  {examination.vitals.rr && <span>RR: {examination.vitals.rr}/min</span>}
                  {examination.vitals.temp && <span>Temp: {examination.vitals.temp}°C</span>}
                  {examination.vitals.spo2 && <span>SpO₂: {examination.vitals.spo2}%</span>}
                  {examination.vitals.bmi && <span>BMI: {examination.vitals.bmi}</span>}
                </div>
              </div>
            )}

            {/* General Examination Summary */}
            {examination.generalExamination.length > 0 && (
              <div>
                <h4 className="font-medium text-purple-800 mb-2">General Examination:</h4>
                <div className="flex flex-wrap gap-2">
                  {examination.generalExamination.map((finding) => (
                    <span
                      key={finding}
                      className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                    >
                      {finding}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* System Examination Summary */}
            {examination.systemExamination.length > 0 && (
              <div>
                <h4 className="font-medium text-purple-800 mb-2">System Examination:</h4>
                <div className="flex flex-wrap gap-2">
                  {examination.systemExamination.map((finding) => (
                    <span
                      key={finding}
                      className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                    >
                      {finding}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}