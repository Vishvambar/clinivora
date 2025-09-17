'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useForm } from '@/contexts/FormContext'
import { Brain, Target, FlaskConical, Stethoscope, AlertTriangle, TrendingUp } from 'lucide-react'

const mockSystemsInvolved = [
  { 
    system: 'Respiratory System', 
    confidence: 85, 
    color: 'bg-red-100 text-red-800',
    reason: 'Chest pain, dyspnea, and respiratory symptoms suggest respiratory involvement'
  },
  { 
    system: 'Cardiovascular System', 
    confidence: 72, 
    color: 'bg-orange-100 text-orange-800',
    reason: 'Chest pain and risk factors indicate possible cardiac etiology'
  },
  { 
    system: 'Gastrointestinal System', 
    confidence: 45, 
    color: 'bg-yellow-100 text-yellow-800',
    reason: 'Some symptoms may overlap with GI conditions'
  },
  { 
    system: 'Neurological System', 
    confidence: 30, 
    color: 'bg-green-100 text-green-800',
    reason: 'Anxiety or stress-related symptoms possible'
  },
]

const mockSuggestedTests = [
  { test: 'Chest CT with contrast', priority: 'High', reason: 'Rule out pulmonary embolism' },
  { test: 'D-Dimer', priority: 'High', reason: 'Assess thrombotic risk' },
  { test: 'Arterial Blood Gas', priority: 'Medium', reason: 'Evaluate oxygenation status' },
  { test: 'Echocardiogram', priority: 'Medium', reason: 'Assess cardiac function' },
  { test: 'Pulmonary Function Tests', priority: 'Low', reason: 'Evaluate respiratory capacity' },
]

const mockDiagnoses = [
  { 
    diagnosis: 'Pulmonary Embolism', 
    confidence: 78, 
    icd10: 'I26.9',
    reasoning: 'Chest pain, dyspnea, and risk factors present'
  },
  { 
    diagnosis: 'Pneumonia', 
    confidence: 65, 
    icd10: 'J18.9',
    reasoning: 'Respiratory symptoms with possible infectious etiology'
  },
  { 
    diagnosis: 'Acute Coronary Syndrome', 
    confidence: 52, 
    icd10: 'I24.9',
    reasoning: 'Chest pain with cardiovascular risk factors'
  },
  { 
    diagnosis: 'Anxiety Disorder', 
    confidence: 35, 
    icd10: 'F41.9',
    reasoning: 'Symptoms may be related to psychological factors'
  },
]

const mockTreatmentGuidelines = [
  {
    condition: 'Suspected Pulmonary Embolism',
    guidelines: [
      'Immediate anticoagulation if high clinical suspicion',
      'CT pulmonary angiogram for definitive diagnosis',
      'Consider thrombolytic therapy for massive PE',
      'Monitor oxygen saturation and provide supplemental O2 if needed',
    ]
  },
  {
    condition: 'Microbiotic Therapy Management',
    guidelines: [
      'Consider targeted microbiotic therapy based on patient microbiome analysis',
      'Assess gut-lung axis involvement in respiratory conditions',
      'Monitor for microbiome restoration and symptom improvement',
      'Combine with conventional therapy for optimal outcomes',
    ]
  }
]

export default function AISuggestionsTab() {
  const { formData } = useForm()

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 70) return 'text-green-600 bg-green-100'
    if (confidence >= 50) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
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
      {/* AI Analysis Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Brain className="h-6 w-6" />
            AI Clinical Decision Support
          </CardTitle>
          <p className="text-sm text-blue-600">
            AI-powered analysis based on patient presentation and clinical data
          </p>
        </CardHeader>
      </Card>

      {/* Probable Systems Involved */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Probable Systems Involved
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockSystemsInvolved.map((system) => (
              <div key={system.system} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${system.color.split(' ')[0]}`}></div>
                    <span className="font-medium">{system.system}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${system.color.split(' ')[0]}`}
                        style={{ width: `${system.confidence}%` }}
                      ></div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${system.color}`}>
                      {system.confidence}%
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 ml-6">{system.reason}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suggested Next Tests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5" />
            Suggested Next Tests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockSuggestedTests.map((test, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{test.test}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(test.priority)}`}>
                        {test.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{test.reason}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suspected Diagnoses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Suspected Diagnoses (Ranked by Confidence)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockDiagnoses.map((diagnosis, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-gray-400">#{index + 1}</span>
                    <div>
                      <h4 className="font-medium">{diagnosis.diagnosis}</h4>
                      <span className="text-sm text-gray-500">ICD-10: {diagnosis.icd10}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getConfidenceColor(diagnosis.confidence).includes('green') ? 'bg-green-500' : 
                          getConfidenceColor(diagnosis.confidence).includes('yellow') ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${diagnosis.confidence}%` }}
                      ></div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(diagnosis.confidence)}`}>
                      {diagnosis.confidence}%
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{diagnosis.reasoning}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Treatment Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Treatment Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTreatmentGuidelines.map((guideline, index) => (
              <div key={index} className="border rounded-lg p-4 bg-green-50 border-green-200">
                <h4 className="font-medium text-green-800 mb-3">{guideline.condition}</h4>
                <ul className="space-y-2">
                  {guideline.guidelines.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <AlertTriangle className="h-5 w-5" />
            Important Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-yellow-800 space-y-2">
            <p>
              <strong>This AI analysis is for educational and decision support purposes only.</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>AI suggestions should not replace clinical judgment and expertise</li>
              <li>Always consider the complete clinical picture and patient context</li>
              <li>Verify all recommendations with current medical guidelines</li>
              <li>Consult with specialists when appropriate</li>
              <li>This system is not intended for emergency or critical care decisions</li>
            </ul>
            <p className="mt-3 font-medium">
              Healthcare providers remain fully responsible for all clinical decisions and patient care.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}