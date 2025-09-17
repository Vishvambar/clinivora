'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useForm } from '@/contexts/FormContext'
import { ThumbsUp, ThumbsDown } from 'lucide-react'

export default function FeedbackTab() {
  const { formData, updateFeedback } = useForm()
  const { feedback } = formData

  const handleAccuracyChange = (accurate: boolean) => {
    updateFeedback({ aiAccuracy: accurate })
  }

  const handleUsefulnessChange = (useful: boolean) => {
    updateFeedback({ aiUsefulness: useful })
  }

  const handleCommentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFeedback({ comments: e.target.value })
  }

  const handleSuggestionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFeedback({ suggestions: e.target.value })
  }

  return (
    <div className="space-y-6">
      {/* AI Performance Evaluation */}
      <Card>
        <CardHeader>
          <CardTitle>AI Performance Evaluation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* AI Accuracy */}
            <div className="space-y-3">
              <Label>Were the AI suggestions accurate and relevant?</Label>
              <div className="flex gap-3">
                <Button
                  variant={feedback.aiAccuracy === true ? "default" : "outline"}
                  onClick={() => handleAccuracyChange(true)}
                  className="flex items-center gap-2"
                >
                  <ThumbsUp className="h-4 w-4" />
                  Yes, accurate
                </Button>
                <Button
                  variant={feedback.aiAccuracy === false ? "destructive" : "outline"}
                  onClick={() => handleAccuracyChange(false)}
                  className="flex items-center gap-2"
                >
                  <ThumbsDown className="h-4 w-4" />
                  No, inaccurate
                </Button>
              </div>
            </div>

            {/* AI Usefulness */}
            <div className="space-y-3">
              <Label>Did the AI suggestions help improve your clinical decision-making?</Label>
              <div className="flex gap-3">
                <Button
                  variant={feedback.aiUsefulness === true ? "default" : "outline"}
                  onClick={() => handleUsefulnessChange(true)}
                  className="flex items-center gap-2"
                >
                  <ThumbsUp className="h-4 w-4" />
                  Yes, helpful
                </Button>
                <Button
                  variant={feedback.aiUsefulness === false ? "destructive" : "outline"}
                  onClick={() => handleUsefulnessChange(false)}
                  className="flex items-center gap-2"
                >
                  <ThumbsDown className="h-4 w-4" />
                  No, not helpful
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments and Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Comments */}
            <div className="space-y-2">
              <Label htmlFor="comments">
                Comments about your experience (optional)
              </Label>
              <Textarea
                id="comments"
                placeholder="Share your thoughts about using Clinivora AI..."
                value={feedback.comments || ''}
                onChange={handleCommentsChange}
                rows={4}
              />
            </div>

            {/* Suggestions */}
            <div className="space-y-2">
              <Label htmlFor="suggestions">
                Suggestions for improvement (optional)
              </Label>
              <Textarea
                id="suggestions"
                placeholder="How can we make Clinivora AI better for you?"
                value={feedback.suggestions || ''}
                onChange={handleSuggestionsChange}
                rows={4}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Feedback */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <Button size="lg" className="px-8">
              Submit Feedback
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Your feedback helps us improve Clinivora AI for better clinical support
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}