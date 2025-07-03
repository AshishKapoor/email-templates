"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Copy, Check, Mail, Search, Sparkles, Zap, Star, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

interface EmailTemplate {
  id: string
  title: string
  description: string
  category: string
  template: string
  placeholders: string[]
  icon: React.ReactNode
  color: string
}

const emailTemplates: EmailTemplate[] = [
  {
    id: "saying-no",
    title: "Saying No Professionally",
    description: "Politely decline requests while offering alternatives",
    category: "Communication",
    icon: <Zap className="h-5 w-5" />,
    color: "from-blue-500 to-cyan-500",
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
    icon: <Star className="h-5 w-5" />,
    color: "from-red-500 to-pink-500",
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
    icon: <Sparkles className="h-5 w-5" />,
    color: "from-green-500 to-emerald-500",
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
    icon: <ArrowRight className="h-5 w-5" />,
    color: "from-purple-500 to-violet-500",
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
    icon: <Mail className="h-5 w-5" />,
    color: "from-orange-500 to-amber-500",
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
    icon: <Zap className="h-5 w-5" />,
    color: "from-teal-500 to-cyan-500",
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
    icon: <Star className="h-5 w-5" />,
    color: "from-indigo-500 to-blue-500",
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
    icon: <Sparkles className="h-5 w-5" />,
    color: "from-rose-500 to-pink-500",
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
    icon: <ArrowRight className="h-5 w-5" />,
    color: "from-emerald-500 to-teal-500",
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
        title: "✨ Copied to clipboard",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-50"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
                  <Mail className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Professional Email Templates
              </h1>
            </div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Choose from 9 professionally crafted email templates for common workplace scenarios.
              <span className="text-blue-400 font-medium"> Customize placeholders</span> and
              <span className="text-purple-400 font-medium"> copy ready-to-send emails</span> with style.
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-sm"></div>
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 bg-transparent border-0 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Templates List */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-white">Templates</h2>
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="bg-white/10 text-white border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                {filteredTemplates.map((template, index) => (
                  <Card
                    key={template.id}
                    className={`group cursor-pointer transition-all duration-500 hover:scale-[1.02] ${
                      selectedTemplate?.id === template.id
                        ? "ring-2 ring-blue-500 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/50"
                        : "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20"
                    } backdrop-blur-md`}
                    onClick={() => setSelectedTemplate(template)}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${template.color} shadow-lg`}>
                            {template.icon}
                          </div>
                          <div>
                            <CardTitle className="text-lg text-white group-hover:text-blue-300 transition-colors">
                              {template.title}
                            </CardTitle>
                            <CardDescription className="mt-1 text-slate-300">{template.description}</CardDescription>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={`ml-2 shrink-0 bg-gradient-to-r ${template.color} text-white border-0`}
                        >
                          {template.category}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Template Editor */}
            <div className="lg:sticky lg:top-4">
              {selectedTemplate ? (
                <Card className="h-fit bg-white/5 backdrop-blur-md border-white/10">
                  <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-white/10">
                    <CardTitle className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${selectedTemplate.color}`}>
                          {selectedTemplate.icon}
                        </div>
                        {selectedTemplate.title}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(generateEmail(selectedTemplate), selectedTemplate.id)}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 border-0 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
                      >
                        {copiedStates[selectedTemplate.id] ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </>
                        )}
                      </Button>
                    </CardTitle>
                    <CardDescription className="text-slate-300">{selectedTemplate.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    <div>
                      <h3 className="font-semibold mb-4 text-white flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-yellow-400" />
                        Customize Placeholders
                      </h3>
                      <div className="grid gap-4">
                        {selectedTemplate.placeholders.map((placeholder, index) => (
                          <div key={placeholder} className="space-y-2">
                            <Label htmlFor={placeholder} className="text-sm font-medium text-slate-300">
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
                                className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/50 backdrop-blur-sm"
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
                                className="bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/50 backdrop-blur-sm"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="bg-white/20" />

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                          <Mail className="h-4 w-4 text-blue-400" />
                          Email Preview
                        </h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={resetForm}
                          className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                        >
                          Reset
                        </Button>
                      </div>
                      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                        <pre className="whitespace-pre-wrap text-sm text-slate-200 leading-relaxed font-mono">
                          {generateEmail(selectedTemplate)}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-fit bg-white/5 backdrop-blur-md border-white/10">
                  <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-30"></div>
                      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full">
                        <Mail className="h-12 w-12 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Select a Template</h3>
                    <p className="text-slate-300 max-w-sm">
                      Choose an email template from the list to customize and preview it with our fancy editor.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
