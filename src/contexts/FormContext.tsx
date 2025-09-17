'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

// Type definitions for form data
export interface Demographics {
  name: string
  patientId: string
  age: string
  sex: string
  occupation: string
  riskFactors: {
    smoking: boolean
    alcohol: boolean
    familyHistory: boolean
    travelOccupational: boolean
  }
}

export interface Complaints {
  selectedComplaints: string[]
  otherComplaints: string
}

export interface History {
  onset: string
  duration: string
  progression: string
  associatedSymptoms: string[]
}

export interface Examination {
  vitals: {
    bp: string
    hr: string
    rr: string
    temp: string
    spo2: string
    bmi: string
  }
  generalExamination: string[]
  systemExamination: string[]
}

export interface Investigations {
  available: string[]
  suggested: string[]
}

export interface AIData {
  probableSystems: string[]
  suggestedTests: string[]
  suspectedDiagnoses: Array<{
    diagnosis: string
    confidence: number
  }>
  treatmentGuidelines: string
}

export interface FormData {
  demographics: Demographics
  complaints: Complaints
  history: History
  examination: Examination
  investigations: Investigations
  aiData: AIData
}

interface FormContextType {
  formData: FormData
  updateDemographics: (data: Partial<Demographics>) => void
  updateComplaints: (data: Partial<Complaints>) => void
  updateHistory: (data: Partial<History>) => void
  updateExamination: (data: Partial<Examination>) => void
  updateInvestigations: (data: Partial<Investigations>) => void
  updateAIData: (data: Partial<AIData>) => void
  currentTab: string
  setCurrentTab: (tab: string) => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)

// Initial form data
const initialFormData: FormData = {
  demographics: {
    name: '',
    patientId: '',
    age: '',
    sex: '',
    occupation: '',
    riskFactors: {
      smoking: false,
      alcohol: false,
      familyHistory: false,
      travelOccupational: false,
    },
  },
  complaints: {
    selectedComplaints: [],
    otherComplaints: '',
  },
  history: {
    onset: '',
    duration: '',
    progression: '',
    associatedSymptoms: [],
  },
  examination: {
    vitals: {
      bp: '',
      hr: '',
      rr: '',
      temp: '',
      spo2: '',
      bmi: '',
    },
    generalExamination: [],
    systemExamination: [],
  },
  investigations: {
    available: [],
    suggested: [],
  },
  aiData: {
    probableSystems: ['Respiratory System', 'Cardiovascular System'],
    suggestedTests: ['Chest X-ray', 'ECG', 'Complete Blood Count'],
    suspectedDiagnoses: [
      { diagnosis: 'Pneumonia', confidence: 85 },
      { diagnosis: 'Bronchitis', confidence: 70 },
      { diagnosis: 'COPD Exacerbation', confidence: 60 },
    ],
    treatmentGuidelines: 'Consider antibiotic therapy based on clinical presentation and severity. Monitor oxygen saturation and provide supportive care.',
  },
}

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [currentTab, setCurrentTab] = useState('demographics')

  const updateDemographics = (data: Partial<Demographics>) => {
    setFormData(prev => ({
      ...prev,
      demographics: { ...prev.demographics, ...data },
    }))
  }

  const updateComplaints = (data: Partial<Complaints>) => {
    setFormData(prev => ({
      ...prev,
      complaints: { ...prev.complaints, ...data },
    }))
  }

  const updateHistory = (data: Partial<History>) => {
    setFormData(prev => ({
      ...prev,
      history: { ...prev.history, ...data },
    }))
  }

  const updateExamination = (data: Partial<Examination>) => {
    setFormData(prev => ({
      ...prev,
      examination: { ...prev.examination, ...data },
    }))
  }

  const updateInvestigations = (data: Partial<Investigations>) => {
    setFormData(prev => ({
      ...prev,
      investigations: { ...prev.investigations, ...data },
    }))
  }

  const updateAIData = (data: Partial<AIData>) => {
    setFormData(prev => ({
      ...prev,
      aiData: { ...prev.aiData, ...data },
    }))
  }

  return (
    <FormContext.Provider
      value={{
        formData,
        updateDemographics,
        updateComplaints,
        updateHistory,
        updateExamination,
        updateInvestigations,
        updateAIData,
        currentTab,
        setCurrentTab,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export function useForm() {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider')
  }
  return context
}