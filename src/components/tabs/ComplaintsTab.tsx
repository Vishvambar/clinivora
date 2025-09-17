'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from '@/contexts/FormContext'
import { MessageSquare, Plus } from 'lucide-react'

const commonComplaints = [
  'Fever',
  'Cough',
  'Shortness of breath',
  'Chest pain',
  'Headache',
  'Nausea/Vomiting',
  'Abdominal pain',
  'Diarrhea',
  'Fatigue',
  'Dizziness',
  'Joint pain',
  'Muscle aches',
  'Sore throat',
  'Runny nose',
  'Loss of appetite',
  'Weight loss',
  'Sleep disturbances',
  'Anxiety',
  'Depression',
  'Memory problems',
]

export default function ComplaintsTab() {
  const { formData, updateComplaints } = useForm()
  const { complaints } = formData

  const handleComplaintToggle = (complaint: string, checked: boolean) => {
    const updatedComplaints = checked
      ? [...complaints.selectedComplaints, complaint]
      : complaints.selectedComplaints.filter(c => c !== complaint)
    
    updateComplaints({ selectedComplaints: updatedComplaints })
  }

  const handleOtherComplaintsChange = (value: string) => {
    updateComplaints({ otherComplaints: value })
  }

  return (
    <div className="space-y-6">
      {/* Common Complaints */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Presenting Complaints
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commonComplaints.map((complaint) => (
              <div key={complaint} className="flex items-center space-x-3">
                <Checkbox
                  id={complaint}
                  checked={complaints.selectedComplaints.includes(complaint)}
                  onCheckedChange={(checked) => 
                    handleComplaintToggle(complaint, checked as boolean)
                  }
                  className="h-5 w-5"
                />
                <Label htmlFor={complaint} className="text-base font-medium cursor-pointer">
                  {complaint}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Other Complaints */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Additional Complaints
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="otherComplaints">
              Other complaints not listed above
            </Label>
            <Textarea
              id="otherComplaints"
              placeholder="Please describe any other symptoms or complaints..."
              value={complaints.otherComplaints}
              onChange={(e) => handleOtherComplaintsChange(e.target.value)}
              className="min-h-[120px] text-base"
            />
          </div>
        </CardContent>
      </Card>

      {/* Selected Summary */}
      {complaints.selectedComplaints.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">Selected Complaints Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {complaints.selectedComplaints.map((complaint) => (
                <span
                  key={complaint}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {complaint}
                </span>
              ))}
            </div>
            {complaints.otherComplaints && (
              <div className="mt-3 p-3 bg-white rounded-md border">
                <p className="text-sm font-medium text-gray-700 mb-1">Additional complaints:</p>
                <p className="text-sm text-gray-600">{complaints.otherComplaints}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}