'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { useForm } from '@/contexts/FormContext'
import { Clock, Activity } from 'lucide-react'

const onsetOptions = [
  'Sudden (minutes)',
  'Acute (hours to days)',
  'Subacute (days to weeks)',
  'Chronic (weeks to months)',
  'Insidious (gradual onset)',
]

const durationOptions = [
  'Less than 1 hour',
  '1-6 hours',
  '6-24 hours',
  '1-3 days',
  '3-7 days',
  '1-4 weeks',
  '1-6 months',
  'More than 6 months',
]

const progressionOptions = [
  'Improving',
  'Stable/Static',
  'Worsening',
  'Fluctuating',
  'Progressive',
  'Episodic',
]

const associatedSymptoms = [
  'Fever/Chills',
  'Night sweats',
  'Weight loss',
  'Weight gain',
  'Loss of appetite',
  'Nausea/Vomiting',
  'Diarrhea',
  'Constipation',
  'Urinary symptoms',
  'Sleep disturbances',
  'Mood changes',
  'Cognitive changes',
  'Skin changes',
  'Visual changes',
  'Hearing changes',
  'Swelling',
  'Palpitations',
  'Syncope/Fainting',
]

export default function HistoryTab() {
  const { formData, updateHistory } = useForm()
  const { history } = formData

  const handleSelectChange = (field: string, value: string) => {
    updateHistory({ [field]: value })
  }

  const handleSymptomToggle = (symptom: string, checked: boolean) => {
    const updatedSymptoms = checked
      ? [...history.associatedSymptoms, symptom]
      : history.associatedSymptoms.filter(s => s !== symptom)
    
    updateHistory({ associatedSymptoms: updatedSymptoms })
  }

  return (
    <div className="space-y-6">
      {/* History of Present Illness */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            History of Present Illness
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="onset">Onset</Label>
              <Select value={history.onset} onValueChange={(value) => handleSelectChange('onset', value)}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select onset pattern" />
                </SelectTrigger>
                <SelectContent>
                  {onsetOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select value={history.duration} onValueChange={(value) => handleSelectChange('duration', value)}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="progression">Progression</Label>
              <Select value={history.progression} onValueChange={(value) => handleSelectChange('progression', value)}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select progression" />
                </SelectTrigger>
                <SelectContent>
                  {progressionOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Associated Symptoms */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Associated Symptoms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {associatedSymptoms.map((symptom) => (
              <div key={symptom} className="flex items-center space-x-3">
                <Checkbox
                  id={symptom}
                  checked={history.associatedSymptoms.includes(symptom)}
                  onCheckedChange={(checked) => 
                    handleSymptomToggle(symptom, checked as boolean)
                  }
                  className="h-5 w-5"
                />
                <Label htmlFor={symptom} className="text-base font-medium cursor-pointer">
                  {symptom}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* History Summary */}
      {(history.onset || history.duration || history.progression || history.associatedSymptoms.length > 0) && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">History Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {history.onset && (
              <div>
                <span className="font-medium text-green-800">Onset:</span>
                <span className="ml-2 text-green-700">{history.onset}</span>
              </div>
            )}
            {history.duration && (
              <div>
                <span className="font-medium text-green-800">Duration:</span>
                <span className="ml-2 text-green-700">{history.duration}</span>
              </div>
            )}
            {history.progression && (
              <div>
                <span className="font-medium text-green-800">Progression:</span>
                <span className="ml-2 text-green-700">{history.progression}</span>
              </div>
            )}
            {history.associatedSymptoms.length > 0 && (
              <div>
                <span className="font-medium text-green-800">Associated Symptoms:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {history.associatedSymptoms.map((symptom) => (
                    <span
                      key={symptom}
                      className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                    >
                      {symptom}
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