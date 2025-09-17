'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from '@/contexts/FormContext'
import { Stethoscope, Activity, Eye } from 'lucide-react'

const generalExaminationFindings = [
  'Pallor',
  'Icterus',
  'Cyanosis',
  'Edema',
  'Lymphadenopathy',
]



export default function ExaminationTab() {
  const { formData, updateExamination } = useForm()
  const { examination } = formData

  const handleVitalChange = (field: string, value: string) => {
    updateExamination({
      vitals: {
        ...examination.vitals,
        [field]: value,
      },
    })
  }

  const handleGeneralExamToggle = (finding: string, checked: boolean) => {
    const updatedFindings = checked
      ? [...examination.generalExamination, finding]
      : examination.generalExamination.filter((f) => f !== finding)
    
    updateExamination({ generalExamination: updatedFindings })
  }

  const handleSystemExamToggle = (system: string, field: string, checked: boolean) => {
    updateExamination({
      systemExamination: {
        ...examination.systemExamination,
        [system]: {
          ...examination.systemExamination[system as keyof typeof examination.systemExamination],
          [field]: checked,
        },
      },
    })
  }

  const handleSystemExamNotes = (system: string, notes: string) => {
    updateExamination({
      systemExamination: {
        ...examination.systemExamination,
        [system]: {
          ...examination.systemExamination[system as keyof typeof examination.systemExamination],
          notes,
        },
      },
    })
  }

  const handleGCSChange = (value: string) => {
    updateExamination({
      systemExamination: {
        ...examination.systemExamination,
        neuro: {
          ...examination.systemExamination.neuro,
          gcs: value,
        },
      },
    })
  }

  const handleUterineSizeChange = (value: string) => {
    updateExamination({
      systemExamination: {
        ...examination.systemExamination,
        guObg: {
          ...examination.systemExamination.guObg,
          uterineSize: value,
        },
      },
    })
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
          
          {/* Other Examination Text Field */}
          <div className="mt-6">
            <Label htmlFor="otherExamination" className="text-base font-medium">
              Other Examination Findings
            </Label>
            <Input
              id="otherExamination"
              value={examination.otherExamination}
              onChange={(e) => updateExamination({ otherExamination: e.target.value })}
              placeholder="Describe any other examination findings not listed above..."
              className="mt-2 h-12 text-base"
            />
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
        <CardContent className="space-y-6">
          {/* Respiratory System */}
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-lg mb-3 text-blue-700">Respiratory System</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="resp-normal"
                  checked={examination.systemExamination.respiratory.normal}
                  onCheckedChange={(checked) => 
                    handleSystemExamToggle('respiratory', 'normal', checked as boolean)
                  }
                />
                <Label htmlFor="resp-normal">Normal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="resp-wheeze"
                  checked={examination.systemExamination.respiratory.wheeze}
                  onCheckedChange={(checked) => 
                    handleSystemExamToggle('respiratory', 'wheeze', checked as boolean)
                  }
                />
                <Label htmlFor="resp-wheeze">Wheeze</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="resp-crepitations"
                  checked={examination.systemExamination.respiratory.crepitations}
                  onCheckedChange={(checked) => 
                    handleSystemExamToggle('respiratory', 'crepitations', checked as boolean)
                  }
                />
                <Label htmlFor="resp-crepitations">Crepitations</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="resp-reduced"
                  checked={examination.systemExamination.respiratory.reducedAirEntry}
                  onCheckedChange={(checked) => 
                    handleSystemExamToggle('respiratory', 'reducedAirEntry', checked as boolean)
                  }
                />
                <Label htmlFor="resp-reduced">Reduced Air Entry</Label>
              </div>
            </div>
            <div>
              <Label htmlFor="resp-notes">Additional Notes</Label>
              <Textarea
                id="resp-notes"
                value={examination.systemExamination.respiratory.notes}
                onChange={(e) => handleSystemExamNotes('respiratory', e.target.value)}
                placeholder="Additional respiratory examination findings..."
                className="mt-1"
              />
            </div>
          </div>

          {/* Cardiovascular System */}
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-lg mb-3 text-red-700">Cardiovascular System</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cardio-normal"
                  checked={examination.systemExamination.cardio.normal}
                  onCheckedChange={(checked) => 
                    handleSystemExamToggle('cardio', 'normal', checked as boolean)
                  }
                />
                <Label htmlFor="cardio-normal">Normal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cardio-murmur"
                  checked={examination.systemExamination.cardio.murmur}
                  onCheckedChange={(checked) => 
                    handleSystemExamToggle('cardio', 'murmur', checked as boolean)
                  }
                />
                <Label htmlFor="cardio-murmur">Murmur</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cardio-gallop"
                  checked={examination.systemExamination.cardio.gallop}
                  onCheckedChange={(checked) => 
                    handleSystemExamToggle('cardio', 'gallop', checked as boolean)
                  }
                />
                <Label htmlFor="cardio-gallop">Gallop</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cardio-edema"
                  checked={examination.systemExamination.cardio.pedalEdema}
                  onCheckedChange={(checked) => 
                    handleSystemExamToggle('cardio', 'pedalEdema', checked as boolean)
                  }
                />
                <Label htmlFor="cardio-edema">Pedal Edema</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cardio-jvp"
                  checked={examination.systemExamination.cardio.raisedJVP}
                  onCheckedChange={(checked) => 
                    handleSystemExamToggle('cardio', 'raisedJVP', checked as boolean)
                  }
                />
                <Label htmlFor="cardio-jvp">Raised JVP</Label>
              </div>
            </div>
            <div>
              <Label htmlFor="cardio-notes">Additional Notes</Label>
              <Textarea
                id="cardio-notes"
                value={examination.systemExamination.cardio.notes}
                onChange={(e) => handleSystemExamNotes('cardio', e.target.value)}
                placeholder="Additional cardiovascular examination findings..."
                className="mt-1"
              />
            </div>
          </div>

          {/* Abdominal System */}
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-lg mb-3 text-green-700">Abdominal System</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="abdomen-soft"
                  checked={examination.systemExamination.abdomen.soft}
                  onCheckedChange={(checked) => 
                    handleSystemExamToggle('abdomen', 'soft', checked as boolean)
                  }
                />
                <Label htmlFor="abdomen-soft">Soft</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="abdomen-tender"
                  checked={examination.systemExamination.abdomen.tender}
                  onCheckedChange={(checked) => 
                    handleSystemExamToggle('abdomen', 'tender', checked as boolean)
                  }
                />
                <Label htmlFor="abdomen-tender">Tender</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="abdomen-hepatomegaly"
                  checked={examination.systemExamination.abdomen.hepatomegaly}
                  onCheckedChange={(checked) => 
                    handleSystemExamToggle('abdomen', 'hepatomegaly', checked as boolean)
                  }
                />
                <Label htmlFor="abdomen-hepatomegaly">Hepatomegaly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="abdomen-splenomegaly"
                  checked={examination.systemExamination.abdomen.splenomegaly}
                  onCheckedChange={(checked) => 
                    handleSystemExamToggle('abdomen', 'splenomegaly', checked as boolean)
                  }
                />
                <Label htmlFor="abdomen-splenomegaly">Splenomegaly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="abdomen-ascites"
                  checked={examination.systemExamination.abdomen.ascites}
                  onCheckedChange={(checked) => 
                    handleSystemExamToggle('abdomen', 'ascites', checked as boolean)
                  }
                />
                <Label htmlFor="abdomen-ascites">Ascites</Label>
              </div>
            </div>
            <div>
              <Label htmlFor="abdomen-notes">Additional Notes</Label>
              <Textarea
                id="abdomen-notes"
                value={examination.systemExamination.abdomen.notes}
                onChange={(e) => handleSystemExamNotes('abdomen', e.target.value)}
                placeholder="Additional abdominal examination findings..."
                className="mt-1"
              />
            </div>
          </div>

          {/* Neurological System */}
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-lg mb-3 text-purple-700">Neurological System</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <div className="space-y-2">
                <Label htmlFor="neuro-gcs">GCS Score</Label>
                <Input
                  id="neuro-gcs"
                  value={examination.systemExamination.neuro.gcs}
                  onChange={(e) => handleGCSChange(e.target.value)}
                  placeholder="e.g., 15/15"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="neuro-focal"
                  checked={examination.systemExamination.neuro.focalDeficit}
                  onCheckedChange={(checked) => 
                    handleSystemExamToggle('neuro', 'focalDeficit', checked as boolean)
                  }
                />
                <Label htmlFor="neuro-focal">Focal Deficit</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="neuro-seizure"
                  checked={examination.systemExamination.neuro.seizureActivity}
                  onCheckedChange={(checked) => 
                    handleSystemExamToggle('neuro', 'seizureActivity', checked as boolean)
                  }
                />
                <Label htmlFor="neuro-seizure">Seizure Activity</Label>
              </div>
            </div>
            <div>
              <Label htmlFor="neuro-notes">Additional Notes</Label>
              <Textarea
                id="neuro-notes"
                value={examination.systemExamination.neuro.notes}
                onChange={(e) => handleSystemExamNotes('neuro', e.target.value)}
                placeholder="Additional neurological examination findings..."
                className="mt-1"
              />
            </div>
          </div>

          {/* Musculoskeletal System */}
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-lg mb-3 text-orange-700">Musculoskeletal System</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="msk-swelling"
                  checked={examination.systemExamination.msk.jointSwelling}
                  onCheckedChange={(checked) => 
                    handleSystemExamToggle('msk', 'jointSwelling', checked as boolean)
                  }
                />
                <Label htmlFor="msk-swelling">Joint Swelling</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="msk-tenderness"
                  checked={examination.systemExamination.msk.tenderness}
                  onCheckedChange={(checked) => 
                    handleSystemExamToggle('msk', 'tenderness', checked as boolean)
                  }
                />
                <Label htmlFor="msk-tenderness">Tenderness</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="msk-deformity"
                  checked={examination.systemExamination.msk.deformity}
                  onCheckedChange={(checked) => 
                    handleSystemExamToggle('msk', 'deformity', checked as boolean)
                  }
                />
                <Label htmlFor="msk-deformity">Deformity</Label>
              </div>
            </div>
            <div>
              <Label htmlFor="msk-notes">Additional Notes</Label>
              <Textarea
                id="msk-notes"
                value={examination.systemExamination.msk.notes}
                onChange={(e) => handleSystemExamNotes('msk', e.target.value)}
                placeholder="Additional musculoskeletal examination findings..."
                className="mt-1"
              />
            </div>
          </div>

          {/* GU/OBG System */}
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-lg mb-3 text-pink-700">GU/OBG System</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <div className="space-y-2">
                <Label htmlFor="guobg-uterine">Uterine Size</Label>
                <Input
                  id="guobg-uterine"
                  value={examination.systemExamination.guObg.uterineSize}
                  onChange={(e) => handleUterineSizeChange(e.target.value)}
                  placeholder="e.g., Normal size"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="guobg-discharge"
                  checked={examination.systemExamination.guObg.discharge}
                  onCheckedChange={(checked) => 
                    handleSystemExamToggle('guObg', 'discharge', checked as boolean)
                  }
                />
                <Label htmlFor="guobg-discharge">Discharge</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="guobg-pregnancy"
                  checked={examination.systemExamination.guObg.pregnancySigns}
                  onCheckedChange={(checked) => 
                    handleSystemExamToggle('guObg', 'pregnancySigns', checked as boolean)
                  }
                />
                <Label htmlFor="guobg-pregnancy">Pregnancy Signs</Label>
              </div>
            </div>
            <div>
              <Label htmlFor="guobg-notes">Additional Notes</Label>
              <Textarea
                id="guobg-notes"
                value={examination.systemExamination.guObg.notes}
                onChange={(e) => handleSystemExamNotes('guObg', e.target.value)}
                placeholder="Additional GU/OBG examination findings..."
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Examination Summary */}
      {(Object.values(examination.vitals).some(v => v) || 
        examination.generalExamination.length > 0 || 
        Object.values(examination.systemExamination).some(system => 
          typeof system === 'object' && (
            Object.values(system).some(value => 
              typeof value === 'boolean' ? value : (typeof value === 'string' && value)
            )
          )
        )) && (
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
            {Object.entries(examination.systemExamination).map(([systemName, systemData]) => {
              const hasFindings = Object.entries(systemData).some(([key, value]) => 
                key !== 'notes' && (typeof value === 'boolean' ? value : (typeof value === 'string' && value))
              )
              
              if (!hasFindings) return null
              
              return (
                <div key={systemName}>
                  <h4 className="font-medium text-purple-800 mb-2 capitalize">{systemName} System:</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(systemData).map(([key, value]) => {
                      if (key === 'notes' || !value) return null
                      
                      const displayKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
                      
                      return (
                        <span
                          key={key}
                          className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                        >
                          {typeof value === 'boolean' ? displayKey : `${displayKey}: ${value}`}
                        </span>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}
    </div>
  )
}