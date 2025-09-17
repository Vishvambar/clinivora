'use client'

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useForm } from '@/contexts/FormContext'
import { 
  User, 
  MessageSquare, 
  Clock, 
  Stethoscope, 
  FlaskConical, 
  Brain,
  MessageCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

// Import tab components
import DemographicsTab from './tabs/DemographicsTab'
import ComplaintsTab from './tabs/ComplaintsTab'
import HistoryTab from './tabs/HistoryTab'
import ExaminationTab from './tabs/ExaminationTab'
import InvestigationsTab from './tabs/InvestigationsTab'
import AISuggestionsTab from './tabs/AISuggestionsTab'
import FeedbackTab from './tabs/FeedbackTab'

const tabs = [
  { id: 'demographics', label: 'Demographics', icon: User },
  { id: 'complaints', label: 'Complaints', icon: MessageSquare },
  { id: 'history', label: 'History', icon: Clock },
  { id: 'examination', label: 'Examination', icon: Stethoscope },
  { id: 'investigations', label: 'Investigations', icon: FlaskConical },
  { id: 'ai-suggestions', label: 'AI Suggestions', icon: Brain },
  { id: 'feedback', label: 'Feedback', icon: MessageCircle },
]

export default function ClinicalForm() {
  const { currentTab, setCurrentTab } = useForm()

  const currentTabIndex = tabs.findIndex(tab => tab.id === currentTab)
  const isFirstTab = currentTabIndex === 0
  const isLastTab = currentTabIndex === tabs.length - 1

  const handlePrevious = () => {
    if (!isFirstTab) {
      setCurrentTab(tabs[currentTabIndex - 1].id)
    }
  }

  const handleNext = () => {
    if (!isLastTab) {
      setCurrentTab(tabs[currentTabIndex + 1].id)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 mt-5">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Clinivora AI
          </h1>
          
        </div>

        {/* Progress Indicator */}
        {/* <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentTabIndex + 1} of {tabs.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentTabIndex + 1) / tabs.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentTabIndex + 1) / tabs.length) * 100}%` }}
            />
          </div>
        </div> */}

        <Card className="shadow-lg">
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            {/* Tab Navigation */}
            <CardHeader className="pb-4">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 h-auto p-1 bg-gray-100">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="flex flex-col items-center gap-2 p-3 text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      <Icon className="h-4 w-4 md:h-5 md:w-5" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </TabsTrigger>
                  )
                })}
              </TabsList>
            </CardHeader>

            {/* Tab Content */}
            <CardContent className="p-6">
              <TabsContent value="demographics" className="mt-0">
                <DemographicsTab />
              </TabsContent>
              
              <TabsContent value="complaints" className="mt-0">
                <ComplaintsTab />
              </TabsContent>
              
              <TabsContent value="history" className="mt-0">
                <HistoryTab />
              </TabsContent>
              
              <TabsContent value="examination" className="mt-0">
                <ExaminationTab />
              </TabsContent>
              
              <TabsContent value="investigations" className="mt-0">
                <InvestigationsTab />
              </TabsContent>
              
              <TabsContent value="ai-suggestions" className="mt-0">
                <AISuggestionsTab />
              </TabsContent>

              <TabsContent value="feedback" className="mt-0">
                <FeedbackTab />
              </TabsContent>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={isFirstTab}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="text-sm text-gray-500">
                  {tabs.find(tab => tab.id === currentTab)?.label}
                </div>

                <Button
                  onClick={handleNext}
                  disabled={isLastTab}
                  className="flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}