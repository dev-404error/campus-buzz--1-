"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import AdminNavigation from "@/components/admin-navigation"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Users,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  MoreVertical,
  Download,
  Copy,
  ToggleLeft,
  ToggleRight,
} from "lucide-react"

export default function AdminEventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Mock events data
  const events = [
    {
      id: 1,
      title: "Annual Tech Summit 2024",
      description:
        "Join industry leaders and innovators for cutting-edge technology discussions and networking opportunities.",
      category: "Technology",
      date: "March 25, 2024",
      time: "10:00 AM - 6:00 PM",
      venue: "Engineering Block A, Main Auditorium",
      price: 399,
      registrations: 245,
      revenue: 97755,
      status: "upcoming",
      published: true,
      createdAt: "March 1, 2024",
    },
    {
      id: 2,
      title: "Spring Music Festival",
      description: "Experience amazing live performances from local and national artists in an outdoor setting.",
      category: "Music",
      date: "March 30, 2024",
      time: "6:00 PM - 11:00 PM",
      venue: "Main Campus Ground, Open Air Stage",
      price: 299,
      registrations: 180,
      revenue: 53820,
      status: "upcoming",
      published: true,
      createdAt: "February 28, 2024",
    },
    {
      id: 3,
      title: "Art Exhibition & Workshop",
      description: "Showcase of student artwork followed by hands-on creative workshops and artist interactions.",
      category: "Arts",
      date: "April 5, 2024",
      time: "2:00 PM - 8:00 PM",
      venue: "Arts Building, Gallery Hall",
      price: 149,
      registrations: 89,
      revenue: 13261,
      status: "upcoming",
      published: false,
      createdAt: "March 5, 2024",
    },
    {
      id: 4,
      title: "Winter Hackathon 2024",
      description: "24-hour coding marathon with exciting challenges, mentorship, and amazing prizes for winners.",
      category: "Technology",
      date: "February 15, 2024",
      time: "9:00 AM - 9:00 PM",
      venue: "Engineering Block B, Lab 301",
      price: 199,
      registrations: 200,
      revenue: 39800,
      status: "completed",
      published: true,
      createdAt: "January 20, 2024",
    },
  ]

  const categories = ["all", "Technology", "Music", "Arts", "Sports", "Business"]
  const statuses = ["all", "upcoming", "ongoing", "completed", "cancelled"]

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || event.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800 text-xs">Upcoming</Badge>
      case "ongoing":
        return <Badge className="bg-green-100 text-green-800 text-xs">Ongoing</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800 text-xs">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 text-xs">Cancelled</Badge>
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            {status}
          </Badge>
        )
    }
  }

  const handleViewEvent = (eventId: number) => {
    window.location.href = `/admin/events/${eventId}`
  }

  const handleEditEvent = (eventId: number) => {
    window.location.href = `/admin/events/${eventId}/edit`
  }

  const handleDuplicateEvent = (eventId: number) => {
    alert(`Duplicating event ${eventId}`)
  }

  const handleTogglePublish = (eventId: number, currentStatus: boolean) => {
    alert(`${currentStatus ? "Unpublishing" : "Publishing"} event ${eventId}`)
  }

  const handleDeleteEvent = (eventId: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      alert(`Deleting event ${eventId}`)
    }
  }

  const handleExportData = (eventId: number) => {
    alert(`Exporting data for event ${eventId}`)
  }

  const EventCard = ({ event }: { event: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0 pr-3">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <CardTitle className="text-lg text-gray-900 truncate">{event.title}</CardTitle>
              {getStatusBadge(event.status)}
              {event.published ? (
                <Badge className="bg-green-100 text-green-800 text-xs">Published</Badge>
              ) : (
                <Badge className="bg-yellow-100 text-yellow-800 text-xs">Draft</Badge>
              )}
            </div>
            <CardDescription className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {event.description}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex-shrink-0">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleViewEvent(event.id)}>
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEditEvent(event.id)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Event
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDuplicateEvent(event.id)}>
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTogglePublish(event.id, event.published)}>
                {event.published ? <ToggleLeft className="w-4 h-4 mr-2" /> : <ToggleRight className="w-4 h-4 mr-2" />}
                {event.published ? "Unpublish" : "Publish"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExportData(event.id)}>
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteEvent(event.id)}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{event.date}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{event.time}</span>
            </div>
            <div className="flex items-center text-gray-600 col-span-2">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <DollarSign className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>₹{event.price}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-1 flex-shrink-0" />
                <span>{event.registrations} registered</span>
              </div>
              
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleEditEvent(event.id)}>
                <Edit className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleViewEvent(event.id)}>
                <Eye className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">View</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <AdminNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Management</h1>
            <p className="text-gray-600 text-lg">Create, manage, and track all campus events</p>
          </div>
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex-shrink-0"
            onClick={() => (window.location.href = "/admin/events/create")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Event
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events Grid */}
        <Tabs defaultValue="grid" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="grid">
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search criteria or create a new event.</p>
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => (window.location.href = "/admin/events/create")}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Event
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="list">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Event</th>
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Date</th>
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Registrations</th>
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Revenue</th>
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Status</th>
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEvents.map((event) => (
                        <tr key={event.id} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="p-4">
                            <div className="min-w-0">
                              <div className="font-medium text-gray-900 truncate">{event.title}</div>
                              <div className="text-sm text-gray-600 truncate">{event.category}</div>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-gray-600">{event.date}</td>
                          <td className="p-4">
                            <div className="text-sm text-gray-900 font-medium">{event.registrations} students</div>
                          </td>
                          <td className="p-4 text-sm font-medium text-green-600">₹{event.revenue.toLocaleString()}</td>
                          <td className="p-4">{getStatusBadge(event.status)}</td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => handleViewEvent(event.id)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleEditEvent(event.id)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleDuplicateEvent(event.id)}>
                                    <Copy className="w-4 h-4 mr-2" />
                                    Duplicate
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleExportData(event.id)}>
                                    <Download className="w-4 h-4 mr-2" />
                                    Export
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => handleDeleteEvent(event.id)}
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
