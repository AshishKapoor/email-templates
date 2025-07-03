"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Copy, Check, Mail, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface EmailTemplate {
  id: string
  title: string
  description: string
  category: string
  template: string
  placeholders: string[]
}

const emailTemplates: EmailTemplate[] = [
  {
    id: "saying-no",
    title: "Saying No Professionally",
    description: "Politely decline requests while offering alternatives",
    category: "Communication",
    template: `Hi [Name],

Thank you for considering me for [request].

Unfortunately, I am currently focused on [priority], and will not be able to assist you immediately.

However, I suggest the following alternatives:

[Alternative 1]

[Alternative 2]

Please let me know if either of these works for you.`,
    placeholders: ["Name", "request", "priority", "Alternative 1", "Alternative 2"],
  },
  {
    id: "addressing-mistake",
    title: "Addressing A Mistake",
    description: "Take responsibility and provide solutions for errors",
    category: "Problem Resolution",
    template: `Hi [Name],

I realised there was an issue with [specific error] in the recent [work/report/task].

I have already taken the following steps to resolve it:

[Action 1]

[Action 2]

The corrected version will be available by [time], and I will ensure that this issue is prevented in the future.`,
    placeholders: ["Name", "specific error", "work/report/task", "Action 1", "Action 2", "time"],
  },
  {
    id: "giving-feedback",
    title: "Giving A Feedback",
    description: "Provide constructive feedback with strengths and improvements",
    category: "Feedback",
    template: `Hi [Name],

Thank you for your work on [project].

I have reviewed it and wanted to provide the following feedback:

Strengths:

[Point 1]

[Point 2]

Areas for improvement:

[Suggestion 1]

[Suggestion 2]

If you would like to discuss this further, I'm happy to connect.`,
    placeholders: ["Name", "project", "Point 1", "Point 2", "Suggestion 1", "Suggestion 2"],
  },
  {
    id: "weekly-update",
    title: "Sending A Weekly Update",
    description: "Share progress, achievements, and upcoming priorities",
    category: "Updates",
    template: `Hi [Name],

Please find below a summary of my progress this week:

Achievements:

[Achievement] → [Impact]

[Milestone] → [Why it matters]

In Progress:

[Project] → [Status and timeline]

Focus for next week:

[Priority 1]

[Priority 2]

Please let me know if there are any adjustments are needed.`,
    placeholders: [
      "Name",
      "Achievement",
      "Impact",
      "Milestone",
      "Why it matters",
      "Project",
      "Status and timeline",
      "Priority 1",
      "Priority 2",
    ],
  },
  {
    id: "asking-introduction",
    title: "Asking For An Introduction",
    description: "Request networking introductions professionally",
    category: "Networking",
    template: `Hi [Name],

I am currently exploring opportunities in this team [specific team].

I was wondering if you could introduce me to someone within your network who may be able to assist.

Specifically, I'm looking to connect with individuals at:

[Role 1]

[Role 2]

If you need any additional information, I'd be happy to provide a brief introduction note.`,
    placeholders: ["Name", "specific team", "Role 1", "Role 2"],
  },
  {
    id: "following-up",
    title: "Following Up On A Previous Request",
    description: "Professional follow-up on pending requests",
    category: "Follow-up",
    template: `Hi [Name],

I wanted to follow up on my previous request regarding [topic].

Specifically, I would appreciate an update on:

[Point 1]

[Point 2]

Please let me know if there is anything you need from me to move this forward before our upcoming meeting.`,
    placeholders: ["Name", "topic", "Point 1", "Point 2"],
  },
  {
    id: "requesting-information",
    title: "Requesting Information",
    description: "Ask for specific details or data professionally",
    category: "Requests",
    template: `Hi [Name],

I'm currently working on [project] and require the following details to proceed:

[Detail 1]

[Detail 2]

Would you be able to provide these by [date]?

Your response will help us stay on track.`,
    placeholders: ["Name", "project", "Detail 1", "Detail 2", "date"],
  },
  {
    id: "requesting-feedback",
    title: "Requesting A Feedback",
    description: "Ask for specific feedback on your work",
    category: "Feedback",
    template: `Hi [Name],

Attached is the [document/model/presentation] we discussed.

I would greatly appreciate your feedback on the following aspects:

[Element 1 – e.g., clarity]

[Element 2 – e.g., technical depth]

Please let me know if you have any suggestions or revisions I should include for the next review.`,
    placeholders: [
      "Name",
      "document/model/presentation",
      "Element 1 – e.g., clarity",
      "Element 2 – e.g., technical depth",
    ],
  },
  {
    id: "scheduling-meeting",
    title: "Scheduling A Meeting",
    description: "Propose meeting times and agenda professionally",
    category: "Scheduling",
    template: `Hi [Name],

I'd appreciate the opportunity to discuss [specific topic] with you.

Would you be available for a [duration] conversation at your convenience?

Here are a few time slots that work for me:

[Option 1]

[Option 2]

Alternatively, if these don't work, please book the first available slot in my calendar.`,
    placeholders: ["Name", "specific topic", "duration", "Option 1", "Option 2"],
  },
]

export default function EmailTemplatesApp() {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null)
  const [placeholderValues, setPlaceholderValues] = useState<Record<string, string>>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})
  const { toast } = useToast()

  const filteredTemplates = emailTemplates.filter(
    (template) =>
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const generateEmail = (template: EmailTemplate) => {
    let email = template.template
    template.placeholders.forEach((placeholder) => {
      const value = placeholderValues[placeholder] || `[${placeholder}]`
      email = email.replace(new RegExp(`\\[${placeholder.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\]`, "g"), value)
    })
    return email
  }

  const copyToClipboard = async (text: string, templateId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedStates((prev) => ({ ...prev, [templateId]: true }))
      toast({
        title: "Copied to clipboard",
        description: "Email template has been copied successfully.",
      })
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [templateId]: false }))
      }, 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually.",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setPlaceholderValues({})
    setSelectedTemplate(null)
  }

  const categories = Array.from(new Set(emailTemplates.map((t) => t.category)))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mail className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Professional Email Templates</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from 9 professionally crafted email templates for common workplace scenarios. Customize placeholders
            and copy ready-to-send emails.
          </p>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Templates</h2>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Badge key={category} variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {filteredTemplates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedTemplate?.id === template.id ? "ring-2 ring-blue-500 bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{template.title}</CardTitle>
                        <CardDescription className="mt-1">{template.description}</CardDescription>
                      </div>
                      <Badge variant="outline" className="ml-2 shrink-0">
                        {template.category}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-4">
            {selectedTemplate ? (
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {selectedTemplate.title}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(generateEmail(selectedTemplate), selectedTemplate.id)}
                    >
                      {copiedStates[selectedTemplate.id] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copiedStates[selectedTemplate.id] ? "Copied!" : "Copy"}
                    </Button>
                  </CardTitle>
                  <CardDescription>{selectedTemplate.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Customize Placeholders</h3>
                    <div className="grid gap-3">
                      {selectedTemplate.placeholders.map((placeholder) => (
                        <div key={placeholder}>
                          <Label htmlFor={placeholder} className="text-sm font-medium">
                            {placeholder}
                          </Label>
                          {placeholder.includes("Alternative") ||
                          placeholder.includes("Action") ||
                          placeholder.includes("Point") ||
                          placeholder.includes("Suggestion") ||
                          placeholder.includes("Priority") ||
                          placeholder.includes("Detail") ||
                          placeholder.includes("Element") ||
                          placeholder.includes("Option") ? (
                            <Textarea
                              id={placeholder}
                              placeholder={`Enter ${placeholder.toLowerCase()}...`}
                              value={placeholderValues[placeholder] || ""}
                              onChange={(e) =>
                                setPlaceholderValues((prev) => ({
                                  ...prev,
                                  [placeholder]: e.target.value,
                                }))
                              }
                              className="mt-1"
                              rows={2}
                            />
                          ) : (
                            <Input
                              id={placeholder}
                              placeholder={`Enter ${placeholder.toLowerCase()}...`}
                              value={placeholderValues[placeholder] || ""}
                              onChange={(e) =>
                                setPlaceholderValues((prev) => ({
                                  ...prev,
                                  [placeholder]: e.target.value,
                                }))
                              }
                              className="mt-1"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">Email Preview</h3>
                      <Button variant="outline" size="sm" onClick={resetForm}>
                        Reset
                      </Button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800 leading-relaxed">
                        {generateEmail(selectedTemplate)}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-fit">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Mail className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Template</h3>
                  <p className="text-gray-600">Choose an email template from the list to customize and preview it.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
