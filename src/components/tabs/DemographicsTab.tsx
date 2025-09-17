'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useForm } from '@/contexts/FormContext'
import { User, Shield } from 'lucide-react'

export default function DemographicsTab() {
  const { formData, updateDemographics } = useForm()
  const { demographics } = formData

  const handleInputChange = (field: string, value: string) => {
    updateDemographics({ [field]: value })
  }

  const handleRiskFactorChange = (factor: string, checked: boolean) => {
    updateDemographics({
      riskFactors: {
        ...demographics.riskFactors,
        [factor]: checked,
      },
    })
  }

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Patient Name *</Label>
              <Input
                id="name"
                placeholder="Enter patient's full name"
                value={demographics.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="h-12 text-base"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient ID *</Label>
              <Input
                id="patientId"
                placeholder="Enter patient ID"
                value={demographics.patientId}
                onChange={(e) => handleInputChange('patientId', e.target.value)}
                className="h-12 text-base"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                placeholder="Age in years"
                value={demographics.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="h-12 text-base"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sex">Sex *</Label>
              <Select value={demographics.sex} onValueChange={(value) => handleInputChange('sex', value)}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select sex" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                placeholder="Patient's occupation"
                value={demographics.occupation}
                onChange={(e) => handleInputChange('occupation', e.target.value)}
                className="h-12 text-base"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Risk Factors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="smoking"
                checked={demographics.riskFactors.smoking}
                onCheckedChange={(checked) => 
                  handleRiskFactorChange('smoking', checked as boolean)
                }
                className="h-5 w-5"
              />
              <Label htmlFor="smoking" className="text-base font-medium">
                Smoking History
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="alcohol"
                checked={demographics.riskFactors.alcohol}
                onCheckedChange={(checked) => 
                  handleRiskFactorChange('alcohol', checked as boolean)
                }
                className="h-5 w-5"
              />
              <Label htmlFor="alcohol" className="text-base font-medium">
                Alcohol Consumption
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="familyHistory"
                checked={demographics.riskFactors.familyHistory}
                onCheckedChange={(checked) => 
                  handleRiskFactorChange('familyHistory', checked as boolean)
                }
                className="h-5 w-5"
              />
              <Label htmlFor="familyHistory" className="text-base font-medium">
                Significant Family History
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="travelOccupational"
                checked={demographics.riskFactors.travelOccupational}
                onCheckedChange={(checked) => 
                  handleRiskFactorChange('travelOccupational', checked as boolean)
                }
                className="h-5 w-5"
              />
              <Label htmlFor="travelOccupational" className="text-base font-medium">
                Travel/Occupational Exposure
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}