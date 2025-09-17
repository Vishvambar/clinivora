'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useForm } from '@/contexts/FormContext'
import { FlaskConical, Sparkles, CheckCircle } from 'lucide-react'

const availableInvestigations = [
  // Laboratory Tests
  'Complete Blood Count (CBC)',
  'Basic Metabolic Panel (BMP)',
  'Comprehensive Metabolic Panel (CMP)',
  'Liver Function Tests (LFTs)',
  'Lipid Panel',
  'Thyroid Function Tests',
  'HbA1c',
  'Fasting Glucose',
  'Urinalysis',
  'ESR/CRP',
  'Procalcitonin',
  'Troponin',
  'BNP/NT-proBNP',
  'D-Dimer',
  'PT/INR, PTT',
  
  // Imaging
  'Chest X-ray',
  'Abdominal X-ray',
  'CT Head',
  'CT Chest',
  'CT Abdomen/Pelvis',
  'MRI Brain',
  'MRI Spine',
  'Ultrasound Abdomen',
  'Echocardiogram',
  'ECG',
  
  // Specialized Tests
  'Arterial Blood Gas (ABG)',
  'Pulmonary Function Tests',
  'Stress Test',
  'Colonoscopy',
  'Endoscopy',
  'Biopsy',
]

const suggestedInvestigations = [
  {
    test: 'Complete Blood Count (CBC)',
    reason: 'To evaluate for infection, anemia, or hematologic disorders',
    priority: 'High',
  },
  {
    test: 'Basic Metabolic Panel (BMP)',
    reason: 'To assess electrolyte balance and kidney function',
    priority: 'High',
  },
  {
    test: 'Chest X-ray',
    reason: 'To evaluate respiratory symptoms and rule out pneumonia',
    priority: 'Medium',
  },
  {
    test: 'ECG',
    reason: 'To assess cardiac rhythm and rule out ischemia',
    priority: 'Medium',
  },
  {
    test: 'Urinalysis',
    reason: 'To screen for urinary tract infection or kidney disease',
    priority: 'Low',
  },
]

export default function InvestigationsTab() {
  const { formData, updateInvestigations } = useForm()
  const { investigations } = formData

  const handleAvailableToggle = (investigation: string, checked: boolean) => {
    const updatedAvailable = checked
      ? [...investigations.available, investigation]
      : investigations.available.filter(inv => inv !== investigation)
    
    updateInvestigations({ available: updatedAvailable })
  }

  const handleSuggestedToggle = (investigation: string, checked: boolean) => {
    const updatedSuggested = checked
      ? [...investigations.suggested, investigation]
      : investigations.suggested.filter(inv => inv !== investigation)
    
    updateInvestigations({ suggested: updatedSuggested })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-600 bg-red-100'
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'Low':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      {/* Available Investigations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5" />
            Available Investigations
          </CardTitle>
          <p className="text-sm text-gray-600">
            Select the investigations that are available or have been ordered
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableInvestigations.map((investigation) => (
              <div key={investigation} className="flex items-center space-x-3">
                <Checkbox
                  id={`available-${investigation}`}
                  checked={investigations.available.includes(investigation)}
                  onCheckedChange={(checked) => 
                    handleAvailableToggle(investigation, checked as boolean)
                  }
                  className="h-5 w-5"
                />
                <Label 
                  htmlFor={`available-${investigation}`} 
                  className="text-base font-medium cursor-pointer"
                >
                  {investigation}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Suggested Investigations */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Sparkles className="h-5 w-5" />
            AI Suggested Investigations
          </CardTitle>
          <p className="text-sm text-muted-foreground">
                Based on the patient&apos;s presentation, these investigations are recommended
              </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suggestedInvestigations.map((suggestion) => (
              <div key={suggestion.test} className="border border-blue-200 rounded-lg p-4 bg-white">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <Checkbox
                      id={`suggested-${suggestion.test}`}
                      checked={investigations.suggested.includes(suggestion.test)}
                      onCheckedChange={(checked) => 
                        handleSuggestedToggle(suggestion.test, checked as boolean)
                      }
                      className="h-5 w-5 mt-1"
                    />
                    <div className="flex-1">
                      <Label 
                        htmlFor={`suggested-${suggestion.test}`} 
                        className="text-base font-medium cursor-pointer text-blue-900"
                      >
                        {suggestion.test}
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        {suggestion.reason}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(suggestion.priority)}`}>
                    {suggestion.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Investigations Summary */}
      {(investigations.available.length > 0 || investigations.suggested.length > 0) && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              Selected Investigations Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Available Investigations Summary */}
            {investigations.available.length > 0 && (
              <div>
                <h4 className="font-medium text-green-800 mb-2">
                  Available/Ordered ({investigations.available.length}):
                </h4>
                <div className="flex flex-wrap gap-2">
                  {investigations.available.map((investigation) => (
                    <span
                      key={investigation}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                    >
                      {investigation}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Investigations Summary */}
            {investigations.suggested.length > 0 && (
              <div>
                <h4 className="font-medium text-green-800 mb-2">
                  AI Suggested ({investigations.suggested.length}):
                </h4>
                <div className="flex flex-wrap gap-2">
                  {investigations.suggested.map((investigation) => (
                    <span
                      key={investigation}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      {investigation}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="text-sm text-gray-600 bg-white p-3 rounded-lg border">
              <strong>Total Selected:</strong> {investigations.available.length + investigations.suggested.length} investigations
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}